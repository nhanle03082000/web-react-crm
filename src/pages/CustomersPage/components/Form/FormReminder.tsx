import { Input } from '@app/components/common/inputs/Input/Input';
import { Col, DatePicker, Form, Row } from 'antd';
import React from 'react';

interface Iprops {
  isEditing?: boolean;
}

const FormReminder: React.FC<Iprops> = () => {
  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}>
          <Input placeholder="Nhập ghi chú" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Nôi dung nhắc nhở"
          name="content"
          rules={[{ required: true, message: 'Ghi chú không được để trống' }]}
        >
          <Input placeholder="Nhập ghi chú" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Thời gian nhắc nhở"
          name="alert_at"
          rules={[{ required: true, message: 'Ghi chú không được để trống' }]}
        >
          <DatePicker showTime size="small" style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormReminder;
