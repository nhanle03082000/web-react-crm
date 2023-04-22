import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { listColor, type } from '@app/configs/select-configs';
import { Col, Form, Row } from 'antd';
import React from 'react';

const SaleForm: React.FC = () => {
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên quy trình"
              rules={[{ required: true, message: 'Tên quy trình không được bỏ trống!' }]}
            >
              <Input placeholder="Nhập tên quy trình" size="small" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="color"
              label="Màu"
              rules={[{ required: true, message: 'Màu không được bỏ trống!' }]}
              initialValue={listColor[0].value}
            >
              <Select options={listColor} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="type"
              label="Loại"
              rules={[{ required: true, message: 'Loại không được bỏ trống!' }]}
              initialValue={type[0].value}
            >
              <Select placeholder="Chọn loại" options={type} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="sale_process_index"
              label="Thứ tự"
              rules={[{ required: true, message: 'Thứ tự không được bỏ trống!' }]}
            >
              <Input type="number" placeholder="Nhập số" size="small" />
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
