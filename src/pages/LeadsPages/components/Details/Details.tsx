import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Popconfirm, Row, Typography } from 'antd';
import * as S from '../../Leads.styles';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { getDataById } from '@app/api/app/api_getDataById';
import { getAddress } from '@app/api/app/api_getAddress';
import sendIcon from '@app/assets/icons/send.svg';
import { getListNote } from '../ApiDetails/api_get';
import { onCreateNote } from '../ApiDetails/api_create';
import { onDeleteById } from '../ApiDetails/api_delete';

interface IDetails {
  detail: any;
  setIsDetail: any;
}

const Details: React.FC<IDetails> = ({ detail, setIsDetail }) => {
  const handleShowDetail = () => {
    setIsDetail(false);
  };
  const [dataCompanyField, setDataCompanyField] = useState<any>({});
  const [dataCustomerSource, setDataCustomerSource] = useState<any>({});
  const [dataSaleProcesses, setDataSaleProcesses] = useState<any>({});
  const [dataProvince, setDataProvince] = useState<any>({});
  const [dataDistrict, setDataDistrict] = useState<any>({});
  const [dataArea, setDataArea] = useState<any>({});
  useEffect(() => {
    async function getDataCompanyField() {
      const dataResult = await getDataById(detail.company_field_id, '/company_fields');
      setDataCompanyField(dataResult);
    }
    async function getDataCustomerSource() {
      const dataResult = await getDataById(detail.customer_source_id, '/customer_sources');
      setDataCustomerSource(dataResult);
    }
    async function getDataSaleProcesses() {
      const dataResult = await getDataById(detail.sale_process_id, '/sale_processes');
      setDataSaleProcesses(dataResult);
    }
    async function getDataProvince() {
      const dataResult = await getAddress(detail.headquarters_province_id, '/provinces');
      setDataProvince(dataResult);
    }
    async function getDataDistrict() {
      const dataResult = await getAddress(detail.headquarters_district_id, '/districts');
      setDataDistrict(dataResult);
    }
    async function getDataArea() {
      const dataResult = await getAddress(detail.headquarters_area_id, '/areas');
      setDataArea(dataResult);
    }
    getDataCompanyField();
    getDataCustomerSource();
    getDataSaleProcesses();
    getDataProvince();
    getDataDistrict();
    getDataArea();
  }, []);

  const [data, setData] = useState<any>([]);
  const [reload, setReload] = useState(false);
  const [note, setNote] = useState('');
  const previousInputValue = useRef('');

  useEffect(() => {
    previousInputValue.current = note;
  }, [note]);

  const getList = async () => {
    const list = await getListNote(detail.id);
    setData(list);
  };

  const onCreate = async () => {
    await onCreateNote({
      lead_id: detail.id,
      note,
    });
    setReload(!reload);
    setNote('');
  };

  const onDelete = async () => {
    await onDeleteById(detail.id);
    setReload(!reload);
  };

  useEffect(() => {
    getList();
  }, [detail.id, reload]);

  return (
    <Row>
      <S.ButtonBack onClick={handleShowDetail}>&#60; Chi tiết tiềm năng</S.ButtonBack>
      <S.Card padding="1.25rem">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <S.Title>Thông tin chung</S.Title>
          </Col>
          <Col span={8}>
            <S.Text>Tên tổ chức/Doanh nghiệp</S.Text>
            <S.TextContent>{detail.company_name}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>Mã số thuế</S.Text>
            <S.TextContent>{detail.tax_code}</S.TextContent>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <S.Text>Họ tên người đại diện</S.Text>
            <S.TextContent>{detail.name}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>SĐT di động</S.Text>
            <S.TextContent>{detail.phone_number}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>Email cá nhân</S.Text>
            <S.TextContent>{detail.email}</S.TextContent>
          </Col>
          <Col span={24}>
            <br />
            <S.Title>Thông tin tổ chức</S.Title>
          </Col>
          <Col span={12}>
            <S.Text>Số điện thoại doanh nhiệp</S.Text>
            <S.TextContent>{detail.headquarters_phone}</S.TextContent>
          </Col>
          <Col span={12}>
            <S.Text>Email doanh nhiệp</S.Text>
            <S.TextContent>{detail.headquarters_email}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>Lĩnh vực doanh nghiệp</S.Text>
            <S.TextContent>{dataCompanyField?.name}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>Nguồn gốc</S.Text>
            <S.TextContent>{dataCustomerSource?.name}</S.TextContent>
          </Col>
          <Col span={8}>
            <S.Text>Quy trình bán hàng</S.Text>
            <S.TextContent>{dataSaleProcesses?.name}</S.TextContent>
          </Col>
          <Col span={24}>
            <br />
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
            <S.Text>Nội dung</S.Text>
            {data.map((item: any) => {
              return (
                <div key={item.id}>
                  <Row justify="space-between" align="middle" style={{ marginTop: '12px' }}>
                    <Col span={23}>
                      <S.TextAreaContainer style={{ padding: '5px' }}>
                        <S.TextContent>{item.note}</S.TextContent>
                      </S.TextAreaContainer>
                    </Col>
                    <Col span={1}>
                      <Popconfirm
                        placement="leftTop"
                        title="Bạn có muốn xoá không?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={onDelete}
                      >
                        <Typography.Link>
                          <S.Delete />
                        </Typography.Link>
                      </Popconfirm>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col span={24}>
            <S.Text style={{ marginBottom: '10px' }}>Thêm ghi chú</S.Text>
            <S.TextAreaContainer>
              <TextArea rows={4} placeholder="Thêm ghi chú" value={note} onChange={(e) => setNote(e.target.value)} />
              <Button onClick={onCreate}>
                <img src={sendIcon} alt="" />
              </Button>
            </S.TextAreaContainer>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <S.ButtonChange>
                  <Link to="/customer">Chuyển sang khách hàng</Link>
                </S.ButtonChange>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </S.Card>
    </Row>
  );
};

export default Details;
