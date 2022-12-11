import React from "react";
import { View, Image } from "@tarojs/components";
import "./index.less";

const About = React.memo(() => {
  return (
    <>
      <View className="logo-container">
        <Image src={require("@/images/logo.jpeg")}></Image>
        <View className="font-black-34">在线借书平台</View>
      </View>
      <View className="weui-cells">
        <View className="weui-cell">
          <View className="weui-cell__bd">GitHub</View>
          <View className="weui-cell__ft">cnx-hub/Library</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">开发者</View>
          <View className="weui-cell__ft">cnx-hub</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">联系方式</View>
          <View className="weui-cell__ft color-blue">https://imageslr.com</View>
        </View>
      </View>
      <View className="weui-msg__extra-area">
        <View className="weui-footer">
          <View className="weui-footer__links">
            <View className="weui-footer__link">GitHub @cnx-hub</View>
          </View>
          <View className="weui-footer__text">
            Copyright © 2022-2023 cnx-hub
          </View>
        </View>
      </View>
    </>
  );
});

export default About;
