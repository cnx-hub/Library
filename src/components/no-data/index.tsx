import React from "react";
import { View, Icon, Text } from "@tarojs/components";
import "./index.less";

interface IProp {
  text?: string;
}

const NoData = React.memo<IProp>(({ text }) => {
  return (
    <View className="no-data">
      <Icon type="search" size="40" />
      <Text className="no-data__text font-30">{text || "暂无数据"}</Text>
    </View>
  );
});

export default NoData;
