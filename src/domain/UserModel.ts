export interface UserModel {
  [x: string]: any;
  stt: number | null;
  userid: number;
  code: string;
  ho: string;
  ten: string;
  hoten: string;
  gioitinh: number;
  ngaysinh: string;
  mobile: number | null;
  eznumber: number | null;
  dienthoai: string;
  email: string;
  phanloai: number;
  tenchucdanh: string;
  mschucvu: number;
  tenchucvu: null;
  msbophan: number;
  tenbophan: string;
  msphongban: number;
  tenphongban: string;
  mstinh: null | string | number;
  matinh: null | string | number;
  mshuyen: null | string | number;
  account: string;
  channel: string;
  token: string;
}
