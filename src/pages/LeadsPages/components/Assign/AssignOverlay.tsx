import { apiInstance } from '@app/api/app/api_core';
import { Select } from '@app/components/common/selects/Select/Select';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import * as S from '../../Leads.styles';

interface ISelectOption {
  value: any;
  label: string;
}

interface IProp {
  listIdLead: any;
}

const AssignOverlay: React.FC<IProp> = ({ listIdLead }) => {
  const [data, setData] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [value, setValue] = useState<number>(1);

  const onChangeValue = (values: any) => {
    console.log(values);
    setValue(values);
  };

  const onAssign = async () => {
    const data = {
      id: listIdLead,
      employee_id: value,
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
    <div style={{ minWidth: '200px' }}>
      <Select
        options={data}
        defaultValue="Chọn người cần phân công"
        onChange={onChangeValue}
        style={{ marginBottom: '10px' }}
      />
      <S.ButtonCustomColumns onClick={onAssign}>Phân công</S.ButtonCustomColumns>
    </div>
  );
};

export default AssignOverlay;
