import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Form, Row } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomLoading from '../CustomLoading';
import { ConvertTextRoles } from '@app/utils/converts';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { startLoading, stopLoading } from '@app/utils/redux.util';

interface IProps {
  children: React.ReactNode;
}

const Create: React.FC<IProps> = ({ children }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();
  const { path, page, state, setState, show, setShow } = useContext(DataContext);

  const getDefaultPermission = async () => {
    dispath(startLoading);
    try {
      const respDefautPermission: IRespApiSuccess = await apiInstance.post(
        `${API_BASE_URL}${API_URL.DEFAULTPERMISSION}`,
      );
      if (respDefautPermission.code === 200) {
        respDefautPermission.data.map((item: any) => {
          return (item.nameVi = ConvertTextRoles(item.name));
        });
        const data = respDefautPermission.data.sort((a: any, b: any) => a.nameVi.localeCompare(b.nameVi));
        setState({ ...state, rolePermission: data });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    dispath(stopLoading);
  };

  const showModal = () => {
    if (path === '/roles') {
      getDefaultPermission();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    dispath(startLoading);

    let data = {
      ...values,
      is_active: true,
    };
    if (path === '/roles') {
      data = { ...data, permission: JSON.stringify(state.rolePermission) };
    }
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
    setShow(!show);
    dispath(stopLoading);
    handleCancel();
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
        centered
        size="large"
        footer={null}
      >
        <>
          {isLoading && <CustomLoading />}
          <Form form={form} onFinish={onCreate} layout="vertical">
            {children}
            <Row gutter={[10, 0]} justify="end">
              <Button size="small" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </>
      </Modal>
    </CreateStyles>
  );
};

const CreateStyles = styled.div`
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
`;

export default Create;
