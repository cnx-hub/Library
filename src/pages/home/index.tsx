import Taro from "@tarojs/taro";
import { useCallback, useState, useEffect, useRef } from "react";
import { View, Text } from "@tarojs/components";
import { isISBN } from "@/utils/validator";
import { showTip } from "@/utils/tip";
import HomeSearchBar from "./components/home-search-bar";
import SearchBox from "./components/search-box";
import { PageStatusIndicator } from "@/template/page-status-indicator/index";
import Panel from "@/components/panel";
import { ShowcaseBook, ShowcaseBooklist } from "@/template/showcase";
import {
  getRankingBooks,
  getRecommendedBooksByUserId,
} from "@/servers/apis/book";
import { getRecommendedBooklistsByUserId } from "@/servers/apis/booklist";
import "./index.less";
import { getUID } from "../../utils/permission";

import type { Istatistics } from "./type";

const Home = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);
  const [pageStatus, setPageStatus] = useState<"loading" | "error" | "done">(
    "loading"
  ); //loading,error,done
  const [recommendBooks, setRecommendBooks] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [recommendBooklists, setRecommendBooklists] = useState([]);
  const [statistics, setStatistics] = useState<Istatistics>();
  const searchRef = useRef<{
    setInputValue: (value: string) => void;
    selected: string;
  }>(null);

  const _saveHistory = (value: string) => {
    let filterHistory: string[] = history.filter((v) => v !== value);
    filterHistory.unshift(value);
    if (filterHistory.length > 6) {
      filterHistory = filterHistory.slice(0, 6);
    }
    setHistory(filterHistory);
    Taro.setStorageSync("history", filterHistory);
  };

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onCancle = useCallback(() => {
    setFocus(false);
  }, []);

  /**
   * 搜索图书：设置参数并跳转至图书搜索页
   * @param {String} type   搜索类型
   * @param {String} value  关键字值
   */
  const onSearch = useCallback(
    (type: string, value: string) => {
      // 去除前后空白
      value = value.trim();

      // 保存搜索记录
      _saveHistory(value);
      switch (type) {
        case "书名":
        case "作者":
        case "标签":
          Taro.navigateTo({
            url: `/pages/list/book?type=search&search_type=${type}&keyword=${encodeURIComponent(
              value
            )}`,
          });
          break;
        case "ISBN":
          if (isISBN(value)) {
            Taro.navigateTo({ url: `/pages/book-detail/index?isbn=${value}` });
          } else {
            Taro.showModal({
              content: "请输入正确的13位ISBN",
              showCancel: false,
            });
          }
          break;
        default:
          throw new Error("wrong type: 不支持的搜索类型！");
      }
    },
    [_saveHistory]
  );

  const _fetchData = useCallback(
    function () {
      return Promise.all([
        getRecommendedBooksByUserId(getUID()),
        getRankingBooks(),
        getRecommendedBooklistsByUserId(getUID()),
        Taro.getStorageSync<any>("USER_INFO"),
      ]).then((res) => {
        setRecommendBooks(res[0].map((i) => i.book));
        setRanking(res[1].books);
        setRecommendBooklists(res[2]);
        setStatistics(res[3].reading_statistics);
      });
    },
    [setRecommendBooks, setRanking, setRecommendBooklists, setStatistics]
  );
  /**
   * 加载页面
   */
  const _loadPage = useCallback(() => {
    setPageStatus("loading");
    _fetchData()
      .then(() => {
        setPageStatus("done");
      })
      .catch(() => {
        setPageStatus("error");
      });
  }, [_fetchData]);

  // hooks
  useEffect(() => {
    // getStorage的返回值可能是 undefined, 而下面要用
    // search.history.filter 方法，因此默认为空数组
    let tmp = Taro.getStorageSync("history");
    setHistory(tmp || []);
    _loadPage();
  }, [_loadPage]);

  const onClearHistory = useCallback(() => {
    Taro.showModal({
      title: "清除搜索记录",
      content: "确定清除所有搜索历史？这项操作将无法撤销",
      success: function (res) {
        if (res.confirm) {
          Taro.removeStorage({ key: "history" });
          setHistory([]);
        }
      },
    });
  }, [setHistory]);

  const onClickHistoryItem = useCallback(
    (value: string) => {
      showTip("HISTORY").then((res) => {
        searchRef.current?.setInputValue(value);
        onSearch(searchRef.current?.selected as string, value);
      });
    },
    [onSearch]
  );

  return (
    <View>
      <HomeSearchBar
        onSearch={onSearch}
        onFocus={onFocus}
        onCancle={onCancle}
        ref={searchRef}
      ></HomeSearchBar>
      <PageStatusIndicator pageStatus={pageStatus} />
      {/* 主页 */}
      {pageStatus === "done" && !focus && (
        <View className="panel-area">
          <Panel url="/pages/profile/children/order-history" title="阅读统计">
            <View className="color-green statistics-panel__number">
              {statistics?.book_num}
              <Text className="statistics-panel__unit">本</Text>
            </View>
            <View className="color-orange statistics-panel__number">
              {statistics?.page_num}
              <Text className="statistics-panel__unit">页</Text>
            </View>
          </Panel>

          <Panel url="/pages/list/book?type=recommend" title="推荐图书">
            <ShowcaseBook books={recommendBooks} />
          </Panel>

          <Panel url="/pages/list/book?type=ranking" title="近期借阅排行">
            <ShowcaseBook books={ranking} />
          </Panel>

          <Panel url="/pages/list/booklist?type=recommend" title="推荐书单">
            <ShowcaseBooklist booklists={recommendBooklists} />
          </Panel>
        </View>
      )}

      {focus && (
        <SearchBox
          history={history}
          rankings={ranking}
          onClearHistory={onClearHistory}
          onClickHistoryItem={onClickHistoryItem}
        />
      )}
    </View>
  );
};

export default Home;
