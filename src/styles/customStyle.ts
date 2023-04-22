import { css } from 'styled-components';

export const customStyle = css`
  .uppercase {
    text-transform: uppercase;
  }
  .text-center {
    text-align: center;
  }
  .ant-form-item-control-input {
    min-height: unset;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #fff;
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
  textarea::placeholder,
  .ant-select-selection-placeholder,
  .ant-picker-input > input::placeholder {
    color: #ccc !important;
    font-size: 12px;
  }
  .ant-select-selection-placeholder {
    line-height: 30px !important;
    font-size: 12px !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
