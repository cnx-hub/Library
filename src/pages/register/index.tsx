import { useState, useRef } from "react";
import { View, Button, Input, Picker } from "@tarojs/components";

import Toptip from "@/components/toptip";
import Toast from "@/components/toast";
import SendCode from "@/components/sendcode";
import { isPhone, isVrcode } from "@/utils/validator";
import { login } from "@/utils/permission";
import { sendCode, checkCode } from "@/servers/apis/user";
import { IToptip, ISentBtn, IToast } from "@/components/type";
import { ILoginUser } from "./type";

import "./index.less";
import Taro from "@tarojs/taro";

const Index = () => {
  const [countries, setCountries] = useState(["中国(86)"]);
  const [countryIndex, setCountryIndex] = useState("0");
  const [phone, setPhone] = useState("");
  const [vrcode, setVrcode] = useState("");

  const toptip = useRef<IToptip>();
  const toast = useRef<IToast>();
  const sentbtn = useRef<ISentBtn>();

  const onCountryChange = (e) => {
    setCountryIndex(e.detail.value);
  };

  const OnInput = (e) => {
    const key = e.currentTarget.dataset.label;
    if (key === "phone") {
      setPhone(e.detail.value);
    } else {
      setVrcode(e.detail.value);
    }
  };

  const onSend = (e) => {
    if (!isPhone(phone)) {
      return toptip.current?.changeShow("手机号格式不正确");
    }

    sentbtn.current?.prepare();

    sendCode(phone)
      .then(() => {
        // toast 提示用户
        sentbtn.current?.start();
      })
      .catch(() => {
        // sentbtn.current?.start();
        sentbtn.current?.stop();
      });
  };

  const onSumbit = () => {
    if (!isPhone(phone)) {
      toptip.current?.changeShow("手机号格式不正确");
      return;
    }
    if (!isVrcode(vrcode)) {
      toptip.current?.changeShow("请输入6位数字验证码");
      return;
    }

    Taro.showToast({
      title: "加载中",
      icon: "loading",
    });

    checkCode<ILoginUser>(phone, vrcode)
      .then((res) => {
        // 设置登录状态
        if (!login(res.token, res.user)) {
          return Promise.reject(new Error("设置登录态失败"));
        }

        // 201：创建了新的用户 200：登录成功
        // if (res.statusCode === 201) {
        //   // 跳转到新用户
        // } else {
        // }
        Taro.switchTab({ url: "/pages/home/index" });
        // 201：创建了新的用户 200：登录成功
      })
      .finally(() => {
        Taro.hideToast();
      });
  };

  return (
    <View>
      <Toptip ref={toptip}></Toptip>
      <Toast ref={toast} position="center" />
      <View className="weui-cells weui-cells_after-title">
        <View className="weui-cell weui-cell_select">
          <View className="weui-cell__hd weui-cell__hd_in-select-after">
            <View className="weui-label">国家/地区</View>
          </View>
          <View className="weui-cell__bd">
            <Picker
              range={countries}
              value={countryIndex}
              onChange={onCountryChange}
            >
              <View className="weui-select weui-select_in-select-after">
                {countries[countryIndex]}
              </View>
            </Picker>
          </View>
        </View>
        <View className="weui-cell weui-cell_input weui-cell_vcode">
          <View className="weui-cell__hd">
            <View className="weui-label">手机号</View>
          </View>
          <View className="weui-cell__bd">
            <Input
              className="weui-input"
              placeholder="请输入手机号"
              type="number"
              data-label="phone"
              onInput={OnInput}
              value={phone}
            ></Input>
          </View>
          <SendCode ref={sentbtn} onSend={onSend} />
        </View>
        <View className="weui-cell weui-cell_input">
          <View className="weui-cell__hd">
            <View className="weui-label" data-label="vrcode">
              验证码
            </View>
          </View>
          <View className="weui-cell__bd">
            <Input
              className="weui-input"
              placeholder="请输入验证码"
              data-label="vrcode"
              type="number"
              onInput={OnInput}
              value={vrcode}
            />
          </View>
        </View>
      </View>

      <View className="weui-btn-area">
        <Button className="weui-btn" type="primary" onTap={onSumbit}>
          下一步
        </Button>
      </View>
    </View>
  );
};

export default Index;
