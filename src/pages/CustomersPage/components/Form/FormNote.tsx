import { Input } from '@app/components/common/inputs/Input/Input';
import { Col, Form, Row } from 'antd';
import React from 'react';

interface Iprops {
  isEditing?: boolean;
}

const FormNote: React.FC<Iprops> = () => {
  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <Form.Item
          label="Nội dung ghi chú"
          name="note"
          rules={[{ required: true, message: 'Ghi chú không được để trống' }]}
        >
          <Input placeholder="Nhập ghi chú" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormNote;
