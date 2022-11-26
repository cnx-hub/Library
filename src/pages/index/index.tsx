import { Component, ReactNode } from "react";
import Taro from "@tarojs/taro";
import { isLogin } from "../../utils/permission";
import "./index.less";

class Index extends Component {
  onLoad() {
    if (isLogin()) {
      Taro.switchTab({ url: "/pages/home/index" });
    } else {
      Taro.redirectTo({ url: "/pages/register/index" });
    }
  }
  render(): ReactNode {
    return <></>;
  }
}

export default Index;
