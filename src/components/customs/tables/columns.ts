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
    render: (record: string): string => {
      const date = new Date(record);
      return record ? date.toLocaleDateString('en-GB') : '';
    },
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
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

export const saleColumn = [
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
    title: 'Loại quy trình',
    dataIndex: 'type',
    render: (record: string): string => {
      return record === 'leads' ? 'Tiềm năng' : 'Khách hàng';
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
    editable: true,
  },
  {
    title: 'Mã AM',
    dataIndex: 'am_code',
    editable: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    editable: true,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'department',
    editable: false,
    render: (record: Department): string | null => {
      return record?.name || null;
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    editable: false,
    render: (record: Role): string | null => {
      return record?.name || null;
    },
  },
];

export const columnLead = [
  {
    title: 'Mã số thuế',
    dataIndex: 'tax_code',
  },
  {
    title: 'Doanh nghiệp',
    dataIndex: 'company_name',
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
  },
  {
    title: 'SĐT di động',
    dataIndex: 'phone_number',
  },
  {
    title: 'SĐT doanh nghiệp',
    dataIndex: 'headquarters_phone',
  },
  {
    title: 'Email doanh nghiệp',
    dataIndex: 'headquarters_email',
  },
  {
    title: 'Email cá nhân',
    dataIndex: 'email',
  },
  {
    title: 'Nhân viên phụ trách',
    dataIndex: 'employee',
    render: (record: { id: number; name: string }): string | null => {
      return record?.name || null;
    },
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
];
