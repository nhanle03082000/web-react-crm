import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const Leads: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.LEAD;
  const page = t('namepage.tiemnang');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [state, setState] = useState<any>();
  return (
    <DataContext.Provider value={{ path, page, state, setState, isLoad, show, setShow }}>
      <PageTitle>{page}</PageTitle>
      <Outlet />
    </DataContext.Provider>
  );
};

export default Leads;
