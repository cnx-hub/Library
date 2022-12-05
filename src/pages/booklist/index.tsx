import React, { useEffect } from "react";
import { View, Text, Navigator, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  getBooklistsByUserId,
  deleteBooklistById,
} from "@/servers/apis/booklist";
import { getUID } from "@/utils/permission";
import Collapse from "@/components/collapse";
import "./index.less";
import { useCallback, useState } from "react";

interface IBookLists {
  create: Array<any>;
  favorite: Array<any>;
}

const BookList = React.memo(() => {
  const [booklists, setBooklists] = useState<IBookLists>({
    create: [],
    favorite: [],
  });

  useEffect(() => {
    Taro.showNavigationBarLoading();
    _fetchData().finally(() => Taro.hideNavigationBarLoading());
  }, []);

  const _fetchData = useCallback(() => {
    return getBooklistsByUserId<IBookLists>(getUID()).then((res) => {
      setBooklists(res);
    });
  }, []);

  return (
    <View>
      <Collapse title="我创建的书单" actionText="新建">
        <View className="ui-panel">
          {booklists.create.map((item) => {
            return (
              <Navigator
                url={`./children/booklist-detail?id=${item.id}`}
                key={item.id}
                className="weui-cell ui-booklist-card"
                hoverClass="ui--active"
              >
                <Image
                  className="ui-booklist-card__img"
                  src={
                    item.image || require("@/images/icon_empty_booklist.png")
                  }
                  mode="aspectFill"
                ></Image>
                <View className="ui-booklist-card__info">
                  <View className="ui-booklist-card__info-title font-black-34">
                    {item.title}
                  </View>
                  <View className="font-gray-26">
                    {item.total}本 by {item.creator.nickname}，
                    {item.favorited_num}人收藏
                  </View>
                </View>
                <View
                  className="ui-icon-more-area"
                  data-type="create"
                  data-index="{{index}}"
                  hoverStopPropagation
                >
                  <Image
                    src={require("@/images/icon_more.png")}
                    mode="widthFix"
                    className="ui-icon-more"
                  ></Image>
                </View>
              </Navigator>
            );
          })}
        </View>
      </Collapse>
      <Collapse title="我收藏的书单">
        <View className="ui-panel">
          {booklists.favorite.map((item) => {
            return (
              <Navigator
                key={item.id}
                className="weui-cell ui-booklist-card"
                hoverClass="ui--active"
                url={`./children/booklist-detail?id=${item.id}`}
              >
                <Image
                  className="ui-booklist-card__img"
                  src={
                    item.image || require("@/images/icon_empty_booklist.png")
                  }
                  mode="aspectFill"
                ></Image>
                <View className="ui-booklist-card__info">
                  <View className="ui-booklist-card__info-title font-black-34">
                    {item.title}
                  </View>
                  <View className="font-gray-26">
                    {item.total}本 by {item.creator.nickname}，
                    {item.favorited_num}人收藏
                  </View>
                </View>
                <View
                  className="ui-icon-more-area"
                  data-type="favorite"
                  data-index="{{index}}"
                  hoverStopPropagation
                >
                  <Image
                    src={require("@/images/icon_more.png")}
                    mode="widthFix"
                    className="ui-icon-more"
                  ></Image>
                </View>
              </Navigator>
            );
          })}
        </View>
      </Collapse>
    </View>
  );
});

export default BookList;
