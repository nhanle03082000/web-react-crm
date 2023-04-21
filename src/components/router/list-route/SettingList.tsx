import { withLoading } from '@app/hocs/withLoading.hoc';
import React from 'react';

const RolePage = React.lazy(() => import('@app/pages/SettingPages/Roles/RolesPage'));
const ProductGroupsPages = React.lazy(() => import('@app/pages/SettingPages/ProductGroups/ProductGroups'));
const ProductsPages = React.lazy(() => import('@app/pages/SettingPages/Products/Products'));
const CompanyTypesPage = React.lazy(() => import('@app/pages/SettingPages/CompanyTypes/CompanyTypes'));
const CompanyFieldsPage = React.lazy(() => import('@app/pages/SettingPages/CompanyFields/CompanyFields'));
const CompanyCareersPage = React.lazy(() => import('@app/pages/SettingPages/CompanyCareers/CompanyCareers'));
const SaleProcessesPage = React.lazy(() => import('@app/pages/SettingPages/SaleProcesses/SaleProcesses'));
const CustomerSourcesPage = React.lazy(() => import('@app/pages/SettingPages/CustomerSources/CustomerSources'));
const UsersPage = React.lazy(() => import('@app/pages/SettingPages/Users/Users'));
const EmailSettingsPage = React.lazy(() => import('@app/pages/SettingPages/EmailSettings/EmailSettings'));

const Roles = withLoading(RolePage);
const ProductGroups = withLoading(ProductGroupsPages);
const Products = withLoading(ProductsPages);
const CompanyTypes = withLoading(CompanyTypesPage);
const CompanyFields = withLoading(CompanyFieldsPage);
const CompanyCareers = withLoading(CompanyCareersPage);
const SaleProcesses = withLoading(SaleProcessesPage);
const CustomerSources = withLoading(CustomerSourcesPage);
const Users = withLoading(UsersPage);
const EmailSettings = withLoading(EmailSettingsPage);

export interface SettingListItem {
  components?: React.ReactNode;
  path: string;
}

export const SettingList: SettingListItem[] = [
  {
    components: <Roles />,
    path: 'roles',
  },
  {
    components: <ProductGroups />,
    path: 'product-groups',
  },
  {
    components: <Products />,
    path: 'products',
  },
  {
    components: <CompanyTypes />,
    path: 'company-types',
  },
  {
    components: <CompanyFields />,
    path: 'company-fields',
  },
  {
    components: <CompanyCareers />,
    path: 'company-careers',
  },
  {
    components: <CustomerSources />,
    path: 'customer-sources',
  },
  {
    components: <SaleProcesses />,
    path: 'sale-processes',
  },
  {
    components: <Users />,
    path: 'users',
  },
  {
    components: <EmailSettings />,
    path: 'email',
  },
];
