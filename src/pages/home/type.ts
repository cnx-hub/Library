export interface SearchBarProps {
  onSearch: (type: string, value: string) => void;
  onFocus: () => void;
  onCancle: () => void;
}

export type IpageStatus = "loading" | "error" | "done";

export interface IPageStatusIndicator {
  pageStatus: IpageStatus;
  message?: string;
  btnText?: string;
  onReloadPage?: () => {};
}

export interface Istatistics {
  page_num: number;
  book_num: number;
}
