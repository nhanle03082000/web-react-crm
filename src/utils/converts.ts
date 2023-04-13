export const ConvertTextCheckBox = (key: string): string => {
  switch (key) {
    case 'export':
      return 'Xuất dữ liệu';
      break;
    case 'index':
      return 'Xem';
      break;
    case 'create':
      return 'Thêm';
      break;
    case 'show':
      return 'Chi tiết';
      break;
    case 'edit':
      return 'Sửa';
      break;
    case 'delete':
      return 'Xóa';
      break;
    default:
      return key;
      break;
  }
};

export const ConvertTextRoles = (key: string): string => {
  switch (key) {
    case 'roles':
      return 'Vai trò';
      break;
    case 'users':
      return 'Người dùng';
      break;
    case 'departments':
      return 'Phòng ban';
      break;
    case 'product_groups':
      return 'Nhóm sản phẩm/ giải pháp';
      break;
    case 'roducts':
      return 'Sản phẩm/ giải pháp';
      break;
    case 'company_types':
      return 'Loại hình doanh nghiệp';
      break;
    case 'company_fields':
      return 'Lĩnh vực doanh nghiệp';
      break;
    case 'company_careers':
      return 'Ngành nghề doanh nghiệp';
      break;
    case 'customer_sources':
      return 'Nguồn gốc doanh nghiệp';
      break;
    case 'potential_customers':
      return 'Tiềm năng';
      break;
    case 'sale_processes':
      return 'Bán hàng';
      break;
    default:
      return key;
      break;
  }
};
