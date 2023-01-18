import React, { useReducer, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import { View, Picker, Icon, Input, Image, Button } from "@tarojs/components";
import TopTip from "@/components/toptip";

import "./index.less";

const initUserInfo = {
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
  return { ...state, action };
}

const PersonalInformationModify = React.memo(() => {
  const [userInfo, setUserInfo] = useReducer(Reducer, initUserInfo);

  useEffect(() => {
    Taro.showModal({
      title: "注意",
      content: "本项目仅作演示，切勿上传真实身份信息，否则后果自负！",
      showCancel: false,
    });

    Taro.showLoading({ title: "加载中", mask: true });
    Taro.getStorage({ key: "USER_INFO" })
      .then((userInfo) =>
        setUserInfo({
          name: userInfo.data.name,
          birthday: userInfo.data.birthday,
          id_number: userInfo.data.id_number,
          postcode: userInfo.data.postcode,
          address: userInfo.data.address,
          "id_card_img.front": userInfo.data.id_card_img.front,
          "id_card_img.back": userInfo.data.id_card_img.back,
        })
      )
      .finally(() => Taro.hideLoading());
  }, []);

  const onInput = useCallback((e, type: string) => {}, []);

  console.log(userInfo);

  return (
    <>
      <TopTip />
      <View className="weui-cells">
        <View className="weui-cell weui-cell_Input">
          <View className="weui-cell__hd">
            <View className="weui-label">姓名</View>
          </View>
          <View className="weui-cell__bd">
            <Input
              className="weui-Input"
              placeholder="姓名"
              onInput={(e) => onInput(e, "name")}
              value={userInfo.name}
            />
          </View>
        </View>
        <View className="weui-cell weui-cell_select">
          <View className="weui-cell__hd weui-cell__hd_in-select-after">
            <View className="weui-label">出生年月</View>
          </View>
          <View className="weui-cell__bd">
            <Picker
              bindchange={(e) => onInput(e, "birthday")}
              mode="date"
              value="{{birthday}}"
            >
              <View className="weui-select weui-select_in-select-after">
                {userInfo.birthday}
              </View>
            </Picker>
          </View>
        </View>
        <View className="weui-cell weui-cell_Input">
          <View className="weui-cell__hd">
            <View className="weui-label">身份证号</View>
          </View>
          <View className="weui-cell__bd">
            <Input
              className="weui-Input"
              placeholder="请输入身份证号"
              type="idcard"
              bindInput="onInput"
              data-label="id_number"
              value={userInfo.id_number}
            />
          </View>
        </View>
        <View className="weui-cell weui-cell_Input">
          <View className="weui-cell__hd">
            <View className="weui-label">详细地址</View>
          </View>
          <View className="weui-cell__bd">
            <Input
              placeholder="街道门牌信息"
              className="weui-Input"
              bindInput="onInput"
              data-label="address"
              value={userInfo.address}
            />
          </View>
        </View>
        <View className="weui-cell weui-cell_Input">
          <View className="weui-cell__hd">
            <View className="weui-label">邮政编码</View>
          </View>
          <View className="weui-cell__bd">
            <Input
              className="weui-Input"
              placeholder="请输入邮政编码"
              type="number"
              bindInput="onInput"
              data-label="postcode"
              value={userInfo.postcode}
            />
          </View>
        </View>
        <View className="weui-cell">
          <View className="weui-cell__bd">
            <View className="weui-uploader">
              <View className="weui-uploader__hd">
                <View className="weui-uploader__title">
                  身份证照片上传（正反面）
                </View>
              </View>
              <View className="weui-uploader__bd">
                <View className="weui-uploader__files">
                  {userInfo.id_card_img.front ? (
                    <View className="weui-uploader__file">
                      <Image
                        className="weui-uploader__img"
                        src="{{userInfo.id_card_img.front}}"
                        mode="aspectFill"
                        catchtap="onPreViewImage"
                        data-type="front"
                      />
                      <Icon
                        size="25"
                        type="cancel"
                        data-type="front"
                        catchtap="onDeleteImage"
                      ></Icon>
                    </View>
                  ) : (
                    <View className="weui-uploader__Input-box">
                      <View
                        className="weui-uploader__Input"
                        bindtap="onChooseImage"
                        data-type="front"
                      ></View>
                    </View>
                  )}
                  {userInfo.id_card_img.back ? (
                    <View className="weui-uploader__file">
                      <Image
                        className="weui-uploader__img"
                        src="{{userInfo.id_card_img.back}}"
                        mode="aspectFill"
                        catchtap="onPreViewImage"
                        data-type="back"
                      />
                      <Icon
                        size="25"
                        type="cancel"
                        data-type="back"
                        catchtap="onDeleteImage"
                      ></Icon>
                    </View>
                  ) : (
                    <View className="weui-uploader__Input-box">
                      <View
                        className="weui-uploader__Input"
                        bindtap="onChooseImage"
                        data-type="back"
                      ></View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="font-gray-28 weui-cells__tips">
        本项目仅作演示，请勿输入真实信息，点击提交后不会上传至系统。
      </View>
      <View className="weui-btn-area">
        <Button className="weui-btn" type="primary" catchtap="onSubmit">
          提交
        </Button>
      </View>
    </>
  );
});

export default PersonalInformationModify;
