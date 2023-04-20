import { Input, TextArea } from '@app/components/common/inputs/Input/Input';
import { Form } from 'antd';
import React from 'react';

interface IProps {
  isEditing: boolean;
}

const CompanyCareersForm: React.FC<IProps> = ({ isEditing }) => {
  return (
    <>
      <Form.Item name="name" label="Tên ngành nghề">
        <Input placeholder="Nhập tên ngành nghề" size="small" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <TextArea rows={4} placeholder="Viết mô tả" size="small" />
      </Form.Item>
    </>
  );
};

export default CompanyCareersForm;
