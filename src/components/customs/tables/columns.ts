import { convertColor } from '@app/utils/converts';
import numeral from 'numeral';

export const roleColumn = [
  {
    title: 'ID vai trò',
    dataIndex: 'id',
  },
  {
    title: 'Mã vai trò',
    dataIndex: 'code',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return record ? date.toLocaleDateString('en-GB') : '';
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const PropductColumn = [
  {
    title: 'Mã',
    dataIndex: 'code',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    render: (record: number) => {
      return `${record?.toLocaleString('en-US', { useGrouping: true }) || 0}đ`;
    },
  },
  {
    title: 'Nhóm sản phẩm',
    dataIndex: 'product_group',
    render: (record: { id: number; name: string }) => {
      return record?.name;
    },
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const column = [
  {
    title: 'Mã',
    dataIndex: 'code',
    editable: true,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    editable: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    editable: false,
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    editable: false,
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const columnSouce = [
  {
    title: 'Tên',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    editable: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    editable: false,
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    editable: false,
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const saleColumn = [
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Loại quy trình',
    dataIndex: 'type',
    render: (record: string): string => {
      return record === 'leads' ? 'Tiềm năng' : 'Khách hàng';
    },
  },
  {
    title: 'Thứ tự',
    dataIndex: 'sale_process_index',
    align: 'right',
  },
  {
    title: 'Màu',
    dataIndex: 'color',
    render: (record: any) => {
      return convertColor(record);
    },
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    editable: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const CarrerColumn = [
  {
    title: 'Mã',
    dataIndex: 'code',
    editable: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    editable: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    editable: false,
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    editable: false,
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permission: string;
  is_active: boolean;
}

export const userColumn = [
  {
    title: 'Tài khoản',
    dataIndex: 'username',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Mã AM',
    dataIndex: 'am_code',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'right',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'department',
    render: (record: Department): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Phòng ban',
    dataIndex: 'parent_department',
    render: (record: Department): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    render: (record: Role): string | null => {
      return record?.name || null;
    },
  },
];

export const columnLead = [
  {
    title: 'Tỉnh/Thành phố',
    dataIndex: 'province',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Quận/Huyện',
    dataIndex: 'district',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Phường/Xã',
    dataIndex: 'area',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Nhân viên phụ trách',
    dataIndex: 'employee',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Tên doanh nghiệp',
    dataIndex: 'company_name',
  },
  {
    title: 'Tên người đại diện',
    dataIndex: 'name',
  },
  {
    title: 'SĐT di động',
    dataIndex: 'phone_number',
    align: 'right',
  },
  {
    title: 'SĐT doanh nghiệp',
    dataIndex: 'headquarters_phone',
    align: 'right',
  },
  {
    title: 'Email doanh nghiệp',
    dataIndex: 'headquarters_email',
  },
  {
    title: 'Email người đại diện',
    dataIndex: 'email',
  },
  {
    title: 'Nguồn gốc',
    dataIndex: 'customer_source',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Lĩnh vực hoạt động',
    dataIndex: 'company_field',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Quy trình bán hàng',
    dataIndex: 'sale_process',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Địa chỉ trụ sở chính',
    dataIndex: 'headquarters_address',
  },
  {
    title: 'Tỉnh/Thành phố',
    dataIndex: 'province',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Quận/Huyện',
    dataIndex: 'district',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Phường/Xã',
    dataIndex: 'area',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    align: 'right',
    render: (record: any): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    align: 'right',
    render: (record: any): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
];

export const columnQuotes = [
  {
    title: 'Ngày báo giá',
    dataIndex: 'quote_date',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Tên doanh nghiệp',
    dataIndex: 'company_name',
    align: 'left',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer',
    align: 'left',
    render: (record: any) => {
      return record?.name || null;
    },
  },
  {
    title: 'Mã số thuế',
    dataIndex: 'tax_code',
    align: 'right',
  },
  {
    title: 'Email khách hàng',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại khách hàng',
    align: 'right',
    dataIndex: 'phone_number',
  },
  {
    title: 'Nhân viên phụ trách',
    dataIndex: 'employee',
    render: (record: any): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Số điện thoại nhân viên',
    dataIndex: 'employee',
    align: 'right',
    render: (record: any): string | null => {
      return record?.phone || null;
    },
  },
  {
    title: 'Tổng cộng',
    dataIndex: 'total_amount',
    render: (record: { id: number; name: string }): string | null => {
      return `${numeral(record).format('0,0 đ')}đ` || null;
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    render: (record: any): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Mã báo giá',
    dataIndex: 'code',
    align: 'right',
  },
];

export const columnOrder = [
  {
    title: 'Số hợp đồng',
    dataIndex: 'contract_no',
    align: 'left',
  },
  {
    title: 'Ngày tạo hợp đồng',
    dataIndex: 'created_date',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'started_date',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'end_date',
    align: 'right',
    render: (record: string): string => {
      const date = new Date(record);
      return date.toLocaleDateString('en-GB');
    },
  },
  {
    title: 'Mã số thuế',
    dataIndex: 'tax_code',
    align: 'left',
  },
  {
    title: 'Mã đơn vị phát triển',
    dataIndex: 'shop_code',
    align: 'left',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customer',
    align: 'left',
    render: (record: any) => {
      return record.name || null;
    },
  },
  {
    title: 'Tên đơn vị phát triển',
    dataIndex: 'shop_name',
    align: 'left',
  },
  {
    title: 'Tên nhân viên phát triển',
    dataIndex: 'am_name',
  },
];
