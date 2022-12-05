import { memo, FC, useState, PureComponent } from "react";
import { View } from "@tarojs/components";
import classNames from "classnames";
import "./index.less";

interface Iprops {
  title: string;
  actionText?: string;
}

class Collapse extends PureComponent<Iprops, any> {
  static externalClasses = ["header-class"];

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  _toggle() {
    this.setState({ show: !this.state.show });
    if (this.state.show) {
      // 通知show事件
    } else {
      // 通知hide事件
    }
  }

  render() {
    const { show } = this.state;
    const { title, actionText, children } = this.props;
    return (
      <View className="collapse">
        <View
          className="collapse__header font-gray-28 header-class"
          onClick={() => this._toggle()}
        >
          <View className={show ? "icon-down" : "icon-right"}></View> {title}
          {actionText && (
            <View className="collapse__header-action">{actionText}</View>
          )}
        </View>
        <View
          className={classNames("collapse__body", {
            "collapse__body--show": show,
          })}
        >
          {children}
        </View>
      </View>
    );
  }
}

export default Collapse;
