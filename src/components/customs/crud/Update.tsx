import { EditOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { getDataById } from '@app/api/app/api_getDataById';
import { Modal } from '@app/components/common/Modal/Modal';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { ConvertTextRoles } from '@app/utils/converts';
import { Button, Form, Row } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomLoading from '../CustomLoading';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { startLoading, stopLoading } from '@app/utils/redux.util';

interface IProps {
  children?: React.ReactNode;
  id: number;
}

const Update: React.FC<IProps> = ({ children, id }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setState, setShow, show } = useContext(DataContext);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();

  const onDataById = async () => {
    dispath(startLoading);
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
    dispath(stopLoading);
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
    dispath(startLoading);
    let data = {
      ...values,
      is_active: true,
    };
    path === '/roles' ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
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
    setShow(!show);
    dispath(stopLoading);
    setIsModalOpen(false);
  };

  return (
    <UpdateStyles>
      <EditOutlined onClick={showModal} style={{ fontSize: '20px', cursor: 'pointer' }} title="sửa" />
      <Modal
        width={1000}
        title={`Sửa ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        footer={null}
      >
        <>
          {isLoading && <CustomLoading />}
          <Form form={form} onFinish={onUpdate} layout="vertical">
            {children}
            <Row gutter={[10, 10]} justify="end">
              <Button size="small" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </>
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
