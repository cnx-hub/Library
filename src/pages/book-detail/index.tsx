import React from "react";
import { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";

const BookDetail = React.memo(() => {
  const router = useRouter();
  console.log(router);

  return <View>BookDetail</View>;
});

export default BookDetail;
