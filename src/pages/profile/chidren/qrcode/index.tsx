import React from "react";
import { Navigator, View, Image } from "@tarojs/components";

const QrCode = React.memo(() => {
  return (
    <Navigator
      url={"/pages/profile/chidren/qrcode/qrcode"}
      className="weui-cell weui-cell_access"
      hoverClass="weui-cell_active"
    >
      <View className="weui-cell__hd">
        <Image
          src={require("@/images/icon_paper_plane.png")}
          className="icon"
        ></Image>
      </View>
      <View className="weui-cell__bd">我的二维码</View>
      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
    </Navigator>
  );
});

export default QrCode;
