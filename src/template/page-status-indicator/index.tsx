import "./index.less";
import { View, Button, Image } from "@tarojs/components";
import { IPageStatusIndicator } from "@/pages/home/type";
import { FC } from "react";

/**
 * 当前页面状态指示器：加载时(loading)、加载失败(error，重新加载按钮)、其他情况隐藏
 * pageStatus: 页面状态，'loading', 'error'. other('done'/'nodata'/...)
 * message: 错误说明文本
 * btnText: 按钮文本，默认‘重新加载’
 * onReloadPage: 重新加载页面数据，由页面提供
 * */
//

export const PageStatusIndicator: FC<IPageStatusIndicator> = ({
  pageStatus,
  message,
  btnText,
  onReloadPage,
}) => {
  const obj = { message, btnText, onReloadPage };
  return (
    <>
      {pageStatus === "loading" && (
        <View className="page-status-indicator__spinner line-scale-pulse-out">
          <View className="rect1"></View>
          <View className="rect2"></View>
          <View className="rect3"></View>
          <View className="rect4"></View>
          <View className="rect5"></View>
        </View>
      )}
      {pageStatus === "error" && <PageReloader {...obj} />}
    </>
  );
};

/**
 * 加载数据失败提示，带有一个重新加载按钮
 * message: 错误说明文本
 * btnText: 按钮文本，默认‘重新加载’
 * onReloadPage: 重新加载页面数据，由页面提供
 */
//

export const PageReloader: FC<Omit<IPageStatusIndicator, "pageStatus">> = ({
  message,
  btnText,
  onReloadPage,
}) => {
  return (
    <>
      <View className="page-reloader">
        <Image
          className="page-reloader__img"
          mode="widthFix"
          src={require("@/images/load_fail.png")}
        />
        <View className="page-reloader__text">
          {message || "网络出错啦，请点击按钮重新加载"}
        </View>
        <Button className="page-reloader__btn" plain bindtap={onReloadPage}>
          {btnText || "重新加载"}
        </Button>
      </View>
    </>
  );
};
