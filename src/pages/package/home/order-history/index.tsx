import React, { useState, useCallback, useEffect } from "react";
import { useReachBottom } from "@tarojs/taro";
import { View, Navigator, Image, Text } from "@tarojs/components";
import { getUID } from "@/utils/permission";
import { getOrdersByUserId } from "@/servers/apis/order";
import { PageStatusIndicator } from "@/template/page-status-indicator";
import NoData from "@/components/no-data";
import LoadMore from "@/components/load-more";
import { ORDER_STATUS } from "@/utils/constant";

type LoadingType = "loading" | "error" | "done";
type LoadMoreStatusType = "hidding" | "loading" | "nomore";

const OldHistory = () => {
  const [pageStatus, setPageStatus] = useState<LoadingType>("loading");
  const [loadMoreStatus, setLoadMoreStatus] =
    useState<LoadMoreStatusType>("hidding");
  const [orders, setOrders] = useState<any>([]);

  const _loadPage = useCallback(() => {
    setPageStatus("loading");
    getOrdersByUserId(getUID(), "history")
      .then((res) => {
        setPageStatus("done");
        setOrders(res.orders);
      })
      .catch(() => {
        setPageStatus("error");
      });
  }, [setPageStatus, setOrders]);

  useReachBottom(() => {
    if (loadMoreStatus !== "hidding") return;
    setLoadMoreStatus("loading");
    getOrdersByUserId(getUID(), "history", orders.length)
      .then((res) => {
        setLoadMoreStatus(res.orders.length ? "hidding" : "nomore");
        setOrders(orders.concat(res.orders));
      })
      .catch(() => setLoadMoreStatus("hidding"));
  });

  useEffect(() => {
    _loadPage();
  }, []);

  return (
    <>
      <PageStatusIndicator pageStatus={pageStatus} />
      {pageStatus === "done" && (
        <>
          {orders.length ? (
            <View className="weui-cells weui-cells_after-title">
              {orders.map((item, index) => {
                return (
                  <Navigator
                    key={item.id}
                    url="./children/order-detail?id={{item.id}}"
                    className="weui-cell ui-book-card"
                    hoverClass="ui--active"
                    id="{{item.id}}"
                  >
                    <Image
                      className="ui-book-card__img"
                      src={item.book.imgs.small}
                      mode="widthFix"
                    />
                    <View className="ui-book-card__info font-gray-26">
                      <View className="ui-book-card__info-title font-black-34">
                        {item.book.title}
                      </View>
                      <View>
                        作者:
                        {item.book.author.map((item) => {
                          return (
                            <Text
                              key={item}
                              className="ui-book-card__info-name"
                            >
                              {item}
                            </Text>
                          );
                        })}
                      </View>
                      <View>出版社: {item.book.publisher}</View>
                      <View>图书馆: {item.library.name}</View>
                      {item.status == ORDER_STATUS.CANCELED_BY_USER ? (
                        <>
                          <View>创建日期：{item.created_at}</View>
                          <View>订单状态：已取消</View>
                        </>
                      ) : (
                        <>
                          <View>借阅日期：{item.actual_take_time}</View>
                          <View>还书日期：{item.actual_return_time}</View>
                        </>
                      )}
                    </View>
                    <View className="weui-cell__ft_in-access"></View>
                  </Navigator>
                );
              })}
            </View>
          ) : (
            <NoData />
          )}
          <LoadMore status={loadMoreStatus} nomoreText="没有更多订单了" />
        </>
      )}
    </>
  );
};

export default React.memo(OldHistory);
