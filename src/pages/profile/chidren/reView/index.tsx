import React from "react";
import { Navigator, View, Image } from "@tarojs/components";
import "../../index.less";

const ReView = React.memo(() => {
  return (
    <Navigator
      url="./children/reView"
      className="weui-cell weui-cell_access"
      hoverClass="weui-cell_active"
    >
      <View className="weui-cell__hd">
        <Image
          src={require("@/images/icon_reView_2.png")}
          className="icon"
        ></Image>
      </View>
      <View className="weui-cell__bd">我的书评</View>
      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
    </Navigator>
  );
});

export default ReView;
