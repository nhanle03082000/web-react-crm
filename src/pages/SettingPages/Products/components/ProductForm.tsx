import { getProductGroupList } from '@app/api/app/api';
import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  isEditing: boolean;
}

const ProductsForm: React.FC<IProps> = ({ isEditing }) => {
  const [prductGroups, setPrductGroups] = useState<{ value: string; label: string }[]>([{ value: '', label: '' }]);
  useEffect(() => {
    async function getProductGroup() {
      const productList = await getProductGroupList();
      setPrductGroups(productList);
    }
    getProductGroup();
  }, []);

  return (
    <>
      <Form.Item
        name="code"
        label="Mã sản phẩm"
        rules={[{ required: true, message: 'Mã sản phẩm không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập mã sản phẩm" size="small" disabled={isEditing} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Tên sản phẩm không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên sản phẩm" size="small" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá sản phẩm"
        rules={[{ required: true, message: 'Giá sản phẩm không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập giá sản phẩm" size="small" />
      </Form.Item>
      <Form.Item
        name="product_group_id"
        label="Nhóm sản phẩm"
        rules={[{ required: true, message: 'Nhóm sản phẩm không được bỏ trống!' }]}
      >
        <Select options={prductGroups} placeholder="Chọn nhóm sản phẩm" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" initialValue={''}>
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default ProductsForm;
