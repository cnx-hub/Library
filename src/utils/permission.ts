import Taro from "@tarojs/taro";
/**
 * 用户id，指示当前登录用户
 */
var UID;

/**
 * 用户token
 */
var TOKEN;

/**
 * storage key
 */
const UID_KEY = "UID";
const TOKEN_KEY = "TOKEN";

function setToken(token: string) {
  TOKEN = token;
}

/**
 * 获取用户token
 * @return integer|null
 */

export function getToken() {
  return Taro.getStorageSync(TOKEN_KEY);
}

/**
 * 设置用户id
 */
function setUID(uid) {
  UID = uid;
}

/**
 * 获取用户id
 * @return integer|null
 */

export function getUID() {
  return Taro.getStorageSync(UID_KEY);
}

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
              url: "'/pages/register/index?need_return=true'",
            });
          }
        },
      });
    }
    return false;
  }
}

/**
 * 设置登录态，保存用户token与用户信息
 */

export function login(token: string, userInfo: any) {
  try {
    Taro.setStorageSync(TOKEN_KEY, token);
    Taro.setStorageSync(UID_KEY, userInfo.id);
    Taro.setStorageSync("USER_INFO", userInfo);
    setToken(token);
    setUID(userInfo.id);
    return true;
  } catch (e) {
    console.error("设置storage失败: " + e);
    return false;
  }
}
