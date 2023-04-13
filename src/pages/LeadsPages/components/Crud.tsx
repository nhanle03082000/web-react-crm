import { UploadOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { BasicTableRow } from '@app/api/table.api';
import ExcelIcon from '@app/assets/icons/Excel.svg';
import { Popover } from '@app/components/common/Popover/Popover';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { startEditing } from '@app/store/slices/appSlice';
import { getEditing, getToken } from '@app/utils/redux.util';
import { Button, Col, Form, Row, Space, Tabs, Upload, message } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as S from '../Leads.styles';
import AssignOverlay from './Assign/AssignOverlay';
import CustomColumns from './CustomColumns';
import Details from './Details/Details';
import Filters from './Filters';
import { Table } from './Table';

interface IRespData {
  page: number;
  limit: number;
  sortBy: string;
  sort: string;
  total: number;
}

interface ICrudProps {
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
  const [saleProcesses, setSaleProcesses] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [param, setParam] = useState<any>();
  const isEditing = getEditing();
  const dispatch = useAppDispatch();
  const listFilter = [{ field: '', operator: '', value: '' }];
  const [isDetail, setIsDetail] = useState(false);
  const [listIdLead, setListIdLead] = useState([]);

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
    // try {
    //   const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${state.data.id}`, data);
    //   if (respUpdate.code === 200) {
    //     notificationController.success({
    //       message: 'Cập nhật thành công',
    //     });
    //     getList();
    //     handleCancel();
    //   } else {
    //     notificationController.error({
    //       message: respUpdate.message,
    //     });
    //   }
    // } catch (error: any) {
    //   notificationController.error({
    //     message: 'Có lỗi xảy ra vui lòng thử lại sau',
    //     description: error.message,
    //   });
    // }
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

  const token = getToken();
  const getDataExport = async () => {
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
            console.log(res.data);
            // fileDownload(res.data, `${path}.xlsx`);
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

  const getSaleProcessesList = async () => {
    setLoading(true);
    try {
      const respSaleProcesses: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${API_URL.SALEPROCESSES}?f[0][field]=type&f[0][operator]=contain&f[0][value]=leads&page=1&limit=10&sort_direction=asc&sort_column=sale_process_index`,
      );
      setSaleProcesses(respSaleProcesses.data.collection);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setLoading(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilter({ ...filter, page: page });
  };

  useEffect(() => {
    getList();
  }, [filter.page, param]);

  useEffect(() => {
    getSaleProcessesList();
  }, []);

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

  const onFilterChange = (id: number) => {
    const f: any = {};
    listFilter.forEach((filter: any, i: any) => {
      f[`f[${i}][field]`] = 'sale_process.id';
      f[`f[${i}][operator]`] = 'equal';
      f[`f[${i}][value]`] = id;
    });
    const param = Object.entries(f)
      .map(([key, value]: any) => `${key}=${value}`)
      .join('&');
    setParam(param);
  };

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'STT',
    'Mã số thuế',
    'Nguồn gốc',
    'Thao tác',
    'Doanh nghiệp',
    'Họ tên',
    'SĐT di động',
    'SĐT doanh nghiệp',
    'Email doanh nghiệp',
    'Email cá nhân',
    'Nhân viên phụ trách',
    'Lĩnh vực hoạt động',
    'Địa chỉ trụ sở chính',
    'Tỉnh/Thành phố',
    'Quận/Huyện',
    'Phường/Xã',
    'Quy trình bán hàng',
  ]);

  const props: UploadProps = {
    name: 'file',
    action: `${API_BASE_URL}${path}/import`,
    headers: {
      // authorization: 'authorization-text',
      Authorization: token,
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(info.file);
      }
    },
  };

  return (
    <>
      {isDetail ? (
        <Details detail={state.data} setIsDetail={setIsDetail} />
      ) : (
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
              <Filters setData={setParam} onFilter={getList} option={option} />
            </S.Card>
          </Col>
          <Col xs={24}>
            <S.Wrapper>
              <Row justify={'space-between'} align={'middle'} style={{ margin: '30px 0 10px 0' }}>
                <Col>
                  <Space>
                    <CustomColumns columns={visibleColumns} setColumns={setVisibleColumns} />
                    <Upload accept=".pdf,.doc,.docx,.xls,.xlsx" {...props} maxCount={1}>
                      <S.ButtonCustomColumns icon={<UploadOutlined />}>Nhập từ file</S.ButtonCustomColumns>
                    </Upload>
                    <Popover placement="rightTop" trigger="click" content={<AssignOverlay listIdLead={listIdLead} />}>
                      <S.ButtonCustomColumns>Phân công</S.ButtonCustomColumns>
                    </Popover>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <S.FilterTitleDiv>| Bộ lọc dữ liệu: </S.FilterTitleDiv>
                  </Space>
                  &nbsp;
                  <Space>
                    {saleProcesses.map((item: any, index: number) => {
                      return (
                        <S.FilterDiv
                          key={index}
                          style={{ backgroundColor: item.color }}
                          onClick={() => onFilterChange(item.id)}
                        >
                          {item.name}
                        </S.FilterDiv>
                      );
                    })}
                  </Space>
                </Col>
              </Row>
              <S.Card>
                {checkPermission?.show && (
                  <>
                    <Table
                      onEditRow={onShowModal}
                      tableData={tableData}
                      loading={loading}
                      deleteData={onDelete}
                      visibleColumns={visibleColumns}
                      checkPermission={checkPermission}
                      setIsDetail={setIsDetail}
                      setListIdLead={setListIdLead}
                      getDataByID={getDataByID}
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
          <S.ModalCreateStyle
            title={isEditing ? `Sửa ${namePage}` : `Thêm ${namePage}`}
            open={modalVisible}
            onCancel={handleCancel}
            maskClosable={false}
            centered={true}
            footer={null}
            width={700}
          >
            <Form form={form} name="register" onFinish={isEditing ? onUpdate : onCreate} layout="vertical">
              {children}
              <Row gutter={[10, 0]} justify="end" className="footer">
                <Button size="small" type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Row>
            </Form>
          </S.ModalCreateStyle>
        </Row>
      )}
    </>
  );
};

export default Crud;
