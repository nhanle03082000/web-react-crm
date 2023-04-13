import styled from 'styled-components';
import { Tabs as AntdTabs } from 'antd';

export const Tabs = styled(AntdTabs)`
  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: var(--disabled-color);
  }
  .ant-tabs-nav {
    margin: 0;
  }
  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
    background: var(--background-color);
    border: 1px solid var(--ant-primary-color);
    margin-left: -1px !important;
    &:first-child {
      margin-left: 0px !important;
    }
  }
  &.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
    background: var(--ant-primary-color);
    color: var(--background-color);
    &.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--background-color);
    }
  }
`;
