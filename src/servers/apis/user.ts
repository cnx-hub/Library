import request from "../index";

export function sendCode(phone: string) {
  return request.post(`/codes?phone=${phone}&type=wechat`);
}

export function checkCode<T>(phone: string, code: string) {
  return request.get<T>("/codes/check", { phone, code, type: "wechat" });
}
