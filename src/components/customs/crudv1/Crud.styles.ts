import styled from 'styled-components';
import { Card as CommonCard } from 'components/common/Card/Card';
import { Typography } from 'antd';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { Modal } from '../../common/Modal/Modal';

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
    text-transform: uppercase;
    font-weight: 700;
    font-size: ${FONT_SIZE.md};

    @media only screen and ${media.xl} {
      font-size: ${FONT_SIZE.lg};
    }
  }
`;

export const MdalStyle = styled(Modal)`
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
