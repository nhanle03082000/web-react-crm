import { withLoading } from '@app/hocs/withLoading.hoc';
import CustomersList from '@app/pages/CustomersPage/CustomersList';
import CustomersMain from '@app/pages/CustomersPage/CustomersMain';
import Detail from '@app/pages/CustomersPage/components/Details/Detail';
import React from 'react';

const ListPage = React.lazy(() => import('@app/pages/CustomerPages/List'));
const PricePage = React.lazy(() => import('@app/pages/CustomerPages/Price'));

const Lists = withLoading(ListPage);
const Prices = withLoading(PricePage);

export interface ListItem {
  components?: React.ReactNode;
  path?: string;
  children?: ListItem[];
}

export const CustomerList1: ListItem[] = [
  {
    components: <CustomersMain />,
    path: 'customers/list',
  },
  {
    components: <Detail />,
    path: '/customers/:id',
  },
  {
    components: <Prices />,
    path: 'price',
  },
];
