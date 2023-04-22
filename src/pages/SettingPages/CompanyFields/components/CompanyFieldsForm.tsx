import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

const CompanyFieldsForm: React.FC = () => {
  return (
    <>
      <Form.Item
        name="name"
        label="Tên lĩnh vực"
        rules={[{ required: true, message: 'Tên lĩnh vực không được bỏ trống!' }]}
      >
        <Input placeholder="Nhập tên lĩnh vực" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CompanyFieldsForm;
