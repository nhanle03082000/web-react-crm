import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Column {
  name: string;
  status: boolean;
}

interface TableState {
  leadColumns: Column[];
  customerColumns: Column[];
  quotesColumns: Column[];
}

const initialColumns: Column[] = [
  { name: 'STT', status: true },
  { name: 'Thao tác', status: true },
  { name: 'Mã số thuế', status: true },
  { name: 'Tỉnh/Thành phố', status: true },
  { name: 'Quận/Huyện', status: true },
  { name: 'Phường/Xã', status: true },
  { name: 'Nhân viên phụ trách', status: true },
  { name: 'Tên doanh nghiệp', status: true },
  { name: 'SĐT di động', status: true },
  { name: 'SĐT doanh nghiệp', status: true },
  { name: 'Email doanh nghiệp', status: true },
  { name: 'Lĩnh vực hoạt động', status: true },
  { name: 'Quy trình bán hàng', status: true },
  { name: 'Địa chỉ trụ sở chính', status: true },
  { name: 'Ngày tạo', status: true },
  { name: 'Ngày cập nhật', status: true },
];

const initialQuotesColumns: Column[] = [
  { name: 'STT', status: true },
  { name: 'Thao tác', status: true },
  { name: 'Ngày báo giá', status: true },
  { name: 'Tên doanh nghiệp', status: true },
  { name: 'Mã số thuế', status: true },
  { name: 'Khách hàng', status: true },
  { name: 'Email khách hàng', status: true },
  { name: 'SĐT khách hàng', status: true },
  { name: 'Nhân viên phụ trách', status: true },
  { name: 'SĐT nhân viên', status: true },
  { name: 'Tổng cộng', status: true },
  { name: 'Ngày tạo', status: true },
];

const initialState: TableState = {
  leadColumns: initialColumns,
  customerColumns: initialColumns,
  quotesColumns: initialQuotesColumns,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    updateLeadColumnStatus: (state, action) => {
      state.leadColumns[action.payload.index].status = action.payload.checked;
      localStorage.setItem('leadColumns', JSON.stringify(state.leadColumns));
    },
    updateCustomerColumnStatus: (state, action) => {
      state.customerColumns[action.payload.index].status = action.payload.checked;
      localStorage.setItem('customerColumns', JSON.stringify(state.customerColumns));
    },
    updateQuotesColumnStatus: (state, action) => {
      state.quotesColumns[action.payload.index].status = action.payload.checked;
      localStorage.setItem('quotesColumns', JSON.stringify(state.quotesColumns));
    },
  },
});

export const { updateLeadColumnStatus, updateCustomerColumnStatus, updateQuotesColumnStatus } = columnSlice.actions;
export const selectLeadColumns = (state: RootState) => state.col.leadColumns;
export const selectCustomerColumns = (state: RootState) => state.col.customerColumns;
export const selectQuotesColumns = (state: RootState) => state.col.quotesColumns;
export default columnSlice.reducer;
