import React from "react";
import { Navigator, View, Image } from "@tarojs/components";

const OrderHistory = React.memo(() => {
  return (
    <Navigator
      url="./children/order-history"
      className="weui-cell weui-cell_access"
      hoverClass="weui-cell_active"
    >
      <View className="weui-cell__hd">
        <Image src={require("@/images/icon_time.png")} className="icon"></Image>
      </View>
      <View className="weui-cell__bd">借阅历史</View>
      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
    </Navigator>
  );
});

export default OrderHistory;
