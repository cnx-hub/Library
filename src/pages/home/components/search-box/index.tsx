import React, { useState } from "react";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import "../../index.less";

interface IProps {
  history: string[];
  rankings: Array<any>;
}

const SearchBox = React.memo<IProps>(({ history, rankings }) => {
  return (
    <View className="search-box">
      <ScrollView scrollY style="height: 100%">
        {/* <!-- 搜索历史 --> */}
        {history.length && (
          <>
            <View className="ui-label search-history__label">
              搜索历史
              <View
                className="search-box-history__clear color-green"
                // bindtap="onClearHistory"
              >
                清除
              </View>
            </View>
            <View className="search-box-history">
              {history.map((item) => {
                return (
                  <View
                    className="search-box-history__item"
                    key={item}
                    data-value={item}
                    // bindtap="onClickHistoryItem"
                  >
                    {item}
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* <!-- 热门图书 --> */}
        <View className="ui-label">热门图书</View>
        <View className="search-box-trending">
          {rankings.map((item, index) => {
            return (
              <View
                className="search-box-trending__item"
                hoverClass="ui--active"
                key={item.id}
                data-title={item.title}
                // catchtap="onClickTrendingItem"
              >
                <Image
                  className="search-box-trending__icon"
                  mode="widthFix"
                  src={
                    index < 3
                      ? require(`@/images/icon_trending_${index + 1}.png`)
                      : require("@/images/icon_trending_up.png")
                  }
                ></Image>
                <View className="search-box-trending__item-info">
                  <View className="font-black-34">{item.title}</View>
                  {item.author.map((author) => {
                    return (
                      <View className="font-gray-26">
                        <Text key={author} className="ui-book-card__info-name">
                          {author}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

export default SearchBox;
