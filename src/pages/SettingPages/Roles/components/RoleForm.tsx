import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Col, Form, Row, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { IMyObject } from '../RoleInterface';
import { ConvertTextCheckBox, ConvertTextRoles } from '@app/utils/converts';
import { Checkbox } from '@app/components/common/Checkbox/Checkbox';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { DataContext } from '@app/contexts/DataContext';
import CustomLoading from '@app/components/customs/CustomLoading';

interface IProps {
  isEditing: boolean;
}

const RoleForm: React.FC<IProps> = ({ isEditing }) => {
  const { state, setState } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const getDefaultPermission = async () => {
    setIsLoading(true);
    try {
      const respDefautPermission: IRespApiSuccess = await apiInstance.post(
        `${API_BASE_URL}${API_URL.DEFAULTPERMISSION}`,
      );
      if (respDefautPermission.code === 200) {
        setState({ ...state, rolePermission: respDefautPermission.data });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setIsLoading(false);
  };

  const onChange = (item: any, key: string) => (event: CheckboxChangeEvent) => {
    const updatedActions = {
      ...item.actions,
      [key]: event.target.checked,
    };
    const updatedItem = {
      ...item,
      actions: updatedActions,
    };
    const updatedItems = state.rolePermission.map((i: any) => (i === item ? updatedItem : i));
    setState({ ...state, rolePermission: updatedItems });
  };

  useEffect(() => {
    getDefaultPermission();
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div>
          <Form.Item name="code" label="Mã vai trò">
            <Input placeholder="Nhập mã vai trò" size="small" disabled={isEditing} />
          </Form.Item>
          <Form.Item name="name" label="Tên vai trò">
            <Input placeholder="Nhập tên vai trò" size="small" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" initialValue="">
            <TextArea rows={4} placeholder="Viết mô tả" size="small" />
          </Form.Item>
          <Space>Phân quyền quan hệ</Space>
          {state.rolePermission &&
            state.rolePermission.map((item: IMyObject, index: number) => {
              return (
                <Row key={index} justify="space-between" className="row-role">
                  <Col>{ConvertTextRoles(item.name)}</Col>
                  <div style={{ display: 'flex' }}>
                    {Object.entries(item.actions).map(([key, value]: any) => (
                      <div key={key}>
                        <Checkbox checked={value} onChange={onChange(item, key)}>
                          {ConvertTextCheckBox(key)}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </Row>
              );
            })}
        </div>
      )}
    </>
  );
};

export default RoleForm;
