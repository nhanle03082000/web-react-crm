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
      return 'Phân công';
      break;
    case 'admin_system':
      return 'Quản trị hệ thống';
      break;
    case 'admin_department':
      return 'Quản trị phòng ban';
      break;
    default:
      return key;
      break;
  }
};

export const ConvertTextRoles = (data: any): any => {
  console.log(data);
  data.forEach((item: any) => {
    switch (item.name) {
      case 'roles':
        item.name = 'Vai trò';
        break;
      case 'users':
        item.name = 'Người dùng';
        break;
      case 'departments':
        item.name = 'Phòng ban';
        break;
      case 'product_groups':
        item.name = 'Nhóm sản phẩm/ giải pháp';
        break;
      case 'roducts':
        item.name = 'Sản phẩm/ giải pháp';
        break;
      case 'company_types':
        item.name = 'Loại hình doanh nghiệp';
        break;
      case 'company_fields':
        item.name = 'Lĩnh vực doanh nghiệp';
        break;
      case 'company_careers':
        item.name = 'Ngành nghề doanh nghiệp';
        break;
      case 'customer_sources':
        item.name = 'Nguồn gốc doanh nghiệp';
        break;
      case 'potential_customers':
        item.name = 'Tiềm năng';
        break;
      case 'sale_processes':
        item.name = 'Bán hàng';
        break;
      case 'provinces':
        item.name = 'Tỉnh/Thành phố';
        break;
      case 'districts':
        item.name = 'Quận/Huyện';
        break;
      case 'areas':
        item.name = 'Phường/Xã';
        break;
      case 'lead_notes':
        item.name = 'Ghi chú - tiềm năng';
        break;
      case 'lead':
        item.name = 'Tiềm năng';
        break;
      case 'email_config':
        item.name = 'Cấu hình mail';
        break;
      case 'logs':
        item.name = 'Nhật ký';
        break;
      case 'customers':
        item.name = 'Khách hàng';
        break;
      case 'products':
        item.name = 'Sản phẩm';
        break;
      case 'customer_notes':
        item.name = 'Ghi chú - khách hàng';
        break;
      case 'customer_products':
        item.name = 'Giải pháp - khách hàng';
        break;
      case 'customer_contacts':
        item.name = 'Thông tin liên hệ - Khách hàng';
        break;
      case 'customer_reminders':
        item.name = 'Nhắc nhỡ - Khách hàng';
        break;
      case 'tasks':
        item.name = 'Công việc - Khách hàng';
        break;
      case 'quotes':
        item.name = 'Lịch sử báo giá - Khách hàng';
        break;
      case 'quote_details':
        item.name = 'Chi tiết lịch sử báo giá - Khách hàng';
        break;
      case 'notifications':
        item.name = 'Thông báo';
        break;
      case 'orders':
        item.name = 'Đơn hàng - Khách hàng';
        break;
      case 'order_details':
        item.name = 'Chi tiết đơn hàng - Khách hàng';
        break;
      case 'product_subs':
        item.name = 'Gói sản phẩm';
        break;
      case 'leads':
        item.name = 'Tiềm năng';
        break;
      default:
        return item.name;
        break;
    }
  });
};
