import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const SaleForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="code" label="Mã quy trình">
          <Input placeholder="Nhập mã quy trình" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="code" label="Mã quy trình">
          <Input placeholder="Nhập mã quy trình" size="small" disabled={isEditing} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="name" label="Tên quy trình">
          <Input placeholder="Nhập tên quy trình" size="small" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="description" label="Mô tả">
          <TextArea rows={4} placeholder="Viết mô tả" size="small" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="color" label="Màu">
          <Input type="color" placeholder="Chọn màu" size="small" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="type" label="Loại">
          <Select
            placeholder="Chọn loại"
            options={[
              { value: 'leads', label: 'Tiềm năng' },
              { value: 'customer', label: 'Khách hàng' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="index" label="Thứ tự">
          <Input placeholder="Nhập số" size="small" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default SaleForm;
