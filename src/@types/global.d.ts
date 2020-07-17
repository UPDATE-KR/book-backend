type ApiResponse<T> = {
  result?: number;
  data?: T;
  resultCode?: string;
  resultMsg?: string;
};
