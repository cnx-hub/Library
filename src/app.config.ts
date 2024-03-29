export default {
  pages: [
    "pages/index/index",
    "pages/home/index",
    "pages/booklist/index",
    "pages/cart/index",
    "pages/profile/index",
    "pages/profile/chidren/about/index",
    "pages/profile/chidren/qrcode/qrcode",
    "pages/profile/chidren/personalInformation/personalInformation",
    "pages/profile/chidren/children/personal-information-modify/index",
    "pages/register/index",
    "pages/home/children/advanced-search/index",
    "pages/list/book",
    "pages/book-detail/index",
  ],

  subpackages: [
    // 首页子包
    {
      root: "pages/package/home",
      pages: ["order-history/index"],
    },
  ],
  window: {
    backgroundTextStyle: "dark",
    navigationBarBackgroundColor: "#000",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "images/icon_home_line.png",
        selectedIconPath: "images/icon_home_fill.png",
        selectedColor: "#09BB07",
      },
      {
        pagePath: "pages/booklist/index",
        text: "书单",
        iconPath: "images/icon_booklist_line.png",
        selectedIconPath: "images/icon_booklist_fill.png",
        color: "#ddd",
        selectedColor: "#09BB07",
      },
      {
        pagePath: "pages/cart/index",
        text: "借书栏",
        iconPath: "images/icon_cart_line.png",
        selectedIconPath: "images/icon_cart_fill.png",
        selectedColor: "#09BB07",
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "images/icon_me_line.png",
        selectedIconPath: "images/icon_me_fill.png",
        selectedColor: "#09BB07",
      },
    ],
  },
};
