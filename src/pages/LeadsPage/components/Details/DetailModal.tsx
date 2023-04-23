import { RestOutlined, SendOutlined } from '@ant-design/icons';
import { onDeleteById } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { onCreateNote } from '@app/api/app/api_create';
import { getDataById } from '@app/api/app/api_getDataById';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { getRoleUser } from '@app/utils/redux.util';
import { Col, Form, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  id: number;
  contentButton: any;
}

const DetailModal: React.FC<IProps> = ({ id, contentButton }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setState } = useContext(DataContext);
  const [dataNote, setDataNote] = useState([]);
  const leadNote = 'lead_notes';
  const userListPermission = JSON.parse(getRoleUser());
  const permissionLeadNotes = userListPermission?.filter((item: any) => item.name === leadNote.replace(/\//g, ''))[0]
    .actions;
  const onDataById = async () => {
    const dataById = await getDataById(id, path);
    setState(dataById);
    form.setFieldsValue(dataById);
  };

  const showModal = async () => {
    onDataById();
    setIsModalOpen(true);
    getListNote();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDelete = async (id: number) => {
    await onDeleteById('lead_notes', id);
    getListNote();
  };

  const createNote = async (value: any) => {
    await onCreateNote({
      lead_id: state.id,
      ...value,
    });
    getListNote();
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

  return (
    <DetailModalStyles>
      <Tooltip placement="bottom" title="Xem thông tin">
        <Typography.Text
          style={{ color: 'var(--ant-primary-color)', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={showModal}
        >
          {contentButton}
        </Typography.Text>
      </Tooltip>
      <Modal
        title={`Xem ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        centered
        footer={null}
      >
        <Row gutter={10}>
          <Col span={24}>
            <H4 className="uppercase">Thông tin tổ chức</H4>
          </Col>
          <Col span={8}>
            <H5>Tên doanh nghiệp</H5>
            <div>{state?.company_name}</div>
          </Col>
          <Col span={8}>
            <H5>Mã số thuế</H5>
            <div>{state?.tax_code}</div>
          </Col>
          <Col span={8} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Địa chỉ doanh nghiệp</H5>
            <div>{state?.headquarters_address}</div>
          </Col>
          <Col span={8}>
            <H5>SĐT doanh nhiệp</H5>
            <div>{state?.headquarters_phone}</div>
          </Col>
          <Col span={8}>
            <H5>Email doanh nhiệp</H5>
            <div>{state?.headquarters_email}</div>
          </Col>
          <Col span={8}>
            <H5>Nguồn gốc</H5>
            <div>{state?.customer_source?.name}</div>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <H4 className="uppercase">Thông tin cá nhân</H4>
          </Col>
          <Col span={8}>
            <H5>Họ tên</H5>
            <div>{state?.name}</div>
          </Col>
          <Col span={8}>
            <H5>SĐT di động</H5>
            <div>{state?.phone_number}</div>
          </Col>
          <Col span={8}>
            <H5>Email cá nhân</H5>
            <div>{state?.email}</div>
          </Col>
          {permissionLeadNotes.index && (
            <Col span={24} style={{ marginTop: '12px' }}>
              <H4>Ghi chú</H4>
              {dataNote.length > 0 && (
                <div>
                  <H5>Nội dung</H5>
                </div>
              )}
              {dataNote.map((item: any) => {
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
                            <Typography.Link>
                              <RestOutlined style={{ fontSize: '20px', cursor: 'pointer', color: '#FF5B5B' }} />
                            </Typography.Link>
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
                  <Col span={22}>
                    <Form.Item name="note">
                      <TextArea rows={2} placeholder="Thêm ghi chú" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
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
          <Col span={24}>
            <br />
            <Row align={'middle'}>
              <Col span={18}></Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </DetailModalStyles>
  );
};

const DetailModalStyles = styled.div`
  .ant-modal {
    text-align: left;
  }
  h4 {
    color: var(--primary-color) !important;
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
    margin-left: 29px;
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
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
`;

export default DetailModal;
