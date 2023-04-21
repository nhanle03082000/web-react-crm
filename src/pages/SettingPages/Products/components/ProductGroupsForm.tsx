import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const ProductsForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <>
      <Form.Item name="code" label="Mã sản phẩm">
        <Input placeholder="Nhập mã sản phẩm" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item name="name" label="Tên sản phẩm">
        <Input placeholder="Nhập tên sản phẩm" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default ProductsForm;
