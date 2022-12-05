import React, { useState } from "react";
import { View, Button, Navigator } from "@tarojs/components";
import "./index.less";

const Cart = React.memo(() => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  return (
    <>
      <View className="weui-panel weui-panel_access">
        <View className="weui-panel__hd font-black-34">已选图书</View>
        <View className="weui-panel__bd">
          {selectedBooks.length === 0 && (
            <View className="weui-media-box weui-media-box_text">
              <View className="weui-media-box__desc">你还没有选择任何图书</View>
            </View>
          )}
        </View>
      </View>

      {!selectedBooks.length && (
        <View className="weui-panel weui-panel_access">
          <View className="weui-panel__hd font-black-34">借书步骤</View>
          <View className="weui-panel__bd">
            <View className="weui-media-box weui-media-box_text step font-black-26">
              <View>
                1、扫描图书馆图书的ISBN条形码，将其添加入借书栏，一次最多可添加两本图书
              </View>
              <View>2、携带图书到前台，向管理员出示借书二维码</View>
              <View>3、管理员确认后，微信支付提交押金，借书成功</View>
            </View>
          </View>
          <View className="weui-panel__ft">
            <Navigator url="./children/help">
              <View className="weui-cell weui-cell_access weui-cell_link">
                <View className="weui-cell__bd">如何在线预订</View>
                <View className="weui-cell__ft weui-cell__ft_in-access"></View>
              </View>
            </Navigator>
          </View>
        </View>
      )}

      <View className="weui-btn-area">
        <Button type="primary" className="weui-btn">
          扫描图书条形码
        </Button>
      </View>
    </>
  );
});

export default Cart;
