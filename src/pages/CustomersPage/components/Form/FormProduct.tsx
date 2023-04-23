import { getProductList } from '@app/api/app/api';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';

interface Iprops {
  isEditing?: boolean;
}

const FormProduct: React.FC<Iprops> = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function product() {
      const productList = await getProductList();
      const productOptions = productList.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      setProduct(productOptions);
    }
    product();
  }, []);

  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <Form.Item
          label="Tên giải pháp"
          name="product_id"
          rules={[{ required: true, message: 'Giải pháp không được để trống' }]}
        >
          <Select className="select-product" options={product} placeholder="Chọn giải pháp" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input placeholder="Nhập mô tả" defaultValue={''} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormProduct;
