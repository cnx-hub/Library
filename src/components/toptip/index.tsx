import { View } from "@tarojs/components";
import { useState, useImperativeHandle, forwardRef } from "react";
import classNames from "classnames";
import type { IOptions, IToptip } from "../type";
import "./index.less";

let DEFAULT_CONFIG = {
  duration: 3000,
  type: "error", // warn、success、error
};

let timer;

const Toptip = forwardRef((props, refBase) => {
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  /**
   * 显示 TopTip，父组件通过 TopTip 组件的引用调用
   * @param option IOptions
   *  -- duration：持续时长
   *  -- type：提示类型
   */
  const changeShow = (content: string, options?: IOptions) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    // 扩展参数
    options = Object.assign({}, DEFAULT_CONFIG, options);
    timer = setTimeout(() => {
      setShow(false);
    }, options.duration);
    setContent(content);
    setShow(true);
    setType(options.type);
  };

  useImperativeHandle<any, IToptip>(
    refBase,
    () => ({
      changeShow,
    }),
    []
  );

  return (
    <View
      className={classNames("toptip", {
        "toptip--show": show,
        [`toptip--${type}`]: true,
      })}
    >
      {content}
    </View>
  );
});

export default Toptip;
