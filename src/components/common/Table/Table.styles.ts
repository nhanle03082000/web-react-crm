import styled from 'styled-components';
import { Table as AntdTable } from 'antd';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';

export const Table = styled(AntdTable)`
  .ant-table-footer,
  .ant-table-thead > tr > th {
    background-color: var(--ant-primary-color);
    color: #fff;
  }
  & thead .ant-table-cell {
    font-size: ${FONT_SIZE.md};
    line-height: 1.25rem;
    padding: 12px;
    font-weight: ${FONT_WEIGHT.bold};
    white-space: nowrap;
    text-align: center;

    & .anticon {
      color: var(--primary-color);
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border: 1px solid #fff;
      background: none;
    }
  }

  & tbody .ant-table-cell {
    color: var(--text-main-color);
    font-size: ${FONT_SIZE.xs};
    line-height: 1rem;
    padding: 10px 12px;
    white-space: nowrap;
    font-weight: ${FONT_WEIGHT.regular};

    .ant-form-item-control-input {
      min-height: unset;
    }
    .ant-form-item {
      margin: -4px !important;
    }
    .ant-input {
      padding: 0px 5px;
      font-size: 14px;
      border: none;
      border-radius: 0px;
    }
  }

  & tbody .ant-table-row-expand-icon {
    min-height: 1.25rem;
    min-width: 1.25rem;
    border-radius: 0.1875rem;
    margin-top: 0;
  }

  // Override default antd selector
  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: var(--primary-color);
  }

  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 0;
    font-size: ${FONT_SIZE.xs};
  }

  & .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    border-radius: 0;
  }

  & .ant-checkbox-inner {
    border-radius: 0.1875rem;
    height: 1.25rem;
    width: 1.25rem;
  }

  & .editable-row .ant-form-item-explain {
    position: absolute;
    top: 100%;
    font-size: 0.75rem;
  }

  .ant-table-column-sort {
    background-color: transparent;
  }

  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  .ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }
`;
