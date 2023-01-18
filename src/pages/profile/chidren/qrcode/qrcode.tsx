import React, { useCallback } from "react";
import Taro, { useReady } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import { getToken } from "@/utils/permission";
import QR from "@/utils/qrcode";

import "./qrcode.less";

const QrcodePage = React.memo(() => {
  useReady(() => {
    let size = setCanvasSize();
    let params = JSON.stringify({ token: getToken(), time: Date.now() });
    QR.draw(params, "qrcode", size.w, size.h);
  });
  // 适配不同屏幕大小的canvas
  const setCanvasSize = useCallback(() => {
    let size: Record<string, any> = {};

    try {
      let res = Taro.getSystemInfoSync();
      let scale = 750 / 686; // 不同屏幕下canvas的适配比例；设计稿是750宽
      let height = res.windowHeight / scale;
      let width = res.windowWidth / scale;
      size.w = width;
      size.h = height;
    } catch (error) {
      console.log("获取设备信息失败" + error);
    }

    return size;
  }, []);
  return (
    <>
      <View className="container">
        <Canvas
          style={{ width: "686rpx", height: "686rpx", background: "#f1f1f1" }}
          canvas-id="qrcode"
        />
      </View>
      <View className="tip">请将您的个人二维码出示给管理员</View>
    </>
  );
});

export default QrcodePage;
