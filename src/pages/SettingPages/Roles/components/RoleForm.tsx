import { Checkbox } from '@app/components/common/Checkbox/Checkbox';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { H3 } from '@app/components/common/typography/H3/H3';
import { DataContext } from '@app/contexts/DataContext';
import { ConvertTextCheckBox, ConvertTextRoles } from '@app/utils/converts';
import { Col, Form, Row, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useContext } from 'react';
import { IMyObject } from './RoleInterface';

interface IProps {
  isEditing: boolean;
}

const RoleForm: React.FC<IProps> = ({ isEditing }) => {
  const { state, setState } = useContext(DataContext);

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

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Form.Item
          name="code"
          label="Mã vai trò"
          rules={[{ required: true, message: 'Mã vai trò không được bỏ trống!' }]}
        >
          <Input placeholder="Nhập mã vai trò" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="name"
          label="Tên vai trò"
          rules={[{ required: true, message: 'Tên vai trò không được bỏ trống!' }]}
        >
          <Input placeholder="Nhập tên vai trò" size="small" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="description" label="Mô tả" initialValue="">
          <TextArea rows={4} placeholder="Viết mô tả" size="small" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <H3 className="uppercase text-center">Phân quyền tính năng</H3>
      </Col>
      <Col span={24}>
        {state.rolePermission &&
          state.rolePermission.map((item: IMyObject, index: number) => {
            return (
              <Row key={index} justify="space-between" className="row-role">
                <Col span={6} style={{ textAlign: 'left' }}>
                  <Typography.Text style={{ fontSize: '14px' }}>{ConvertTextRoles(item.name)}</Typography.Text>
                </Col>
                <Col span={18}>
                  <Row gutter={10}>
                    {Object.entries(item.actions).map(([key, value]: any) => (
                      <Col span={6} key={key} style={{ textAlign: 'left' }}>
                        <Checkbox checked={value} onChange={onChange(item, key)}>
                          <Typography.Text style={{ fontSize: '13px' }}>{ConvertTextCheckBox(key)}</Typography.Text>
                        </Checkbox>
                        <div className="role-line"></div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            );
          })}
      </Col>
    </Row>
  );
};

export default RoleForm;
