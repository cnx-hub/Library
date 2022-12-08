import React from "react";
import { View, Image, Button, Navigator, OpenData } from "@tarojs/components";
import Collapse from "@/components/collapse";
import "./index.less";

const Profile = React.memo(() => {
  return (
    <View>
      <Collapse title="微信授权提醒" header-className="collapse__header">
        <View className="ui-card">
          <View className="font-gray-28">
            点击按钮授权后，您的头像与昵称将显示在创建的书单与发表的评论中，否则只显示默认头像与随机昵称
          </View>
          <Button className="weui-btn" openType="getUserInfo">
            上传我的头像与昵称
          </Button>
        </View>
      </Collapse>
      <View className="weui-cells">
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
      </View>
      <View className="weui-cells">
        <Navigator
          url={"./children/qrcode"}
          className="weui-cell weui-cell_access"
          hoverClass="weui-cell_active"
        >
          <View className="weui-cell__hd">
            <Image
              src={require("@/Images/icon_paper_plane.png")}
              className="icon"
            ></Image>
          </View>
          <View className="weui-cell__bd">我的二维码</View>
          <View className="weui-cell__ft weui-cell__ft_in-access"></View>
        </Navigator>
      </View>
      <View className="weui-cells">
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
        <Navigator
          url="./children/order-history"
          className="weui-cell weui-cell_access"
          hoverClass="weui-cell_active"
        >
          <View className="weui-cell__hd">
            <Image
              src={require("@/Images/icon_time.png")}
              className="icon"
            ></Image>
          </View>
          <View className="weui-cell__bd">借阅历史</View>
          <View className="weui-cell__ft weui-cell__ft_in-access"></View>
        </Navigator>

        <Navigator
          url="./children/reView"
          className="weui-cell weui-cell_access"
          hoverClass="weui-cell_active"
        >
          <View className="weui-cell__hd">
            <Image
              src={require("@/Images/icon_reView_2.png")}
              className="icon"
            ></Image>
          </View>
          <View className="weui-cell__bd">我的书评</View>
          <View className="weui-cell__ft weui-cell__ft_in-access"></View>
        </Navigator>
      </View>
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
          url="./children/about"
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
      <View className="weui-cells">
        <Navigator
          url="./children/about"
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
          <View className="weui-cell__bd">退出登录</View>
          <View className="weui-cell__ft weui-cell__ft_in-access"></View>
        </View>
      </View>
    </View>
  );
});

export default Profile;
