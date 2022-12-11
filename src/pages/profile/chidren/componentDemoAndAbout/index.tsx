import React from "react";
import { View, Navigator, Image } from "@tarojs/components";
import "../../index.less";

const ComponentDemoAndAbout = React.memo(() => {
  return (
    <View className="weui-cells">
      <Navigator
        url="/component-demos/index/index"
        className="weui-cell weui-cell_access"
        hoverClass="weui-cell_active"
      >
        <View className="weui-cell__hd">
          <Image
            src={require("@/Images/icon_headlines.png")}
            className="icon"
          ></Image>
        </View>
        <View className="weui-cell__bd">组件展示</View>
        <View className="weui-cell__ft weui-cell__ft_in-access"></View>
      </Navigator>
      <Navigator
        url="/pages/profile/chidren/about/index"
        className="weui-cell weui-cell_access"
        hoverClass="weui-cell_active"
      >
        <View className="weui-cell__hd">
          <Image
            src={require("@/images/icon_info.png")}
            className="icon"
          ></Image>
        </View>
        <View className="weui-cell__bd">关于</View>
        <View className="weui-cell__ft weui-cell__ft_in-access"></View>
      </Navigator>
    </View>
  );
});

export default ComponentDemoAndAbout;
