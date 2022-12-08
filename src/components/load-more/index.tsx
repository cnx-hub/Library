import React from "react";
import { View } from "@tarojs/components";
import "./index.less";

interface IProp {
  status: "loading" | "nomore" | "hidding";
  loadingText?: string;
  nomoreText?: string;
}

const LoadMore = React.memo<IProp>(
  ({
    status = "loading",
    loadingText = "正在加载",
    nomoreText = "没有更多数据了",
  }) => {
    return (
      <>
        {status === "loading" ? (
          <View className="load-more">
            <View className="load-more__loading"></View>
            <View className="load-more__text">{loadingText}</View>
          </View>
        ) : status === "nomore" ? (
          <View className="load-more load-more__line">
            <View className="load-more__text load-more__text--in-line">
              {nomoreText}
            </View>
          </View>
        ) : (
          ""
        )}
      </>
    );
  }
);

export default LoadMore;
