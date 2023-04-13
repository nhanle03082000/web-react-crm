import { Button } from '@app/components/common/buttons/Button/Button';
import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';
import { Typography } from 'antd';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { Modal } from '@app/components/common/Modal/Modal';
import { ReactComponent as DeleteIcon } from '@app/assets/icons/delete.svg';

export const FilterDiv = styled.div`
  width: fit-content;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  &:hover {
    opacity: 0.6;
  }
`;

export const FilterTitleDiv = styled.div`
  color: var(--ant-primary-color);
  text-shadow: 0 0 0.25px currentcolor;
`;

export const ButtonCustomColumns = styled(Button)`
  background: var(--layout-sider-bg-color);
  border-color: var(--ant-primary-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 10px;
  margin: 0;
  height: 40px;
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

export const Wrapper = styled.div`
  margin-top: 1rem;
  .ant-card-body {
    padding: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    overflow: hidden;
  }
`;

export const Card = styled(CommonCard)`
  .ant-space-item {
    font-weight: 700;
    text-transform: uppercase;
    color: var(--ant-primary-color);
    font-size: 18px;
  }
  .button-excel {
    background: none;
    border: none;
    padding: 0;
    img {
      width: 90%;
      height: 90%;
    }
  }
  .button-create {
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-color: var(--ant-primary-color);
    background: var(--layout-sider-bg-color);
    border-radius: 8px;
    padding: 0 20px;
    font-weight: ${FONT_WEIGHT.regular};
    color: var(--text-secondary-color);
  }
`;

export const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;
    font-weight: 700;
    color: var(--ant-primary-color) !important;
    font-size: ${FONT_SIZE.lg};

    @media only screen and ${media.xl} {
      font-size: ${FONT_SIZE.lg};
    }
  }
`;

export const Text = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.medium};

    @media only screen and ${media.xl} {
      font-size: ${FONT_SIZE.lg};
      font-weight: ${FONT_WEIGHT.medium};
    }
  }
`;

export const ModalCreateStyle = styled(Modal)`
  .ant-modal-header {
    border-bottom: none;
    padding: 16px 52px;
  }
  .ant-modal-title,
  .ant-space {
    text-transform: uppercase;
    font-weight: ${FONT_WEIGHT.medium};
    color: var(--ant-primary-color);
    font-size: 18px;
  }
  .ant-modal-body {
    padding: 0 52px 16px;
  }
  .ant-form-item-label {
    label {
      font-weight: ${FONT_WEIGHT.medium};
      font-size: 18px;
      color: var(--text-main-color);
    }
  }
  .ant-form-item-control-input {
    min-height: unset;
  }
  .ant-modal-close {
    right: 36px;
    .ant-modal-close-x {
      scale: 1.2;
    }
  }
  input[type='text']::placeholder,
  input[type='password']::placeholder,
  textarea::placeholder {
    color: var(--text-light-color);
    font-size: 14px;
  }
  textarea {
    resize: none;
  }
  .ant-input,
  .ant-input-affix-wrapper {
    border-width: 2px;
  }
  .ant-space {
    margin-bottom: 16px;
  }
  .row-role {
    padding: 8px 0;
    border-bottom: 2px solid #e0e0e0;
    font-weight: ${FONT_WEIGHT.regular};
  }
  .footer {
    margin-top: 20px;
  }
  .ant-btn {
    padding: 0 20px;
  }
  .ant-checkbox-wrapper {
    font-size: 14px;
    font-weight: ${FONT_WEIGHT.light};
  }
`;

export const ModalStyle = styled(Modal)`
  text-align: left;
  height: 100%;
  top: 0;
  padding: 0;
  margin: 0;
  float: right;
  .ant-modal-title,
  .ant-space {
    text-transform: uppercase;
    font-weight: ${FONT_WEIGHT.medium};
    color: var(--ant-primary-color);
    font-size: 18px;
  }
  .ant-modal-content {
    min-height: 100vh;
  }
`;

export const Action = styled.div`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const TextAreaContainer = styled.div`
  border: 2px solid #9c9c9c;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  &.ant-input-focused,
  .ant-input:focus {
    border: none !important;
    box-shadow: none !important;
  }
  .ant-btn {
    border: none;
    height: 30px;
    box-shadow: none;
    padding: 0;
  }
  textarea {
    outline: none;
    border: none;
    padding: 0;
    resize: none;
    &::placeholder {
      color: #ccc;
    }
  }
  textarea[disabled] {
    border-color: var(--border-base-color);
    box-shadow: none;
    cursor: not-allowed;
    color: var(--disabled-color);
    background-color: #fff;
    opacity: 1;
  }
`;

export const TypographyLink = styled(Typography.Link)`
  color: var(--ant-primary-color) !important;
  font-weight: 500;
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  line-height: 35px;
`;

export const ButtonChange = styled(Button)`
  color: var(--ant-primary-color) !important;
  font-weight: 500;
  height: 35px;
  padding: 0 10px !important;
`;

export const ButtonBack = styled(Button)`
  color: var(--ant-primary-color) !important;
  font-weight: 700;
  border: none;
  outline: none;
  text-transform: uppercase;
  font-size: 20px;
  background: none;
  height: 40px;
`;

export const ButtonTax = styled.div`
  color: var(--ant-primary-color);
  text-decoration: underline;
  font-weight: bold;
`;

export const TextContent = styled.div`
  padding-left: 8px;
  font-weight: ${FONT_WEIGHT.regular};
`;

export const Delete = styled(DeleteIcon)`
  margin-top: 5px;
  transform: scale(0.6);
  color: red;
  fill: red;
`;
