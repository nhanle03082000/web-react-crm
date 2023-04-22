import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const ProductGroupsForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <>
      <Form.Item
        name="code"
        label="Mã nhóm sản phẩm"
        rules={[{ required: true, message: 'Mã nhóm sản phẩm không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập mã nhóm sản phẩm" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên nhóm sản phẩm"
        rules={[{ required: true, message: 'Tên nhóm sản phẩm không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên nhóm sản phẩm" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default ProductGroupsForm;
