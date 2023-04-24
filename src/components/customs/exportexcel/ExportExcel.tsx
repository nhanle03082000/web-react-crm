import ExcelIcon from '@app/assets/icons/Excel.svg';
import { Button } from '@app/components/common/buttons/Button/Button';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { getToken } from '@app/utils/redux.util';
import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment';
import React, { useContext } from 'react';
import styled from 'styled-components';

interface IProps {
  param: string | null;
}

const ExportExcel: React.FC<IProps> = ({ param = '' }) => {
  const { page, path } = useContext(DataContext);
  const onExport = async () => {
    const token = getToken();
    axios({
      url: `${API_BASE_URL}${path}/export?${param}`,
      method: 'GET',
      // params: param,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res: any) => {
        if (res.status === 200) {
          fileDownload(res.data, `${page}-${moment(new Date()).format('DD/MM/YYYY')}.xlsx`);
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
      <Button onClick={onExport} type="primary" title="xuất dữ liệu">
        <img src={ExcelIcon} alt="xuất file excel" />
      </Button>
    </ExportExcelStyles>
  );
};

const ExportExcelStyles = styled.div`
  Button {
    border: none;
    padding: 0 8px;
    img {
      width: 33px;
      height: 33px;
    }
  }
`;

export default ExportExcel;
