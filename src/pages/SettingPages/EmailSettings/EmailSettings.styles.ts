import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';

export const Card = styled(CommonCard)`
  margin: 1rem 0;
  .ant-space-item {
    font-weight: 700;
    text-transform: uppercase;
    color: var(--ant-primary-color);
    font-size: 18px;
  }
  .ant-card-body {
    padding: 1.25rem;
  }
`;

export const EmailSettings = styled.div`
  .ant-form-item {
    margin: 0 0 8px;
  }
  .ant-form-item-label {
    > label {
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
    }
  }
  .ant-input {
    border-width: 2px;
    ::placeholder {
      color: var(--text-light-color);
      font-size: 14px;
    }
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 34px;
    border-width: 2px;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 34px;
  }
`;
