import { getRoleList } from '@app/api/app/api';
import { Input } from '@app/components/common/inputs/Input/Input';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  isEditing: boolean;
}

const UserForm: React.FC<IProps> = ({ isEditing }) => {
  const [role, setRole] = useState([]);
  useEffect(() => {
    async function getCustomer() {
      const dataResult = await getRoleList();
      setRole(dataResult);
    }
    getCustomer();
  }, []);

  return (
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="email" label="Email">
          <Input placeholder="Nhập email" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="password" label="Mật khẩu">
          <InputPassword placeholder="Nhập mật khẩu" size="small" autoComplete="true" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="name" label="Họ tên">
          <Input placeholder="Nhập họ tên" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="phone" label="Số điện thoại">
          <Input placeholder="Nhập số điện thoại" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="am_code" label="Mã nhân viên phát triển">
          <Input placeholder="Nhập mã nhân viên phát triển" size="small" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="role_id" label="Vai trò">
          <Select options={role} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default UserForm;
