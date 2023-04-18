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
    text-transform: uppercase;
  }
  .button-back:hover,
  .button-back:focus,
  .button-back:active {
    background: none;
  }
  .sale-button {
    position: relative;
  }
  .sale-total {
    position: absolute;
    top: -8px;
    right: -6px;
    border: 1px solid #ff0044;
    background-color: #fff;
    padding: 0 6px;
    font-size: 10px;
    border-radius: 50%;
    color: #ff0044;
  }
  .row-role {
    border-bottom: solid;
    border-width: 1px;
    padding: 4px 0;
  }
  .select-product {
  }
`;
