import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const CustomerSourceForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <>
      <Form.Item name="name" label="Tên nguồn gốc">
        <Input placeholder="Nhập tên nguồn gốc" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CustomerSourceForm;
