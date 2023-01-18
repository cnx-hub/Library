import React, { useReducer, useEffect, useCallback, useState } from "react";
import Taro from "@tarojs/taro";
import { Navigator, View, Image, Button } from "@tarojs/components";
import {
  USER_STATUS_REVIEWING,
  USER_STATUS_APPROVED,
  USER_STATUS_REJECTED,
} from "@/utils/constant";
import "./personalInformation.less";

const initUserInfo = {
  status: undefined, // 0: 未审核 1: 已通过 2: 未通过 3: 已拉黑
  name: "",
  birthday: "",
  id_number: "",
  postcode: "",
  address: "",
  id_card_img: {
    front: "",
    back: "",
  },
};

function Reducer(state, action) {
  return { ...state, ...action };
}

const personalInformation = React.memo(() => {
  const [userInfo, setUserInfo] = useReducer(Reducer, initUserInfo);
  const [tips, setTips] = useState("");

  /**
   * @listens <userInfoChanged> app.setUserInfo 调用时触发
   */
  useEffect(() => {
    _setUserInfo();
  }, []);

  const _setUserInfo = useCallback(() => {
    return Taro.getStorage({ key: "USER_INFO" }).then((res) => {
      setUserInfo(res.data);
      if (res.data.status === USER_STATUS_REVIEWING) {
        setTips(
          "您的信息正在审核中，在此期间您可以重新设置您的个人信息，审核通过后您将可以在线预约图书。"
        );
      } else if (res.data.status === USER_STATUS_APPROVED) {
        setTips(
          "您的信息已通过审核，您现在可以在线预约图书。如果您需要修改个人信息，请通过“意见反馈”联系管理员。"
        );
      } else if (res.data.status === USER_STATUS_REJECTED) {
        setTips(
          `您的信息没有通过审核，原因是：${res.data.review_msg}。您可修改后重新提交审核，审核通过后您将可以在线预约图书。`
        );
      }
    });
  }, [setUserInfo, setTips]);

  const onPreView = useCallback(
    (e, type: string) => {
      e.stoppropagation();
      let { front, back } = userInfo.id_card_img;
      Taro.previewImage({
        // 需要预览的图片http链接列表，filter过滤空url
        urls: [front, back].filter((e) => e),
        current: userInfo.id_card_img[type],
      });
    },
    [userInfo]
  );

  return (
    <>
      <View className="weui-cells">
        <View className="weui-cell">
          <View className="weui-cell__bd">姓名</View>
          <View className="weui-cell__ft">{userInfo.name}</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">出生日期</View>
          <View className="weui-cell__ft">{userInfo.birthday}</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">身份证号</View>
          <View className="weui-cell__ft">{userInfo.id_number}</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">详细地址</View>
          <View className="weui-cell__ft">{userInfo.address}</View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">邮政编码</View>
          <View className="weui-cell__ft">{userInfo.postcode}</View>
        </View>
        {!userInfo.id_card_img.front && !userInfo.id_card_img.back ? (
          <View className="weui-cell">
            <View className="weui-cell__bd">身份证照片</View>
            <View className="weui-cell__ft">尚未上传</View>
          </View>
        ) : (
          <View className="weui-cell">
            <View className="weui-cell__bd">
              <View className="weui-uploader">
                <View className="weui-uploader__hd">
                  <View className="weui-uploader__title">身份证照片</View>
                </View>
                <View className="weui-uploader__bd">
                  <View className="weui-uploader__files">
                    {userInfo.id_card_img.front && (
                      <View className="weui-uploader__file">
                        <Image
                          className="weui-uploader__img"
                          src={userInfo.id_card_img.front}
                          mode="aspectFill"
                          onTap={(e) => onPreView(e, "front")}
                        />
                      </View>
                    )}
                    {userInfo.id_card_img.back && (
                      <View className="weui-uploader__file">
                        <Image
                          className="weui-uploader__img"
                          src={userInfo.id_card_img.back}
                          mode="aspectFill"
                          onTap={(e) => onPreView(e, "back")}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        <View className="weui-cell">
          <View className="weui-cell__bd">绑定手机号</View>
          <View className="weui-cell__ft">{userInfo.phone}</View>
        </View>
      </View>
      <View className="weui-cells__tips">{tips}</View>
      {userInfo.status === 0 ||
        (userInfo.status === 2 && (
          <View className="weui-btn-area">
            <Navigator url="/pages/profile/chidren/children/personal-information-modify/index">
              <Button className="weui-btn" type="primary">
                修改个人信息
              </Button>
            </Navigator>
          </View>
        ))}
    </>
  );
});

export default personalInformation;
