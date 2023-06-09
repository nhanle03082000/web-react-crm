import { DataContext } from '@app/contexts/DataContext';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Sell: React.FC = () => {
  const path = '';
  const page = 'báo giá';
  const [show, setShow] = useState(false);
  const [state, setState] = useState<any>();
  return (
    <DataContext.Provider value={{ path, page, state, setState, show, setShow }}>
      <Outlet />
    </DataContext.Provider>
  );
};

export default Sell;
