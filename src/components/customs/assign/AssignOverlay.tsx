import { apiInstance } from '@app/api/app/api_core';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Select } from '@app/components/common/selects/Select/Select';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Form } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

interface ISelectOption {
  value: any;
  label: string;
}

interface IProp {
  list: any;
}

const AssignOverlay: React.FC<IProp> = ({ list }) => {
  const [data, setData] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const { setShow, show } = useContext(DataContext);

  const onAssign = async (value: any) => {
    const data = {
      ...value,
      id: list,
    };
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}/leads/assign`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Phân công thành công',
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setShow(!show);
  };

  useEffect(() => {
    const onCreate = async () => {
      try {
        const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/users`);
        if (respUsers.code === 200) {
          const dataOption = respUsers.data.collection.map((item: any) => {
            return { value: item.id, label: item.name };
          });
          setData(dataOption);
        }
      } catch (error: any) {
        notificationController.error({
          message: 'Có lỗi xảy ra vui lòng thử lại sau',
          description: error.message,
        });
      }
    };
    onCreate();
  }, []);

  return (
    <Form style={{ minWidth: '200px' }} onFinish={onAssign}>
      <Form.Item name="employee_id" rules={[{ required: true, message: 'Vui lòng chọn nhân viên để phân công' }]}>
        <Select options={data} placeholder="Chọn người cần phân công" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Phân công
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssignOverlay;
