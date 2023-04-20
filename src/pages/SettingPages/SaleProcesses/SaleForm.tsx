import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Radio, Row } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const SaleForm: React.FC<IProps> = ({ isEditing }) => {
  const listColor = [
    { label: 'red', value: 'red' },
    { label: 'orange', value: 'orange' },
    { label: 'yellow', value: 'yellow' },
    { label: 'green', value: 'green' },
    { label: 'blue', value: 'blue' },
    { label: 'purple', value: 'purple' },
  ];
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="code" label="Mã quy trình">
              <Input placeholder="Nhập mã quy trình" size="small" disabled={isEditing} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="name" label="Tên quy trình">
              <Input placeholder="Nhập tên quy trình" size="small" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="color" label="Màu">
              <Select options={listColor} />
            </Form.Item>
          </Col>
          <Col span={24}>
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
          <Col span={24}>
            <Form.Item name="index" label="Thứ tự">
              <Input placeholder="Nhập số" size="small" />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Form.Item name="description" label="Mô tả">
          <TextArea rows={4} placeholder="Viết mô tả" size="small" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default SaleForm;
