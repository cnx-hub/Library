import request from "../index";

export function getOrdersByUserId(uid: number, type: string, start = 0) {
  return request.get(`/orders/users/${uid}`, { type, start });
}
