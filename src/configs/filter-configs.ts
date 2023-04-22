const filter = [
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  {
    value: 'description',
    label: 'Mô tả',
    type: 'string',
  },
  {
    value: 'created_at',
    label: 'Ngày tạo',
    type: 'datetime',
  },
  {
    value: 'updated_at',
    label: 'Ngày cập nhật',
    type: 'datetime',
  },
];

const rolefilter = [
  {
    value: 'id',
    label: 'ID',
    type: 'string',
  },
  {
    value: 'code',
    label: 'Mã',
    type: 'string',
  },
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  {
    value: 'description',
    label: 'Mô tả',
    type: 'string',
  },
  {
    value: 'created_at',
    label: 'Ngày tạo',
    type: 'datetime',
  },
  {
    value: 'updated_at',
    label: 'Ngày cập nhật',
    type: 'datetime',
  },
];

const saleFilter = [
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  {
    value: 'sale_process_index',
    label: 'Thứ tự',
    type: 'string',
  },
  {
    value: 'color',
    label: 'Màu',
    type: 'string',
  },
  {
    value: 'description',
    label: 'Mô tả',
    type: 'string',
  },
  {
    value: 'created_at',
    label: 'Ngày tạo',
    type: 'datetime',
  },
  {
    value: 'updated_at',
    label: 'Ngày cập nhật',
    type: 'datetime',
  },
];

const userFilter = [
  {
    value: 'username',
    label: 'Tài khoản',
    type: 'string',
  },
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  { value: 'am_code', label: 'Mã AM', type: 'string' },
  {
    value: 'phone',
    label: 'Số điện thoại',
    type: 'string',
  },
  {
    value: 'department.name',
    label: 'Đơn vị',
    type: 'string',
  },
  {
    value: 'parent_department.name',
    label: 'Phòng ban',
    type: 'string',
  },
  {
    value: 'role',
    label: 'Vai trò',
    type: 'string',
  },
];

const filterHaveCode = [
  {
    value: 'code',
    label: 'Mã',
    type: 'string',
  },
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  {
    value: 'description',
    label: 'Mô tả',
    type: 'string',
  },
  {
    value: 'created_at',
    label: 'Ngày tạo',
    type: 'datetime',
  },
  {
    value: 'updated_at',
    label: 'Ngày cập nhật',
    type: 'datetime',
  },
];

const filterProduct = [
  {
    value: 'code',
    label: 'Mã',
    type: 'string',
  },
  {
    value: 'name',
    label: 'Tên',
    type: 'string',
  },
  {
    value: 'price',
    label: 'Giá',
    type: 'string',
  },
  {
    value: 'product_group.name',
    label: 'Nhóm sản phẩm',
    type: 'string',
  },
  {
    value: 'description',
    label: 'Mô tả',
    type: 'string',
  },
  {
    value: 'created_at',
    label: 'Ngày tạo',
    type: 'datetime',
  },
  {
    value: 'updated_at',
    label: 'Ngày cập nhật',
    type: 'datetime',
  },
];

export { filter, rolefilter, saleFilter, userFilter, filterHaveCode, filterProduct };
