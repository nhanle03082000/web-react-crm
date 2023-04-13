export const API_BASE_URL = 'http://10.151.122.33:3033';
export const API_LOGINSSO_URL = 'https://loginportal.mobifone9.vn/auth/v1/loginSSO';
export const API_CHECKLOGINSSO_URL = `${API_BASE_URL}/loginSSO`;

export const API_URL = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  DEFAULTPERMISSION: '/roles/default-permisson',
  PRODUCTS: '/products',
  PROVINCES: '/provinces',
  DISTRICT: '/district',
  AREA: '/area',
  // ------settings-------//
  USERS: '/users',
  PRODUCTGROUPS: '/product_groups',
  ROLES: '/roles',
  COMPANYTYPES: '/company_types',
  COMPANYCAREERS: '/company_careers',
  COMPANYFIELDS: '/company_fields',
  CUSTOMERSOURCES: '/customer_sources',
  SALEPROCESSES: '/sale_processes',
  MAIL: '/settings/email',
  // ------settings-------//
  LEAD: '/leads',
  //----customer----//
  CUSTOMER: '/customers',
  CUSTOMERPRODUCTS: '/customer_products',
  CUSTOMERREMINDERS: '/customer_reminders',
  CUSTOMERNOTES: '/customer_notes',
  CUSTOMERCONTACTS: '/customer_contacts',
  CUSTOMERINTERACTIONS: '/customers/interactions',
  CUSTOMERTASK: '/tasks',
  QUOTES: '/quotes',
};
