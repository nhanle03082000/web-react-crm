import { Input } from '@app/components/common/inputs/Input/Input';
import { Col, Form, Row } from 'antd';
import React from 'react';

interface Iprops {
  isEditing: boolean;
}

const FormContact: React.FC<Iprops> = ({ isEditing }) => {
  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <Form.Item
          label="Họ tên người liên hệ"
          name="name"
          rules={[{ required: true, message: 'Họ tên không được để trống' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="SĐT di động" name="phone" rules={[{ required: true, message: 'SĐT không được để trống' }]}>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Chức danh" name="position" initialValue={''}>
          <Input placeholder="Nhập chức danh" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Email cá nhân" name="email" initialValue={''}>
          <Input placeholder="Nhập email" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Phòng ban" name="department" initialValue={''}>
          <Input placeholder="Nhập phòng ban" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Mô tả" name="description" initialValue={''}>
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormContact;
