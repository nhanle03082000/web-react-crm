import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Tabs } from '@app/components/common/Tabs/Tabs';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { Button, Col, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CustomerContacts from '../TabsDetail/CustomerContacts';
import CustomerInteractions from '../TabsDetail/CustomerInteractions';
import CustomerNote from '../TabsDetail/CustomerNote';
import CustomerProduct from '../TabsDetail/CustomerProduct';
import CustomerQuotes from '../TabsDetail/CustomerQuotes';
import CustomerReminder from '../TabsDetail/CustomerReminder';
import CustomerTask from '../TabsDetail/CustomerTask';
import EditDetail from './EditDetail';
import DetailQuotes from './DetailQuotes';
import CustomerOrder from '../TabsDetail/CustomerOrder';
import DetailOrder from './DetailOrder';
import CustomLoading from '@app/components/customs/CustomLoading';

const Detail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isIdQuotes, setIsIdQuotes] = useState<number>(0);
  const [isIdOrder, setIsIdOrder] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onBack = () => {
    navigate('/customers');
  };

  const handleDetailsQuotes = (id: number) => {
    setActiveTab(2);
    setIsIdQuotes(id);
  };

  const handleDetailsOrder = (id: number) => {
    setActiveTab(3);
    setIsIdOrder(id);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const dataResult = await getDataById(Number(id), '/customers');
      setData(dataResult);
      setIsLoading(false);
    }
    !isEdit && getData();
  }, [isEdit]);

  const [activeTab, setActiveTab] = useState(1);

  const itemTab = [
    {
      label: 'Thông tin liên hệ',
      key: '1',
      children: <CustomerContacts id={Number(id)} />,
    },
    {
      label: 'Lịch sử báo giá',
      key: '2',
      children: <CustomerQuotes id={Number(id)} handleDetailsQuotes={handleDetailsQuotes} />,
    },
    {
      label: 'Giải pháp quan tâm',
      key: '3',
      children: <CustomerProduct id={Number(id)} />,
    },
    {
      label: 'Nhật ký tương tác',
      key: '4',
      children: <CustomerInteractions id={Number(id)} />,
    },
    {
      label: 'Công việc',
      key: '5',
      children: <CustomerTask employee_id={data?.employee_id} customer_id={Number(id)} />,
    },
    {
      label: 'Nhắc nhở',
      key: '6',
      children: <CustomerReminder id={Number(id)} />,
    },
    {
      label: 'Đơn hàng',
      key: '7',
      children: <CustomerOrder id={Number(id)} handleDetailsOrder={handleDetailsOrder} />,
    },
    {
      label: 'Ghi chú',
      key: '8',
      children: <CustomerNote id={Number(id)} />,
    },
  ];

  const components = [
    {
      tab: 1,
      components: (
        <DetailStyles>
          {!isLoading ? (
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
          ) : (
            <CustomLoading />
          )}
        </DetailStyles>
      ),
    },
    {
      tab: 2,
      components: <DetailQuotes id={isIdQuotes} setActiveTab={setActiveTab} />,
    },
    {
      tab: 3,
      components: <DetailOrder id={isIdOrder} setActiveTab={setActiveTab} />,
    },
  ];

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

  // return
  return (
    <>
      {components.map(({ tab, components }, index) => (
        <Fragment key={index}>{activeTab === tab && components}</Fragment>
      ))}
    </>
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
