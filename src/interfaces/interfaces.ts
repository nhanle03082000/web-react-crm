import { BasicTableRow } from '@app/api/table.api';
import { NumericLiteral } from 'typescript';

export type Dimension = number | string;

export type ChartData = number[];

export type xData = number[] | string[];

export type LanguageType = 'vi' | 'en';

export type ThemeType = 'light' | 'dark';

export interface ITableData {
  data: BasicTableRow[];
}

export interface IFilter {
  page: number;
  limit: number;
  total: number;
  sort_column: string;
  sort_direction: string;
}

export interface IRespApiSuccess {
  code: number;
  data: any;
  message: string;
  status: boolean;
}

export interface IRespApiRoleSuccess {
  code: number;
  data: any;
  message: string;
  status: boolean;
  roles: any;
}

export interface ChartSeries {
  seriesName: string;
  value: number;
  data: {
    day: number;
    value: NumericLiteral;
  };
  name: string;
}

export type ChartSeriesData = ChartSeries[];

export type Severity = 'success' | 'error' | 'info' | 'warning';

export type TwoFactorAuthOption = 'email' | 'dienthoai';

export type ActivityStatusType = 'sold' | 'booked' | 'added';

export enum CurrencyTypeEnum {
  USD = 'USD',
  ETH = 'ETH',
  BTC = 'BTC',
}

export interface PaymentCard {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
  // eslint-disable-next-line
  focused: any;
  background: string;
  isEdit: boolean;
}
