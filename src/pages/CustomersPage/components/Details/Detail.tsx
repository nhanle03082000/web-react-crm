import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Tabs } from '@app/components/common/Tabs/Tabs';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CustomerContacts from '../DetailItem/CustomerContacts';
import CustomerInteractions from '../DetailItem/CustomerInteractions';
import CustomerNote from '../DetailItem/CustomerNote';
import CustomerProduct from '../DetailItem/CustomerProduct';
import CustomerQuotes from '../DetailItem/CustomerQuotes';
import CustomerReminder from '../DetailItem/CustomerReminder';
import CustomerTask from '../DetailItem/CustomerTask';
import EditDetail from './EditDetail';
import DetailsQuotes from './DetailsQuotes';

const Detail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isDetailQuotes, setIsDetailQuotes] = useState(false);
  const [isIdQuotes, setIsIdQuotes] = useState<number>(0);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onBack = () => {
    navigate('/customers');
  };

  const handleDetailsQuotes = (id: number) => {
    setIsDetailQuotes(true);
    setIsIdQuotes(id);
  };

  useEffect(() => {
    async function getData() {
      const dataResult = await getDataById(Number(id), '/customers');
      setData(dataResult);
    }
    getData();
    // if (!state) {
    //   navigate('/customers', { replace: true });
    // }
  }, []);

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

  const itemTab = [
    {
      label: 'Thông tin liên hệ',
      key: '1',
      children: <CustomerContacts id={data?.id} />,
    },
    {
      label: 'Lịch sử báo giá',
      key: '2',
      children: <CustomerQuotes id={data?.id} handleDetailsQuotes={handleDetailsQuotes} />,
    },
    {
      label: 'Giải pháp quan tâm',
      key: '3',
      children: <CustomerProduct id={data?.id} />,
    },
    {
      label: 'Nhật ký tương tác',
      key: '4',
      children: <CustomerInteractions id={data?.id} />,
    },
    {
      label: 'Công việc',
      key: '5',
      children: <CustomerTask employee_id={data?.employee_id} customer_id={data?.id} />,
    },
    {
      label: 'Nhắc nhở',
      key: '6',
      children: <CustomerReminder id={data?.id} />,
    },
    {
      label: 'Đơn hàng',
      key: '7',
      children: `Content of Tab Pane 3`,
    },
    {
      label: 'Ghi chú',
      key: '8',
      children: <CustomerNote id={data?.id} />,
    },
  ];

  return isDetailQuotes ? (
    <DetailsQuotes id={isIdQuotes} setIsDetailQuotes={setIsDetailQuotes} />
  ) : (
    <DetailStyles>
      <Row>
        <Col span={24}>
          <Button className="button-back" onClick={onBack}>
            <LeftOutlined />
            CHI TIẾT KHÁCH HÀNG
          </Button>
        </Col>
        {isEdit ? (
          <Col span={24}>
            <EditDetail data={data} setIsEdit={setIsEdit} />
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
                  <div>{data?.company_name}</div>
                </Col>
                <Col span={8}>
                  <H5>Mã số thuế</H5>
                  <div>{data?.tax_code}</div>
                </Col>
                <Col span={8}>
                  <Button className="button-edit" onClick={onEdit}>
                    <EditOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
                  </Button>
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
              <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <H4>Thông tin tổ chức</H4>
                </Col>
                <Col span={8}>
                  <H5>Số điện thoại doanh nhiệp</H5>
                  <div>{data?.headquarters_phone}</div>
                </Col>
                <Col span={8}>
                  <H5>Email doanh nhiệp</H5>
                  <div>{data?.headquarters_email}</div>
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                  <H5>Lĩnh vực doanh nghiệp</H5>
                  <div>{data?.company_field?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Nguồn gốc</H5>
                  <div>{data?.customer_source?.name}</div>
                </Col>
                <Col span={8}>
                  <H5>Quy trình bán hàng</H5>
                  <div>{data?.sale_process?.name}</div>
                </Col>
              </Row>
              <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <H4>Thông tin địa chỉ</H4>
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
                <Col span={24}>
                  <H5>Địa chỉ</H5>
                  <div>{data?.headquarters_address}</div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <br />
                  <Tabs type="card" defaultActiveKey="1" items={itemTab} />
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
