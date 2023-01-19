/**
 * 和业务相关的一些常量
 */

/**
 * 用户账号状态
 */
export const USER_STATUS_REVIEWING = 0; // 审核中
export const USER_STATUS_APPROVED = 1; // 审核通过
export const USER_STATUS_REJECTED = 2; // 审核未通过

/**
 * 和业务相关的一些常量，具体定义见constant.js
 */
export const ORDER_STATUS = {
  WAITING_FOR_OTHERS_TO_RETURN: 1001,
  WAITING_TO_TAKE_RETURNED_BOOK: 1002,
  WAITING_TO_TAKE_AT_PLANED_TIME: 1003,
  BORROWING: 1004,
  NORMAL_CLOSE: 1011,
  ABNORMAL_CLOSE: 1012,
  CANCELED_BY_USER: 1021,
};
