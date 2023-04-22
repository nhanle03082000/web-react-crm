import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const CompanyTypesForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <>
      <Form.Item
        name="code"
        label="Mã loại hình doanh nhiệp"
        rules={[{ required: true, message: 'Mã loại hình không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập mã loại hình doanh nhiệp" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên loại hình doanh nhiệp"
        rules={[{ required: true, message: 'Tên loại hình không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên loại hình doanh nhiệp" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CompanyTypesForm;
