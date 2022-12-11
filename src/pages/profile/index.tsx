import React, { useState, useCallback, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { updateUserInfoById } from "@/servers/apis/user";
import { getUID } from "@/utils/permission";
import Collapse from "@/components/collapse";
import LoginOrOut from "./chidren/loginOrout";
import ComponentDemoAndAbout from "./chidren/componentDemoAndAbout";
import ReView from "./chidren/reView";
import OrderHistory from "./chidren/orderHistory";
import OrderOngoing from "./chidren/orderOngoing";
import PersonalInformation from "./chidren/personalInformation";
import QrCode from "./chidren/qrcode";
import "./index.less";

const Profile = React.memo(() => {
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  useEffect(() => {
    // 获取用户授权，更新用户昵称与头像
    Taro.getUserInfo()
      .then(_updateUserInfo)
      .catch(() => {
        setShowLoginBtn(true);
      });
  }, []);

  const _updateUserInfo = useCallback((userInfo) => {
    return updateUserInfoById(getUID(), {
      nickname: userInfo.userInfo.nickName,
      avatar: userInfo.userInfo.avatarUrl,
    }).then((res) => Taro.setStorageSync("USER_INFO", res));
  }, []);

  return (
    <>
      {showLoginBtn && (
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
      )}
      <View className="weui-cells">
        <PersonalInformation />
      </View>
      <View className="weui-cells">
        <QrCode />
      </View>
      <View className="weui-cells">
        <OrderOngoing />
        <OrderHistory />
        <ReView />
      </View>
      <ComponentDemoAndAbout />
      <LoginOrOut />
    </>
  );
});

export default Profile;
