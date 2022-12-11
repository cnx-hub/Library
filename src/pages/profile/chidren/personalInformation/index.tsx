import React from "react";
import { Navigator, View, OpenData } from "@tarojs/components";

const PersonalInformation = React.memo(() => {
  return (
    <Navigator
      url={"./children/personal-information"}
      className="weui-cell weui-cell_access"
      hoverClass="weui-cell_active"
    >
      <View className="weui-cell__hd">
        <View className="user-info__avatar">
          <OpenData type="userAvatarUrl"></OpenData>
        </View>
      </View>
      <View className="weui-cell__hd">
        <View className="user-info__name">
          <OpenData type="userNickName"></OpenData>
        </View>
        <View className="font-gray-28">查看 / 修改个人信息</View>
      </View>
      <View className="weui-cell__ft weui-cell__ft_in-access"></View>
    </Navigator>
  );
});

export default PersonalInformation;
