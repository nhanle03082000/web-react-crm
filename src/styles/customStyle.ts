import { css } from 'styled-components';

export const customStyle = css`
  .typography-title {
    text-transform: uppercase;
  }
  .ant-form-item-control-input {
    min-height: unset;
  }
  .button-back {
    border: none;
    outline: none;
    background: none;
    color: var(--primary-color);
    padding: 10px;
    font-size: 24px;
  }
  .button-back:hover,
  .button-back:focus,
  .button-back:active {
    background: none;
  }
`;
