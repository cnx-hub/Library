import { View } from "@tarojs/components";
import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import classNames from "classnames";
import "./index.less";

import { IToast } from "../type";

let timer;

let DEFAULT_CONFIG = {
  duration: 3000,
};

/**
 * Toast 能够自定义位置的浮动提示
 * 如果只需要居中显示，最好使用 wx.showToast()
 * TODO --- 实现淡入淡出
 */
const Toast = forwardRef<any, { position: string }>(({ position }, baseRef) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const changeShow = useCallback((title, options = DEFAULT_CONFIG) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    options = Object.assign(DEFAULT_CONFIG, options);

    timer = setTimeout(() => {
      setShow(false);
    }, options.duration);

    setShow(true);
    setTitle(title);
  }, []);

  useImperativeHandle<any, IToast>(
    baseRef,
    () => ({
      changeShow: changeShow,
    }),
    []
  );

  return (
    <>
      {show && (
        <View className={classNames("toast", `toast--${position}`)}>
          {title}
        </View>
      )}
    </>
  );
});

export default Toast;
