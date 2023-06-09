import { EditOutlined, LeftOutlined, SendOutlined } from '@ant-design/icons';
import { onDeleteById } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { onCreateNote } from '@app/api/app/api_create';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import CreateFromLead from '@app/pages/CustomersPage/components/Form/CreateFromLead';
import { getRoleUser } from '@app/utils/redux.util';
import { Button, Col, Form, Row } from 'antd';
import moment from 'moment';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UpdateLead from '../UpdateLead';
import CustomLoading from '@app/components/customs/CustomLoading';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';

const Detail: React.FC = () => {
  const { path } = useContext(DataContext);
  const userListPermission = JSON.parse(getRoleUser());
  const leadNote = 'lead_notes';
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const permissionLeadNotes = userListPermission?.filter((item: any) => item.name === leadNote.replace(/\//g, ''))[0]
    .actions;
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dataNote, setDataNote] = useState<any>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isLoading, setisLoading] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onBack = () => {
    navigate('/leads');
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
    setisLoading(true);
    async function getData() {
      const dataResult = await getDataById(Number(id), '/leads');
      setData(dataResult);
      setisLoading(false);
    }
    getData();
    getListNote();
  }, [isEdit]);

  const createNote = async (value: any) => {
    await onCreateNote({
      lead_id: data.id,
      ...value,
    });
    getListNote();
  };

  const onDelete = async (id: number) => {
    await onDeleteById('lead_notes', id);
    getListNote();
  };

  return (
    <DetailStyles>
      {!isLoading ? (
        <>
          {isEdit ? (
            <Col span={24}>
              <UpdateLead data={data} setIsEdit={setIsEdit} isEdit={isEdit} />
            </Col>
          ) : (
            <>
              <Row align={'middle'} justify={'space-between'}>
                <Col span={10}>
                  <Button className="button-back" onClick={onBack}>
                    <LeftOutlined />
                    CHI TIẾT TIỀM NĂNG
                  </Button>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {!isEdit && <CreateFromLead titleButton="Chuyển sang khách hàng" defaultValues={data} />}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card padding="1.25rem">
                    <Row gutter={[4, 4]}>
                      <Col span={24}>
                        <H4 className="uppercase">Thông tin tổ chức</H4>
                      </Col>
                      <Col span={8}>
                        <H5>Tên doanh nghiệp</H5>
                        <div>{data?.company_name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Mã số thuế</H5>
                        <div>{data?.tax_code}</div>
                      </Col>
                      <Col span={6}>
                        <H5>Lĩnh vực</H5>
                        <div>{data?.company_field?.name}</div>
                      </Col>
                      <Col span={2}>
                        {permission.edit && (
                          <Button className="button-edit" onClick={onEdit}>
                            <EditOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
                          </Button>
                        )}
                      </Col>
                      <Col span={8}>
                        <H5>SĐT doanh nghiệp</H5>
                        <div>{data?.headquarters_phone}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Email doanh nghiệp</H5>
                        <div>{data?.headquarters_email}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Nguồn gốc</H5>
                        <div>{data?.customer_source?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Quy trình bán hàng</H5>
                        <div>{data?.sale_process?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Tỉnh/TP</H5>
                        <div>{data?.province?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Quận/Huyện</H5>
                        <div>{data?.district?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Phường/Xã</H5>
                        <div>{data?.area?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Địa chỉ</H5>
                        <div>{data?.headquarters_address}</div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }} gutter={[4, 4]}>
                      <Col span={24}>
                        <H4 className="uppercase">Thông tin cá nhân</H4>
                      </Col>
                      <Col span={8}>
                        <H5>Họ tên người đại diện</H5>
                        <div>{data?.name}</div>
                      </Col>
                      <Col span={8}>
                        <H5>SĐT di động</H5>
                        <div>{data?.phone_number}</div>
                      </Col>
                      <Col span={8}>
                        <H5>Email cá nhân</H5>
                        <div>{data?.email}</div>
                      </Col>
                    </Row>
                    <Row>
                      {permissionLeadNotes.index && (
                        <Col span={24} style={{ marginTop: '12px' }}>
                          <H4 className="uppercase">Ghi chú</H4>
                          {dataNote.length > 0 && (
                            <div>
                              <H5>Nội dung</H5>
                            </div>
                          )}
                          {dataNote?.map((item: any) => {
                            return (
                              <Fragment key={item.id}>
                                <Row justify="space-between" align="middle" style={{ padding: '0 5px' }}>
                                  <Col span={23}>
                                    <div>
                                      <div>{item.note}</div>
                                    </div>
                                  </Col>
                                  {permissionLeadNotes.delete && (
                                    <Col span={1}>
                                      <Popconfirm
                                        placement="leftTop"
                                        title="Bạn có muốn xoá không?"
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={() => onDelete(item.id)}
                                      >
                                        <div style={{ marginTop: '5px' }}>
                                          <DeleteIcon color="red" />
                                        </div>
                                      </Popconfirm>
                                    </Col>
                                  )}
                                </Row>
                                <Row
                                  justify="space-between"
                                  align="middle"
                                  style={{ padding: '5px', color: '#bbb', fontStyle: 'italic' }}
                                >
                                  <Col span={12}>{item?.user?.name}</Col>
                                  <Col span={12} style={{ textAlign: 'right' }}>
                                    {moment(item?.createdAt).format('DD/MM/YYYY, HH:mm:ss')}
                                  </Col>
                                </Row>
                              </Fragment>
                            );
                          })}
                        </Col>
                      )}
                      {permissionLeadNotes.create && (
                        <Col span={24}>
                          <H5>Thêm ghi chú</H5>
                          <Form form={form} onFinish={createNote} className="form-note">
                            <Row>
                              <Col span={23}>
                                <Form.Item name="note">
                                  <TextArea rows={2} placeholder="Thêm ghi chú" />
                                </Form.Item>
                              </Col>
                              <Col span={1}>
                                <Form.Item>
                                  <Button className="button-send" htmlType="submit">
                                    <SendOutlined />
                                  </Button>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <CustomLoading />
      )}
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
    border: none !important;
    ::placeholder {
      color: #ccc;
    }
    :focus {
      box-shadow: none;
    }
  }
  .button-send {
    border: none;
    background: none;
    box-shadow: none;
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
