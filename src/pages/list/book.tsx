import React, { useState, useCallback } from "react";
import Taro, { useRouter, useDidShow, useReachBottom } from "@tarojs/taro";
import {
  getBooksByKeyword,
  getBooksByAuthor,
  getBooksByTag,
  getBooksByAdvancedSearch,
  getBooksByClassificationNumber,
  getRecommendedBooksByUserId,
  getRankingBooks,
} from "@/servers/apis/book";
import { getUID } from "@/utils/permission";
import BookList from "./children/bookList";
import LoadMore from "@/components/load-more";
import NoData from "@/components/no-data/index";
let options: Record<string, any> = {}; // 保存 options 参数

const Book = React.memo(() => {
  const router = useRouter();
  const [book, setBook] = useState([]);
  const [comments, setComments] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  const [loadMoreStatus, setLoadMoreStatus] = useState<
    "hidding" | "loading" | "nomore"
  >("hidding");
  /**
   * 获取图书数据
   * @param start {Integer} 搜索偏移量
   */
  const _fetchData = useCallback(
    (start: number = 0) => {
      let fn: Promise<any> = new Promise(() => {});
      switch (options.type) {
        case "search":
          if (options.search_type === "书名") {
            fn = getBooksByKeyword(options.keyword, start);
          } else if (options.search_type === "作者") {
            fn = getBooksByAuthor(options.keyword, start);
          } else if (options.search_type === "标签") {
            fn = getBooksByTag(options.keyword, start);
          }
          break;
        case "advanced_search":
          options["start"] = start;
          fn = getBooksByAdvancedSearch(options);
          break;
        case "classify_search":
          fn = getBooksByClassificationNumber(options.class_num, start);
          break;
        case "recommend":
          fn = getRecommendedBooksByUserId(getUID());
          break;
        case "ranking":
          fn = getRankingBooks(start);
          break;
        default:
          throw new Error("不支持的搜索类型！");
      }

      return fn
        .then((res) => {
          let books;
          if (options.type === "recommend") {
            /* 推荐图书接口的返回值为
             * {
             *   books: [{
             *     book: Book,
             *     comment: String
             *   }],
             *   total: Integer
             * }
             */
            books = res.map((e) => e.book);
            const comment = res.map((e) => e.comment);
            setBook(books);
            setComments(comment);
          } else {
            /* 其他接口的返回值为
             * {
             *   books: [Book],
             *   total: Integer
             * }
             */
            books = res.books;
            setBook(book.concat(books));
          }
          return books;
        })
        .catch(() => {
          return [];
        });
    },
    [book, setComments, setBook]
  );

  useDidShow(() => {
    Object.keys(router.params).forEach((key) => {
      options[key] = decodeURIComponent(router.params[key] || "");
    });

    switch (options.type) {
      case "search":
      case "advanced_search":
      case "classify_search":
        Taro.setNavigationBarTitle({ title: "搜索结果" });
        break;
      case "recommend":
        Taro.setNavigationBarTitle({ title: "推荐图书" });
        break;
      case "ranking":
        Taro.setNavigationBarTitle({ title: "近期热门图书" });
        break;
    }
    Taro.showLoading({ title: "加载中", mask: true });
    _fetchData()
      .then((books) => {
        if (books.length) {
          setIsNoData(true);
        }
      })
      .finally(() => Taro.hideLoading());
  });

  useReachBottom(() => {
    // 推荐图书一次性即可加载完毕，不再加载
    if (
      loadMoreStatus !== "hidding" ||
      isNoData ||
      options.type === "recommend"
    )
      return;
    setLoadMoreStatus("loading");

    _fetchData(book.length)
      .then((books) => {
        !books.length || options.type === "recommend"
          ? setLoadMoreStatus("nomore")
          : setLoadMoreStatus("hidding");
      })
      .catch(() => setLoadMoreStatus("hidding"));
  });

  return (
    <>
      <BookList type={options.type} comments={comments} books={book} />
      {/* <!-- 加载更多、暂无数据 --> */}
      <LoadMore nomoreText={"没有更多图书了"} status={loadMoreStatus} />
      {isNoData && <NoData />}
    </>
  );
});

export default Book;
