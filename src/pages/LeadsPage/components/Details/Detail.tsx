import { EditOutlined, RestOutlined, SendOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { onCreateNote } from '@app/api/app/api_create';
import { Card } from '@app/components/common/Card/Card';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Button, Col, Form, Row, Typography } from 'antd';
import moment from 'moment';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditDetail from './EditDetail';

const Detail: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { state } = useContext(DataContext);
  const [dataNote, setDataNote] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const getListNote = async () => {
    try {
      const respUsers: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}/lead_notes?f[0][field]=lead_id&f[0][operator]=contain&f[0][value]=${id}`,
      );
      if (respUsers.code === 200) {
        setDataNote(respUsers.data.collection);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };
  useEffect(() => {
    getListNote();
  }, []);

  const createNote = async (value: any) => {
    await onCreateNote({
      lead_id: state.id,
      ...value,
    });
    getListNote();
  };

  // const onUpdate = async (values: any) => {
  //   let data = {
  //     ...values,
  //     is_active: true,
  //   };
  //   state.rolePermission ? (data = { ...data, permission: JSON.stringify(state.rolePermission) }) : data;
  //   try {
  //     const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${id}`, data);
  //     if (respUpdate.code === 200) {
  //       notificationController.success({
  //         message: 'Cập nhật thành công',
  //       });
  //     } else {
  //       notificationController.error({
  //         message: respUpdate.message,
  //       });
  //     }
  //   } catch (error: any) {
  //     notificationController.error({
  //       message: 'Có lỗi xảy ra vui lòng thử lại sau',
  //       description: error.message,
  //     });
  //   }
  //   // onShow();
  //   setIsModalOpen(false);
  //   form.resetFields();
  // };

  console.log(state);
  const initialValues = {
    tax_code: state.tax_code,
    company_name: state.company_name,
    name: state.name,
    headquarters_address: state.headquarters_address,
    headquarters_province_id: state.province.id,
    headquarters_district_id: state.district.id,
    headquarters_area_id: state.area.id,
    headquarters_email: state.headquarters_email,
    headquarters_phone: state.headquarters_phone,
    email: state.email,
    phone_number: state.phone_number,
    company_field_id: state.company_field.id,
    customer_source_id: state.customer_source.id,
    sale_process: state.sale_process.id,
  };

  return (
    <DetailStyles>
      <Row>
        <Col span={24}>
          <Button>&#60; CHI TIẾT LỊCH SỬ BÁO GIÁ</Button>
        </Col>
        {isEdit ? (
          <Col span={24}>
            <EditDetail setIsEdit={setIsEdit} initialValues={initialValues} />
          </Col>
        ) : (
          <Col span={24}>
            <Card padding="1.25rem">
              <Row gutter={[4, 4]}>
                <Col span={24}>
                  <H4>Thông tin chung</H4>
                </Col>
                <Col span={8}>
                  <H5>Tên DN</H5>
                  <div>{state.company_name}</div>
                </Col>
                <Col span={8}>
                  <H5>Mã số thuế</H5>
                  <div>{state.tax_code}</div>
                </Col>
                <Col span={8}>
                  <Button className="button-edit" onClick={onEdit}>
                    <EditOutlined />
                  </Button>
                </Col>
                <Col span={8}>
                  <H5>Họ tên người đại diện</H5>
                  <div>{state.name}</div>
                </Col>
                <Col span={8}>
                  <H5>SĐT di động</H5>
                  <div>{state.phone_number}</div>
                </Col>
                <Col span={8}>
                  <H5>Email cá nhân</H5>
                  <div>{state.email}</div>
                </Col>
              </Row>
              <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <H4>Thông tin tổ chức</H4>
                </Col>
                <Col span={8}>
                  <H5>Số điện thoại doanh nhiệp</H5>
                  <div>{state.headquarters_phone}</div>
                </Col>
                <Col span={8}>
                  <H5>Email doanh nhiệp</H5>
                  <div>{state.headquarters_email}</div>
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                  <H5>Lĩnh vực doanh nghiệp</H5>
                  <div>{state.company_field?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Nguồn gốc</H5>
                  <div>{state.customer_source?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Quy trình bán hàng</H5>
                  <div>{state.sale_process?.name}</div>
                </Col>
              </Row>
              <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <H4>Thông tin địa chỉ</H4>
                </Col>
                <Col span={8}>
                  <H5>Tỉnh/TP</H5>
                  <div>{state.province?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Quận/Huyện</H5>
                  <div>{state.district?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Phường/Xã</H5>
                  <div>{state.area?.name}</div>
                </Col>
                <Col span={24}>
                  <H5>Địa chỉ</H5>
                  <div>{state.headquarters_address}</div>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '12px' }}>
                  <H4>Ghi chú</H4>
                  <div>
                    <H5>Nội dung</H5>
                  </div>
                  {dataNote.map((item: any) => {
                    return (
                      <Fragment key={item.id}>
                        <Row justify="space-between" align="middle" style={{ padding: '0 5px' }}>
                          <Col span={23}>
                            <div>
                              <div>{item.note}</div>
                            </div>
                          </Col>
                          <Col span={1}>
                            <Popconfirm
                              placement="leftTop"
                              title="Bạn có muốn xoá không?"
                              okText="Có"
                              cancelText="Không"
                              // onConfirm={onDelete}
                            >
                              <Typography.Link>
                                <RestOutlined style={{ fontSize: '20px', cursor: 'pointer', color: '#FF5B5B' }} />
                              </Typography.Link>
                            </Popconfirm>
                          </Col>
                        </Row>
                        <Row justify="space-between" align="middle" style={{ padding: '5px', color: '#bbb' }}>
                          <Col span={12}>{item?.user?.name}</Col>
                          <Col span={12} style={{ textAlign: 'right' }}>
                            {moment(item?.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
                          </Col>
                        </Row>
                      </Fragment>
                    );
                  })}
                </Col>
                <Col span={24}>
                  <H5>Thêm ghi chú</H5>
                  <Form form={form} onFinish={createNote} className="form-note">
                    <Row>
                      <Col span={23}>
                        <Form.Item>
                          <TextArea rows={4} placeholder="Thêm ghi chú" />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <Form.Item>
                          <Button className="button-send">
                            <SendOutlined />
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col span={24}>
                  <br />
                  <Button type="primary">
                    <Link to="/customer">Chuyển sang khách hàng</Link>
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </DetailStyles>
  );
};

const DetailStyles = styled.div`
  h4 {
    color: var(--primary-color) !important;
  }
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
  div {
    font-size: 16px;
    font-weight: 400;
  }
  textarea.ant-input {
    resize: none;
    transition: all 0.3s !important;
    font-size: 16px !important;
    border: none;
    ::placeholder {
      color: #ccc;
    }
    :focus {
      box-shadow: none;
    }
  }
  .button-send {
    border: none;
    margin-left: 24px;
  }
  .form-note {
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px;
  }
  .detail-watch {
    cursor: pointer;
    color: var(--primary-color);
    border: none;
    outline: none;
    font-size: 18px;
  }
  .button-edit {
    float: right;
    border: none;
    padding: 0;
  }
`;

export default Detail;
