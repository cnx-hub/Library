export const isPhone = (str: string) => /^1[3|4|5|7|8][0-9]{9}$/.test(str);

export const isVrcode = (str: string) => /^[0-9]{6}$/.test(str); // 6位数字验证码

export const isEmpty = (str: string) => /^\s+$/.test(str); // 全是空白符

export const isISBN = (str: string) => /^[0-9]{13}$/.test(str); // ISBN
