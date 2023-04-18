import { DataContext } from '@app/contexts/DataContext';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Sell: React.FC = () => {
  const path = '';
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [state, setState] = useState<any>();
  return (
    <DataContext.Provider value={{ path, state, setState, isLoad, setIsLoad }}>
      <Outlet />
    </DataContext.Provider>
  );
};

export default Sell;
