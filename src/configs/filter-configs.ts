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
    value: 'role.name',
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

const filterLead = [
  {
    value: 'tax_code',
    label: 'Mã số thuế',
    type: 'string',
  },
  {
    value: 'province.name',
    label: 'Tỉnh/TP',
    type: 'string',
  },
  {
    value: 'district.name',
    label: 'Quận/Huyện',
    type: 'string',
  },
  {
    value: 'area.name',
    label: 'Phường/Xã',
    type: 'string',
  },
  {
    value: 'employee.name',
    label: 'Nhân viên phụ trách',
    type: 'string',
  },
  {
    value: 'company_name',
    label: 'Tên doanh nghiệp',
    type: 'string',
  },
  {
    value: 'name',
    label: 'Tên người đại diện',
    type: 'string',
  },
  {
    value: 'phone',
    label: 'SĐT người đại diện',
    type: 'string',
  },
  {
    value: 'headquarters_phone',
    label: 'SĐT doanh nghiệp',
    type: 'string',
  },
  {
    value: 'headquarters_email',
    label: 'Email doanh nghiệp',
    type: 'string',
  },
  {
    value: 'email',
    label: 'Email người đại diện',
    type: 'string',
  },
  {
    value: 'customer_source.name',
    label: 'Nguồn gốc',
    type: 'string',
  },
  {
    value: 'company_field.name',
    label: 'Lĩnh vực',
    type: 'string',
  },
  {
    value: 'sale_process.name',
    label: 'Quy trình bán hàng',
    type: 'string',
  },
  {
    value: 'headquarters_address',
    label: 'Địa chỉ',
    type: 'string',
  },
  {
    value: 'employee.shop_code',
    label: 'Theo đơn vị',
    type: 'string',
  },
];

export { filter, filterLead, rolefilter, saleFilter, userFilter, filterHaveCode, filterProduct };
