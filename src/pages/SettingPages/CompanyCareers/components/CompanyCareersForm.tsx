import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

const CompanyCareersForm: React.FC = () => {
  return (
    <>
      <Form.Item
        name="name"
        label="Tên ngành nghề"
        rules={[{ required: true, message: 'Tên ngành nghề không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên ngành nghề" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CompanyCareersForm;
