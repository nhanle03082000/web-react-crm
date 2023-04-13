import { createContext } from 'react';

const defaultValues = {
  path: '',
  page: '',
  setState: {},
  isLoad: false,
  setIsLoad: {},
  state: {
    data: {},
    rolePermission: [],
  },
};

interface data {
  path: string;
  page: string;
  state: any;
  setState: any;
  setIsLoad: any;
  isLoad: boolean;
}

export const DataContext = createContext<data>(defaultValues);
