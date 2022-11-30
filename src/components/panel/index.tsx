import { View, Navigator, Slot } from "@tarojs/components";
import { IPanel } from "../type";
import "./index.less";
import { FC } from "react";

const Panel: FC<IPanel> = ({ url, title, children }) => {
  return (
    <View className="panel">
      <Navigator url={url} hoverClass="panel-hd--active">
        <View className="panel-hd">
          <View>{title}</View>
          <View className="panel-hd__arrow"></View>
        </View>
      </Navigator>
      <Slot>{children}</Slot>
    </View>
  );
};

export default Panel;
