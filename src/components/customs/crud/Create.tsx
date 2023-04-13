import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Button, Form, Row } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
}

const Create: React.FC<IProps> = ({ children }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setIsLoad } = useContext(DataContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    let data = {
      ...values,
      permission: JSON.stringify(state.rolePermission),
      is_active: true,
    };
    state.rolePermission ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Tạo thành công',
        });
      } else {
        notificationController.error({
          message: respUsers.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setIsLoad(true);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <CreateStyles>
      <Button className="button-create" onClick={showModal} type="primary">
        Thêm {page}
      </Button>
      <Modal
        title={`Thêm ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        footer={null}
      >
        <Form form={form} onFinish={onCreate} layout="vertical">
          {children}
          <Row gutter={[10, 0]} justify="end">
            <Button size="small" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </CreateStyles>
  );
};

const CreateStyles = styled.div`
  .button-create {
    border-color: var(--ant-primary-color);
    background: var(--layout-sider-bg-color);
    border-radius: 8px;
    padding: 0 12px;
    font-weight: 400;
    color: var(--text-secondary-color);
    height: 32px;
    :hover {
      background: var(--layout-sider-bg-color);
      opacity: 0.8;
    }
  }
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
`;

export default Create;
