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
    title: 'Số điện thoại',
    dataIndex: 'phone',
    editable: true,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'department',
    editable: false,
    render: (record: Department): string => {
      return record.name;
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    editable: false,
    render: (record: Role): string => {
      return record.name;
    },
  },
];

export const columnLead = [
  {
    title: 'Mã số thuế',
    dataIndex: 'tax_code',
    editable: true,
  },
  {
    title: 'Nguồn gốc',
    dataIndex: 'customer_source',
    editable: true,
    render: (record: { id: number; name: string }): string => {
      return record.name;
    },
  },
  {
    title: 'Doanh nghiệp',
    dataIndex: 'company_name',
    editable: true,
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'SĐT di động',
    dataIndex: 'phone_number',
    editable: true,
  },
  {
    title: 'SĐT doanh nghiệp',
    dataIndex: 'headquarters_phone',
    editable: true,
  },
  {
    title: 'Email doanh nghiệp',
    dataIndex: 'headquarters_email',
    editable: true,
  },
  {
    title: 'Email cá nhân',
    dataIndex: 'email',
    editable: true,
  },
  {
    title: 'Lĩnh vực hoạt động',
    dataIndex: 'company_field',
    editable: true,
    render: (record: { id: number; name: string }): string => {
      return record.name;
    },
  },
  {
    title: 'Địa chỉ trụ sở chính',
    dataIndex: 'headquarters_address',
    editable: true,
  },
  {
    title: 'Tỉnh/Thành phố',
    dataIndex: 'province',
    editable: true,
    render: (record: { id: number; name: string }): string => {
      return record.name;
    },
  },
  {
    title: 'Quận/Huyện',
    dataIndex: 'district',
    editable: true,
    render: (record: { id: number; name: string }): string => {
      return record.name;
    },
  },
  {
    title: 'Phường/Xã',
    dataIndex: 'area',
    editable: true,
    render: (record: { id: number; name: string }): string => {
      return record.name;
    },
  },
];
