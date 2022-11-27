import { View } from "@tarojs/components";
import {
  FC,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useRef,
} from "react";
import { IVrcode, ISentBtn } from "../type";

/**
 * 发送短信的倒计时按钮
 * @event <tap> <end>
 */

let timer;
const SendCode = forwardRef<any, IVrcode>((props, ref) => {
  const {
    defaultText = "获取验证码",
    pendingText = "发送中",
    countingText = "已发送",
    duration = 60,
    onSend,
  } = props;
  //
  const [str, setStr] = useState(defaultText);
  const [, setLefTime] = useState(duration);
  const [disabled, setDisabled] = useState(false);
  const timeRef = useRef(duration);

  /**
   * 点击的时候不直接开始倒计时，父组件可以做一些参数判断
   */
  const _onTap = useCallback(
    (e) => {
      onSend(e);
    },
    [onSend]
  );
  // 准备倒计时
  const prepare = useCallback(() => {
    setDisabled(true);
    setStr(pendingText);
  }, []);
  // 开始倒计时
  const start = () => {
    _countDown();
  };

  // 结束倒计时
  const stop = useCallback(() => {
    clearTimeout(timer);
    timer = null;
    timeRef.current = duration;
    setLefTime(duration);
    setDisabled(false);
    setStr(defaultText);
  }, [timer]);

  const _countDown = () => {
    if (timeRef.current > 0) {
      timeRef.current--;
      setLefTime(timeRef.current);
      setDisabled(true);
      setStr(`${countingText}(${timeRef.current})`);
      timer = setTimeout(() => {
        _countDown();
      }, 1000);
    } else {
      stop();
      // 通知父元素结束
    }
  };

  useImperativeHandle<any, ISentBtn>(
    ref,
    () => ({
      prepare,
      start,
      stop,
    }),
    []
  );

  const render = () => {
    return !disabled ? (
      <View className="weui-vcode-btn" onTap={_onTap}>
        {str}
      </View>
    ) : (
      <View className="weui-vcode-btn" style="color: #888;">
        {str}
      </View>
    );
  };

  return <View className="weui-cell__ft">{render()}</View>;
});

export default SendCode;
