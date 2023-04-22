import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Popconfirm } from 'antd';
import React, { useContext } from 'react';

interface IProps {
  id: number;
  onShow: () => void;
}

const Delete: React.FC<IProps> = ({ id, onShow }) => {
  const { path } = useContext(DataContext);
  const onDelete = async () => {
    try {
      const respDelete: IRespApiSuccess = await apiInstance.delete(`${API_BASE_URL}${path}/${id}`);
      if (respDelete.code === 200) {
        notificationController.success({
          message: 'Xoá thành công',
        });
      } else {
        notificationController.error({
          message: respDelete.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    onShow();
  };
  return (
    <Popconfirm title="Bạn có muốn xoá không?" okText="Có" cancelText="Không" onConfirm={onDelete}>
      <DeleteIcon />
    </Popconfirm>
  );
};

export default Delete;
