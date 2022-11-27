import Taro from "@tarojs/taro";

import type { RequestMethod } from "./type";

/**
 * 服务器根路径
 */ const BASE_URL = "http://localhost:3000/api/v1";
const DOMAIN_NAME = "这里需要填写真实服务器地址，用来上传图片";

export class Request {
  /**
   * request 基类方法
   * 状态码 ≥ 400 时，返回 rejected 状态的 promise
   * @param method 请求方式 必填
   * @param relativeUrl 相对路径 必填
   * @param param 参数 可选
   * @param header 请求头参数 可选
   * @returns {Promise} 返回响应完整内容
   */
  request<T>(
    method: RequestMethod,
    relativeUrl: string,
    param?: object,
    header?: object
  ) {
    // 删除所有为 null 的参数
    for (let key in param) {
      if (param[key] === null) {
        delete param[key];
      }
    }
    let response, error;
    return new Promise<T>((resolve, reject) => {
      Taro.request({
        url: BASE_URL + relativeUrl,
        method: method,
        header: Object.assign(
          {
            "Content-Type": "application/json",
            // token
          },
          header
        ),
        data: param || {},
        success(res) {
          response = res;
          if (response.statusCode < 400) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },

        fail(err) {
          error = err;
          reject(err);
        },

        complete() {
          console.info("==============>请求开始<==============");
          console.warn(method, BASE_URL + relativeUrl);
          if (param) console.warn("参数：", param);
          if (response) {
            console.warn("请求成功：", response);
          } else {
            console.warn("请求失败：", error);
          }
          console.info("==============>请求结束<==============");
        },
      });
    });
  }

  /**
   * 请求失败时，显示服务器的错误信息(data.message)或微信的错误信息(errMsg)
   */
  requestWithModal<T>(
    method: RequestMethod,
    relativeUrl: string,
    param?: object,
    header?: object
  ) {
    return this.request<T>(method, relativeUrl, param, header).catch((res) => {
      let errMsg;
      if (res && res.data.message) {
        errMsg = res.data.message;
      } else {
        errMsg = res.statusCode ? "发生未知错误，请联系开发者" : res.errMsg;
      }

      Taro.showModal({
        content: errMsg,
        showCancel: false,
      });

      return Promise.reject(res);
    });
  }
  /**
   * get 方法
   * @param relativeUrl 相对路径 必填
   * @param param 参数 可选
   * @param header 请求头参数 可选
   * @returns {Promise}
   */
  get<T = any>(relativeUrl: string, params?: object, header?: object) {
    return this.requestWithModal<T>("GET", relativeUrl, params, header);
  }
  /**
   * post 方法
   */
  post<T = any>(relativeUrl: string, params?: object, header?: object) {
    return this.requestWithModal<T>("POST", relativeUrl, params, header);
  }
  /**
   * del 方法
   */
  delete<T = any>(relativeUrl: string, params?: object, header?: object) {
    return this.requestWithModal<T>("DELETE", relativeUrl, params, header);
  }
}

const request = new Request();

export default request;
