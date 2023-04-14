import { Button } from '@app/components/common/buttons/Button/Button';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { getToken } from '@app/utils/redux.util';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React, { useContext } from 'react';
import ExcelIcon from '@app/assets/icons/Excel.svg';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { DataContext } from '@app/contexts/DataContext';

interface IProps {
  param: string | null;
}

const ExportExcel: React.FC<IProps> = ({ param = '' }) => {
  const { path } = useContext(DataContext);
  const onExport = async () => {
    const token = getToken();
    axios({
      url: `${API_BASE_URL}${path}/export`,
      method: 'GET',
      params: param,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          fileDownload(res.data, `${path}.xlsx`);
        } else {
          notificationController.error({
            message: res.message,
          });
        }
      })
      .catch((err) => {
        notificationController.error({
          message: err.message,
        });
      });
  };

  return (
    <ExportExcelStyles>
      <Tooltip placement="bottom" title="Xuất dữ liệu bảng">
        <Button onClick={onExport} type="primary">
          <img src={ExcelIcon} alt="xuất file excel" />
        </Button>
      </Tooltip>
    </ExportExcelStyles>
  );
};

const ExportExcelStyles = styled.div`
  Button {
    border: none;
    padding: 0 8px;
    img {
      width: 34px;
      height: 34px;
    }
  }
`;

export default ExportExcel;
