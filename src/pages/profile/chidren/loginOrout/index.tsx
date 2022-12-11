import React, { useCallback } from "react";
import Taro from "@tarojs/taro";
import { View, Navigator, Image } from "@tarojs/components";
import { logout } from "@/utils/permission";
import "../../index.less";

const LoginOrOut = React.memo(() => {
  const onLogout = useCallback(() => {
    Taro.showModal({
      content: "确定退出登录？",
      success: (res) => {
        if (res.confirm && logout()) {
          Taro.reLaunch({ url: "/pages/register/index" });
        }
      },
    });
  }, []);
  return (
    <View className="weui-cells">
      <Navigator
        url="/pages/register/index"
        className="weui-cell weui-cell_access"
        hoverClass="weui-cell_active"
      >
        <View className="weui-cell__hd">
          <Image
            src={require("@/images/icon_help.png")}
            className="icon"
          ></Image>
        </View>
        <View className="weui-cell__bd">登录页</View>
        <View className="weui-cell__ft weui-cell__ft_in-access"></View>
      </Navigator>
      <View
        className="weui-cell weui-cell_access"
        hoverClass="weui-cell_active"
      >
        <View className="weui-cell__hd">
          <Image
            src={require("@/images/icon_logout.png")}
            className="icon"
          ></Image>
        </View>
        <View className="weui-cell__bd" onClick={onLogout}>
          退出登录
        </View>
        <View className="weui-cell__ft weui-cell__ft_in-access"></View>
      </View>
    </View>
  );
});

export default LoginOrOut;
