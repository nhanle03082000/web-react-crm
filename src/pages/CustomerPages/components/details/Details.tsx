import { getAddress } from '@app/api/app/api_getAddress';
import { getDataById } from '@app/api/app/api_getDataById';
import { Tabs } from '@app/components/common/Tabs/Tabs';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from '../../Customer.styles';
import CustomerContacts from './detailTab/CustomerContacts';
import CustomerQuotes from './detailTab/CustomerQuotes';
import CustomerProduct from './detailTab/CustomerProduct';
import CustomerInteractions from './detailTab/CustomerInteractions';
import CustomerTask from './detailTab/CustomerTask';
import CustomerReminder from './detailTab/CustomerReminder';
import CustomerNote from './detailTab/CustomerNote';
import DetailsQuotes from './DetailsQuotes';

interface IDetails {
  detail: any;
  setIsDetail: any;
}

const Details: React.FC<IDetails> = ({ detail, setIsDetail }) => {
  const handleShowDetail = () => {
    setIsDetail(false);
  };
  const [isDetailQuotes, setIsDetailQuotes] = useState(false);
  const [isIdQuotes, setIsIdQuotes] = useState<number>(0);
  const [dataCompanyField, setDataCompanyField] = useState<any>({});
  const [dataCustomerSource, setDataCustomerSource] = useState<any>({});
  const [companyCareer, setCompanyCareer] = useState<any>([]);
  const [companyTypes, setCompanyTypes] = useState<any>([]);
  const [dataProvince, setDataProvince] = useState<any>({});
  const [dataDistrict, setDataDistrict] = useState<any>({});
  const [dataArea, setDataArea] = useState<any>({});
  useEffect(() => {
    async function getDataCompanyField() {
      const dataResult = await getDataById(detail?.company_field_id, '/company_fields');
      setDataCompanyField(dataResult);
    }
    async function getDataCustomerSource() {
      const dataResult = await getDataById(detail?.customer_source_id, '/customer_sources');
      setDataCustomerSource(dataResult);
    }
    async function getCompanyTypes() {
      const dataResult = await getDataById(detail?.company_type_id, '/company_types');
      setCompanyTypes(dataResult);
    }
    async function getCompanyCareer() {
      const dataResult = await getDataById(detail?.company_career_id, '/company_careers');
      setCompanyCareer(dataResult);
    }
    async function getDataProvince() {
      const dataResult = await getAddress(detail?.headquarters_province_id, '/provinces');
      setDataProvince(dataResult);
    }
    async function getDataDistrict() {
      const dataResult = await getAddress(detail?.headquarters_district_id, '/districts');
      setDataDistrict(dataResult);
    }
    async function getDataArea() {
      const dataResult = await getAddress(detail?.headquarters_area_id, '/areas');
      setDataArea(dataResult);
    }
    if (detail.id != 0) {
      getDataCompanyField();
      getDataCustomerSource();
      getDataProvince();
      getDataDistrict();
      getDataArea();
      getCompanyTypes();
      getCompanyCareer();
    }
  }, [detail]);

  const handleDetailsQuotes = (id: number) => {
    setIsDetailQuotes(true);
    setIsIdQuotes(id);
  };

  const itemTab = [
    {
      label: 'Thông tin liên hệ',
      key: '1',
      children: <CustomerContacts id={detail.id} />,
    },
    {
      label: 'Lịch sử báo giá',
      key: '2',
      children: <CustomerQuotes id={detail.id} handleDetailsQuotes={handleDetailsQuotes} />,
    },
    {
      label: 'Giải pháp quan tâm',
      key: '3',
      children: <CustomerProduct id={detail.id} />,
    },
    {
      label: 'Nhật ký tương tác',
      key: '4',
      children: <CustomerInteractions id={detail.id} />,
    },
    {
      label: 'Công việc',
      key: '5',
      children: <CustomerTask employee_id={detail.employee_id} customer_id={detail.id} />,
    },
    {
      label: 'Nhắc nhở',
      key: '6',
      children: <CustomerReminder id={detail.id} />,
    },
    // {
    //   label: 'Đơn hàng',
    //   key: '7',
    //   children: `Content of Tab Pane 3`,
    // },
    {
      label: 'Ghi chú',
      key: '8',
      children: <CustomerNote id={detail.id} />,
    },
  ];

  return (
    <>
      {isDetailQuotes ? (
        <DetailsQuotes id={isIdQuotes} setIsDetailQuotes={setIsDetailQuotes} />
      ) : (
        <Row>
          <Col span={2}>
            <S.ButtonBack onClick={handleShowDetail}>&#60; Chi tiết khách hàng</S.ButtonBack>
          </Col>
          <S.Card padding="1.25rem">
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <S.Title>Thông tin tổ chức</S.Title>
              </Col>
              <Col span={8}>
                <S.Text>Tên tổ chức/Doanh nghiệp</S.Text>
                <S.TextContent>{detail.company_name}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Số điện thoại doanh nhiệp</S.Text>
                <S.TextContent>{detail.headquarters_phone}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Email doanh nhiệp</S.Text>
                <S.TextContent>{detail.headquarters_email}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Loại hình doanh nghiệp</S.Text>
                <S.TextContent>{companyTypes?.name}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Lĩnh vực doanh nghiệp</S.Text>
                <S.TextContent>{dataCompanyField?.name}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Ngành nghề</S.Text>
                <S.TextContent>{companyCareer?.name}</S.TextContent>
              </Col>
              <Col span={8}>
                <S.Text>Nguồn gốc</S.Text>
                <S.TextContent>{dataCustomerSource?.name}</S.TextContent>
              </Col>
              <Col span={24}>
                <S.Title>Thông tin địa chỉ</S.Title>
              </Col>
              <Col span={6}>
                <S.Text>Tỉnh/TP</S.Text>
                <S.TextContent>{dataProvince?.name}</S.TextContent>
              </Col>
              <Col span={6}>
                <S.Text>Quận/Huyện</S.Text>
                <S.TextContent>{dataDistrict?.name}</S.TextContent>
              </Col>
              <Col span={6}>
                <S.Text>Phường/Xã</S.Text>
                <S.TextContent>{dataArea?.name}</S.TextContent>
              </Col>
              <Col span={6}>
                <S.Text>Địa chỉ</S.Text>
                <S.TextContent>{detail?.headquarters_address}</S.TextContent>
              </Col>
              <Col span={24}>
                <br />
                <Tabs type="card" defaultActiveKey="1" items={itemTab} />
              </Col>
            </Row>
            <br />
          </S.Card>
        </Row>
      )}
    </>
  );
};

export default Details;
