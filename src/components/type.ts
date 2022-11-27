export interface IVrcode {
  defaultText?: string;
  pendingText?: string;
  countingText?: string;
  duration?: number;
  onSend: (e: any) => any;
}

export interface ISentBtn {
  start: () => void;
  prepare: () => void;
  stop: () => void;
}

export interface IToast {
  changeShow: (title: string, options?: { duration: number }) => void;
}

export interface IOptions {
  duration: number;
  type: string;
}

export interface IToptip {
  changeShow: (content: string, options?: IOptions) => void;
}
