import { EditOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { getDataById } from '@app/api/app/api_getDataById';
import { Modal } from '@app/components/common/Modal/Modal';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { ConvertTextRoles } from '@app/utils/converts';
import { Button, Col, Form, Row, Tooltip } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomLoading from '../CustomLoading';

interface IProps {
  children: React.ReactNode;
  id: number;
  onShow: any;
}

const Update: React.FC<IProps> = ({ children, id, onShow }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setState } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);

  const onDataById = async () => {
    setIsLoading(true);
    const dataById = await getDataById(id, path);
    if (path === '/roles') {
      const permission = JSON.parse(dataById?.permission);
      permission?.map((item: any) => {
        return (item.nameVi = ConvertTextRoles(item.name));
      });
      const data = permission.sort((a: any, b: any) => a.nameVi.localeCompare(b.nameVi, 'vi', { sensitivity: 'base' }));
      setState({ data: dataById, rolePermission: data });
    } else {
      setState(dataById);
    }
    setIsLoading(false);
    form.setFieldsValue(dataById);
  };

  const showModal = async () => {
    onDataById();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onUpdate = async (values: any) => {
    let data = {
      ...values,
      is_active: true,
    };
    state.rolePermission ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
    try {
      const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${id}`, data);
      if (respUpdate.code === 200) {
        notificationController.success({
          message: 'Cập nhật thành công',
        });
      } else {
        notificationController.error({
          message: respUpdate.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    onShow();
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <UpdateStyles>
      <Tooltip placement="bottom" title="Sửa dữ liệu">
        <EditOutlined onClick={showModal} style={{ fontSize: '20px', cursor: 'pointer' }} />
      </Tooltip>
      <Modal
        width={1000}
        title={`Sửa ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form form={form} onFinish={onUpdate} layout="vertical">
          {isLoading ? <CustomLoading /> : children}
          <Row gutter={[10, 10]} justify="end">
            <Button size="small" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </UpdateStyles>
  );
};

const UpdateStyles = styled.div`
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

export default Update;
