import { apiInstance } from '@app/api/app/api_core';
import { BasicTableRow } from '@app/api/table.api';
import ExcelIcon from '@app/assets/icons/Excel.svg';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { startEditing } from '@app/store/slices/appSlice';
import { getEditing, getToken } from '@app/utils/redux.util';
import { Button, Col, Form, Row, Space } from 'antd';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useEffect, useState } from 'react';
import CustomFilter from '../filter/CustomFilter';
import CustomPagination from '../CustomPagination';
import { CustomTable } from '../CustomTable';
import * as S from './Crud.styles';

interface IRespData {
  page: number;
  limit: number;
  sortBy: string;
  sort: string;
  total: number;
}

interface ICrudProps {
  column: any;
  path: string;
  option: any;
  children: React.ReactNode;
  getDataModal: any | null;
  getDataByID: any;
  state: any;
  namePage: string;
  checkPermission: any;
}

const Crud: React.FC<ICrudProps> = ({
  column,
  path,
  option,
  children,
  getDataModal,
  getDataByID,
  namePage,
  state,
  checkPermission,
}) => {
  const [filter, setFilter] = useState<IRespData>({
    page: 1,
    limit: 20,
    sortBy: '',
    total: 0,
    sort: 'asc',
  });
  const [tableData, setTableData] = useState<BasicTableRow[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [param, setParam] = useState();
  const isEditing = getEditing();
  const dispatch = useAppDispatch();

  const param1 = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const getList = async () => {
    setLoading(true);
    if (checkPermission?.show) {
      try {
        const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`, {
          params: param ? `${param}&${param1}` : param1,
        });
        if (respUsers.code === 200) {
          setFilter({ ...filter, total: respUsers.data.total });
          respUsers.data.collection.map((item: any, index: number) => {
            return (item.stt = index + 1);
          });
          setTableData(respUsers.data.collection);
        }
      } catch (error: any) {
        notificationController.error({
          message: 'Có lỗi xảy ra vui lòng thử lại sau',
          description: error.message,
        });
      }
    }
    setLoading(false);
  };

  const onCreate = async (values: any) => {
    let data = {
      ...values,
      is_active: true,
    };
    state.rolePermission ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
    console.log(data);
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Tạo thành công',
        });
        getList();
        handleCancel();
      } else {
        notificationController.error({
          message: respUsers.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const onUpdate = async (values: any) => {
    let data = {
      ...values,
      is_active: true,
    };
    state.rolePermission ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
    console.log(data);
    try {
      const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${state.data.id}`, data);
      if (respUpdate.code === 200) {
        notificationController.success({
          message: 'Cập nhật thành công',
        });
        getList();
        handleCancel();
      } else {
        notificationController.error({
          message: respUpdate.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const onDelete = async (idData: number) => {
    if (checkPermission?.delete) {
      try {
        const respDelete: IRespApiSuccess = await apiInstance.delete(`${API_BASE_URL}${path}/${idData}`);
        if (respDelete.code === 200) {
          notificationController.success({
            message: 'Xoá thành công',
          });
          getList();
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
    }
  };

  const getDataExport = async () => {
    const token = getToken();
    if (checkPermission?.export) {
      axios({
        url: `${API_BASE_URL}${path}/export`,
        method: 'GET',
        params: param ? `${param}&${param1}` : param1,
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
          console.log(err);
        });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilter({ ...filter, page: page });
  };

  useEffect(() => {
    getList();
  }, [filter.page]);

  useEffect(() => {
    isEditing && form.setFieldsValue(state.defaultInputValues);
  }, [state.defaultInputValues]);

  const onShowModal = (typeEdit: boolean, data = 0) => {
    setModalVisible(!modalVisible);
    dispatch(startEditing(typeEdit));
    if (typeEdit) {
      getDataByID(data);
    } else {
      namePage.toUpperCase() === 'VAI TRÒ' ? getDataModal() : null;
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Row>
      <Col xs={24}>
        <S.Card padding="0 1.25rem">
          <Row align="middle">
            <Col span={12}>
              <Space>{namePage}</Space>
            </Col>
            <Col span={12}>
              <Row align="middle" justify="end">
                <Button
                  size="middle"
                  className="button-excel"
                  onClick={getDataExport}
                  style={
                    path === '/roles'
                      ? { display: 'none' }
                      : checkPermission?.export
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  <img src={ExcelIcon} alt="" />
                </Button>
                <Button
                  size="small"
                  className="button-create"
                  onClick={() => onShowModal(false)}
                  style={
                    path === '/users'
                      ? { display: 'none' }
                      : checkPermission?.create
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  +&nbsp; {namePage}
                </Button>
              </Row>
            </Col>
          </Row>
          <CustomFilter setData={setParam} onFilter={getList} option={option} />
        </S.Card>
      </Col>
      <Col xs={24}>
        <S.Wrapper>
          <S.Card>
            {checkPermission?.show && (
              <>
                <CustomTable
                  tableData={tableData}
                  loading={loading}
                  deleteData={onDelete}
                  updateData={onUpdate}
                  onEditRow={onShowModal}
                  column={column}
                  checkPermission={checkPermission}
                />
                <CustomPagination
                  totalItems={filter.total}
                  itemsPerPage={filter.limit}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </S.Card>
        </S.Wrapper>
      </Col>
      <S.MdalStyle
        title={isEditing ? `Sửa ${namePage}` : `Thêm ${namePage}`}
        open={modalVisible}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        footer={null}
      >
        <Form form={form} name="register" onFinish={isEditing ? onUpdate : onCreate} layout="vertical">
          {children}
          <Row gutter={[10, 0]} justify="end" className="footer">
            <Button size="small" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </S.MdalStyle>
    </Row>
  );
};

export default Crud;
