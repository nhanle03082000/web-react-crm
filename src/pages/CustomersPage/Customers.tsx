import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const Customers: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.CUSTOMER;
  const page = t('namepage.khachhang');
  const [show, setShow] = useState(false);
  const [state, setState] = useState<any>();
  return (
    <DataContext.Provider value={{ path, page, state, setState, show, setShow }}>
      <PageTitle>{page}</PageTitle>
      <Outlet />
    </DataContext.Provider>
  );
};

export default Customers;
