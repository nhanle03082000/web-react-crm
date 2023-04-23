import { Input } from '@app/components/common/inputs/Input/Input';
import { Checkbox, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

interface Iprops {
  isEditing?: boolean;
}

const FormTask: React.FC<Iprops> = () => {
  const [startDate, setStartDate] = useState<any>('');

  const onChangeStartDate = (date: any) => {
    setStartDate(date);
  };

  const disabledDate = (current: any) => {
    // Disable all dates that are before the current date
    return current && current < startDate;
  };

  const disabledDateStart = (current: any) => {
    if (!current) return false;

    // Trả về true cho các ngày trước ngày hiện tại
    return current < moment().startOf('day');
  };

  return (
    <Row gutter={[12, 0]}>
      <Col span={24}>
        <Form.Item
          label="Tiêu đề công việc"
          name="title"
          rules={[{ required: true, message: 'Tiêu đề công việc không được để trống' }]}
        >
          <Input placeholder="Nhập tiêu đề công việc" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Nội dung công việc"
          name="content"
          rules={[{ required: true, message: 'Nội dung công việc không được để trống' }]}
        >
          <Input placeholder="Nhập nội dung công việc" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Ngày bắt đầu" name="start_time">
          <DatePicker
            size="small"
            format="L"
            showTime
            onChange={onChangeStartDate}
            disabledDate={disabledDateStart}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Ngày kế thúc" name="end_time">
          <DatePicker format="L" showTime disabledDate={disabledDate} size="small" style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Trạng thái" valuePropName="checked" name="status">
          <Checkbox style={{ width: '100%' }}>Hoàn thành</Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormTask;
