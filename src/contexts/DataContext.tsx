import { createContext } from 'react';

const defaultValues = {
  path: '',
  page: '',
  setState: {},
  isLoad: false,
  setIsLoad: {},
  show: false,
  setShow: {},
  state: {
    data: {},
    rolePermission: [],
  },
};

interface data {
  path: string;
  page?: string;
  state: any;
  setState: any;
  setIsLoad: any;
  isLoad: boolean;
  show?: boolean;
  setShow?: any;
}

export const DataContext = createContext<data>(defaultValues);
