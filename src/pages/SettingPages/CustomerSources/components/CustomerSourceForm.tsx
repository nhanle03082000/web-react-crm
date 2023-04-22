import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

const CustomerSourceForm: React.FC = () => {
  return (
    <>
      <Form.Item
        name="name"
        label="Tên nguồn gốc"
        rules={[{ required: true, message: 'Tên nguồn gốc không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên nguồn gốc" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CustomerSourceForm;
