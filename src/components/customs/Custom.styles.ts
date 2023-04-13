import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { Button, Form as FormAntd } from 'antd';
import styled from 'styled-components';
import { Table } from '../common/Table/Table';
import { ReactComponent as DeleteIcon } from '@app/assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '@app/assets/icons/edit.svg';

export const CustomPagination = styled.div`
  margin: 16px 0;
  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 8px;
    font-size: ${FONT_SIZE.xxs};
  }
  & .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:focus-visible .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    background-color: #919eab;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  position: relative;

  .ant-select {
    margin-right: 10px;
    min-width: 170px;
    &-operator {
      min-width: 240px;
    }
  }
  .ant-select:not(.ant-select-disabled) .ant-select-selector {
    border-color: var(--ant-primary-5);
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-shadow: none;
  }
  .ant-picker {
    margin-right: 10px;
    border-color: var(--ant-primary-5);
    box-shadow: none;
  }
  .ant-input {
    max-width: 300px;
    margin-right: 10px;
  }
  .button-delete {
    border: none;
    margin-right: 10px;
    border-color: var(--ant-primary-color);
    img {
      transform: scale(0.8);
    }
  }
`;

export const ButtonFilter = styled(Button)`
  margin-top: 10px;
  background: var(--layout-sider-bg-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border-color: var(--ant-primary-color);
  padding: 0 30px;
  span {
    color: var(--text-secondary-color);
    font-weight: ${FONT_WEIGHT.regular};
  }
  &:hover,
  &:focus,
  &:active {
    background: var(--layout-sider-bg-color);
    span {
      color: var(--text-sider-primary-color);
      fill: var(--text-sider-primary-color);
    }
  }
`;

export const ButtonAdd = styled(Button)`
  margin-top: 10px;
  background: var(--layout-sider-bg-color);
  border-color: var(--ant-primary-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 30px;
  margin: 10px 0;
  span {
    color: var(--text-secondary-color);
    font-weight: ${FONT_WEIGHT.regular};
  }
  &:hover,
  &:focus,
  &:active {
    background: var(--layout-sider-bg-color);
    span {
      color: var(--text-sider-primary-color);
      fill: var(--text-sider-primary-color);
    }
  }
`;

export const CustomTable = styled(Table)`
  .ant-table-thead {
    background: var(--layout-sider-bg-color);
  }
  thead .ant-table-cell {
    color: var(--text-secondary-color);
    font-size: ${FONT_SIZE.xs};
    font-weight: ${FONT_WEIGHT.medium};
    text-align: center;
    white-space: nowrap;
    &::before {
      display: none;
    }
  }
  tbody .ant-table-cell {
    .ant-typography {
      color: var(--text-main-color);
    }
  }
  tbody .ant-table-row {
    &:nth-child(odd) {
      background: rgba(7, 31, 159, 0.2);
    }
  }
`;

export const Form = styled(FormAntd)`
  margin-top: -36px;
  .ant-form-item-label {
    padding-bottom: 0;
    label {
      font-size: 18px;
      color: var(--text-main-color);
      font-weight: 700;
    }
  }
  .ant-row {
    margin: 20px 0;
  }
  .ant-typography {
    font-weight: 700;
    text-transform: uppercase;
    color: var(--ant-primary-color);
    font-size: 18px;
  }
  .row-role {
    border-bottom: 1px solid #ccc;
  }
  .ant-modal-body {
    padding: 0 24px 24px 24px !important;
  }
`;

export const Delete = styled(DeleteIcon)`
  transform: scale(0.6);
  color: var(--text-main-color);
  fill: var(--text-main-color);
`;

export const Edit = styled(EditIcon)`
  transform: scale(0.7);
  color: var(--text-main-color);
  fill: var(--text-main-color);
`;
