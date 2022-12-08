import React from "react";
import { View, Navigator, Image, Text } from "@tarojs/components";

interface IProps {
  type: string;
  books: any[];
  comments: string[];
}

const BookList = React.memo<IProps>(({ type, books, comments }) => {
  return (
    <>
      {books.length > 0 && (
        <View className="weui-cells weui-cells_after-title">
          {books.map((item, index) => {
            return (
              <Navigator
                key={item.id}
                className="weui-cell ui-book-card"
                hoverClass="ui--active"
                data-index={index}
                data-id={item.id}
                url={`/pages/book-detail/book-detail?id=${item.id}`}
              >
                <Image
                  className="ui-book-card__img"
                  src={item.imgs.small}
                  mode="widthFix"
                ></Image>
                <View className="ui-book-card__info font-gray-26">
                  <View className="ui-book-card__info-title font-black-34">
                    {item.title}
                  </View>
                  <View>
                    评分:
                    <Text className="color-yellow">{item.total_score}</Text>（
                    {item.reView_num}条评论）
                  </View>
                  {item.author.map((author) => {
                    return (
                      <View>
                        作者:
                        <Text key={author} className="ui-book-card__info-name">
                          {author}
                        </Text>
                      </View>
                    );
                  })}

                  <View>出版社: {item.publisher}</View>
                  <View>出版日期: {item.pubdate}</View>
                  <View>ISBN: {item.isbn}</View>
                  <View>
                    藏书量: {item.total_num}（
                    <Text className="color-green">{item.available_num}</Text>
                    本可借）
                  </View>
                  {type == "recommend" && (
                    <View className="ui-book-card__description">
                      {comments[index]}
                    </View>
                  )}
                </View>
              </Navigator>
            );
          })}
        </View>
      )}
    </>
  );
});

export default BookList;
