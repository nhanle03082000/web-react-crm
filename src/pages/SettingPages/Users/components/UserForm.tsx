import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { DataContext } from '@app/contexts/DataContext';
import { Form } from 'antd';
import React, { useContext } from 'react';

interface IProps {
  isEditing: boolean;
}

const UserForm: React.FC<IProps> = ({ isEditing }) => {
  const { state } = useContext(DataContext);

  return (
    <>
      <Form.Item name="email" label="Email">
        <Input placeholder="Nhập email" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item name="password" label="Mật khẩu">
        <Input type="password" placeholder="Nhập mật khẩu" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item name="name" label="Họ tên">
        <Input placeholder="Nhập họ tên" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item name="phone" label="Số điện thoại">
        <Input placeholder="Nhập số điện thoại" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item name="role_id" label="Vai trò">
        <Select options={state.roles} />
      </Form.Item>
    </>
  );
};

export default UserForm;
