import React from "react";
import { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";

const Book = React.memo(() => {
  const router = useRouter();
  console.log(router);

  return <View>Book</View>;
});

export default Book;
