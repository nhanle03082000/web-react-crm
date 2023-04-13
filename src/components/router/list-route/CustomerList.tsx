import { withLoading } from '@app/hocs/withLoading.hoc';
import React from 'react';

const ListPage = React.lazy(() => import('@app/pages/CustomerPages/List'));
const PricePage = React.lazy(() => import('@app/pages/CustomerPages/Price'));

const Lists = withLoading(ListPage);
const Prices = withLoading(PricePage);

export interface ListItem {
  components?: React.ReactNode;
  path: string;
}

export const CustomerList: ListItem[] = [
  {
    components: <Lists />,
    path: 'list',
  },
  {
    components: <Prices />,
    path: 'price',
  },
];
