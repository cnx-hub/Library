import Taro from "@tarojs/taro";
/**
 * 用户id，指示当前登录用户
 */
var UID = null;

/**
 * 检测是否登录，弹出登录对话框（可选）
 * 用于需要登录的操作（如图书详情、书单详情等可分享页面中）
 * @param showModal {Boolean}
 * @return {Boolean}
 */

export function isLogin(showModal = false) {
  if (UID) {
    return true;
  } else {
    if (showModal) {
      Taro.showModal({
        title: "你还未登录",
        content: "登录之后才可使用完整功能，是否前去登录？",
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: "'/pages/register/register?need_return=true'",
            });
          }
        },
      });
    }
    return false;
  }
}
