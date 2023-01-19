import React, { useState, useCallback, useEffect } from "react";
import { View } from "@tarojs/components";
import { getUID } from "@/utils/permission";
import { getOrdersByUserId } from "@/servers/apis/order";

type LoadingType = "loading" | "error" | "done";

const OldHistory = () => {
  const [pageStatus, setPageStatus] = useState<LoadingType>("loading");
  const [orders, setOrders] = useState([]);

  const _loadPage = useCallback(() => {
    setPageStatus("loading");
    getOrdersByUserId(getUID(), "history")
      .then((res) => {
        console.log(res);
        setPageStatus("done");
        setOrders(res.data.orders);
      })
      .catch(() => setPageStatus("error"));
  }, []);

  useEffect(() => {
    _loadPage();
  }, []);

  return <View>OldHistory</View>;
};

export default React.memo(OldHistory);
