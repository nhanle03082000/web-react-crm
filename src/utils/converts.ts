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
    case 'import':
      return 'Nhập file';
      break;
    case 'assign':
      return 'Phân quyền';
      break;
    case 'admin_system':
      return 'Quản trị bộ phận';
      break;
    case 'admin_department':
      return 'Quản trị phòng ban';
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
    case 'provinces':
      return 'Tỉnh/Thành phố';
      break;
    case 'districts':
      return 'Quận/Huyện';
      break;
    case 'areas':
      return 'Phường/Xã';
      break;
    case 'lead_notes':
      return 'Ghi chú - tiềm năng';
      break;
    case 'lead':
      return 'Tiềm năng';
      break;
    case 'email_config':
      return 'Cấu hình mail';
      break;
    case 'logs':
      return 'Nhật ký';
      break;
    case 'customers':
      return 'Khách hàng';
      break;
    case 'products':
      return 'Sản phẩm';
      break;
    case 'customer_notes':
      return 'Ghi chú - khách hàng';
      break;
    case 'customer_products':
      return 'Giải pháp - khách hàng';
      break;
    case 'customer_contacts':
      return 'Thông tin liên hệ - Khách hàng';
      break;
    case 'customer_reminders':
      return 'Nhắc nhỡ - Khách hàng';
      break;
    case 'tasks':
      return 'Công việc - Khách hàng';
      break;
    case 'quotes':
      return 'Lịch sử báo giá - Khách hàng';
      break;
    case 'quote_details':
      return 'Chi tiết lịch sử báo giá - Khách hàng';
      break;
    case 'notifications':
      return 'Thông báo';
      break;
    case 'orders':
      return 'Đơn hàng - Khách hàng';
      break;
    case 'order_details':
      return 'Chi tiết đơn hàng - Khách hàng';
      break;
    default:
      return key;
      break;
  }
};
