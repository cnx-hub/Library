import React from "react";
import { Navigator, View, Image } from "@tarojs/components";

const OrderOngoing = React.memo(() => {
  return (
    <Navigator
      url="./children/order-ongoing"
      className="weui-cell weui-cell_access"
      hoverClass="weui-cell_active"
    >
      <View className="weui-cell__hd">
        <Image
          src={require("@/Images/icon_in_process.png")}
          className="icon"
        ></Image>
      </View>
      <View className="weui-cell__bd">借阅进度</View>
      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
    </Navigator>
  );
});

export default OrderOngoing;
