import {
  View,
  Label,
  Icon,
  Image,
  Navigator,
  Text,
  Input,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useCallback, FC } from "react";
import { showTip } from "@/utils/tip";
import { isISBN } from "@/utils/validator";
import { SearchBarProps } from "../../type";
import "./index.less";

const list = ["书名", "作者", "ISBN", "标签", "高级搜索"];

const HomeSearchBar: FC<SearchBarProps> = ({ onSearch, onFocus, onCancle }) => {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("书名");
  const [InputValue, setInputValue] = useState("");
  const _onFocus = useCallback(
    (e) => {
      setFocus(true);
      onFocus();
    },
    [setFocus, onFocus]
  );

  const _onTapOptionBtn = useCallback(() => {
    setShow(!show);
  }, [show]);

  const _onSelectOption = useCallback(
    (e) => {
      if (e.currentTarget.dataset.option === "高级搜索") {
        Taro.navigateTo({ url: "./children/advanced-search/index" });
        return;
      }

      if (e.currentTarget.dataset.option === "ISBN") {
        showTip("SEARCH_SCAN");
      }
      setSelected(e.currentTarget.dataset.option);
      setShow(false);
    },
    [setSelected, setShow]
  );

  const _onCancel = useCallback(() => {
    setFocus(false);
    setShow(false);
    setInputValue("");
    onCancle();
  }, [setFocus, setShow, setInputValue, onCancle]);

  const _onClear = useCallback(() => {
    setInputValue("");
  }, [setInputValue]);

  const _onInput = useCallback(
    (e) => {
      setInputValue(e.detail.value);
    },
    [setInputValue]
  );

  const _onConfirm = useCallback(
    (e) => {
      if (InputValue) {
        // 请求列表
        onSearch(selected, InputValue);
      }
    },
    [InputValue, selected]
  );

  const _onScan = (e) => {
    e.stopPropagation();
    Taro.scanCode({ scanType: ["barCode"] }).then((res) => {
      if (!isISBN(res.result)) {
        return Taro.showModal({
          title: "扫描内容不合法",
          content: "请扫描图书ISBN条形码",
          showCancel: false,
        });
      } else {
        // 跳转到对应书籍
        Taro.navigateTo({ url: "" });
      }
    });
  };

  return (
    <View className="home-search-bar weui-search-bar">
      {/* 输入框 */}
      <View className="weui-search-bar__form">
        {/* <!-- 聚焦后的搜索类型列表 --> */}
        <View
          className="home-search-bar__option-btn"
          hoverClass="ui--active"
          onTap={_onTapOptionBtn}
        >
          <View>{selected}</View>
          <View className="icon-down"></View>
        </View>
        {show && (
          <View className="home-search-bar__option-list">
            {list.map((item) => {
              return (
                <View
                  className="home-search-bar__option-item"
                  key={item}
                  data-option={item}
                  onTap={_onSelectOption}
                >
                  {item}
                </View>
              );
            })}
          </View>
        )}
        {/*     <!-- 聚焦后的搜索输入框 --> */}
        <View className="home-search-bar__input-box weui-search-bar__box">
          <Icon
            className="weui-icon-search_in-box"
            type="search"
            size="14"
          ></Icon>
          <Input
            type="text"
            className="weui-search-bar__input"
            confirm-type="search"
            placeholder="搜索"
            focus={focus}
            value={InputValue}
            onInput={_onInput}
            onConfirm={_onConfirm}
          />
          {InputValue.length <= 0 ? (
            <Image
              mode="aspectFit"
              className="home-search-bar__icon-scan"
              src={require("@/images/icon_scan.png")}
              onTap={_onScan}
            ></Image>
          ) : (
            <View className="weui-icon-clear" onTap={_onClear}>
              <Icon type="clear" size="14"></Icon>
            </View>
          )}
        </View>
        {/* <!-- 未聚焦时的搜索输入框 --> */}
        {!focus && (
          <Label className="weui-search-bar__label" onTap={(e) => _onFocus(e)}>
            <Icon type="search" size="14" className="weui-icon-search"></Icon>
            <View className="weui-search-bar__text">搜索图书</View>
          </Label>
        )}
        {/* <!-- 扫描图标 --> */}
        {!focus && (
          <Image
            src={require("@/images/icon_scan.png")}
            mode="aspectFit"
            className="home-search-bar__icon-scan"
            onTap={_onScan}
          ></Image>
        )}
      </View>
      {/* 分类按钮 */}
      {!focus && (
        <Navigator
          className="home-search-bar__category"
          url="./children/classification"
        >
          <Image
            mode="widthFix"
            src={require("@/images/icon_drawer.png")}
          ></Image>
          <Text>分类</Text>
        </Navigator>
      )}

      {focus && (
        <View className="weui-search-bar__cancel-btn" onTap={_onCancel}>
          取消
        </View>
      )}
    </View>
  );
};

export default HomeSearchBar;
