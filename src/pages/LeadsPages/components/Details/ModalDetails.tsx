import React, { useEffect, useRef, useState } from 'react';
import * as S from '../../Leads.styles';
import { Col, Popconfirm, Row, Typography } from 'antd';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { Button } from '@app/components/common/buttons/Button/Button';
import sendIcon from '@app/assets/icons/send.svg';
import { Link } from 'react-router-dom';
import { onDeleteById } from '../ApiDetails/api_delete';
import { getListNote } from '../ApiDetails/api_get';
import { onCreateNote } from '../ApiDetails/api_create';

interface IDetail {
  detail: any;
  setShowDetail: any;
}

const ModalDetails: React.FC<IDetail> = ({ detail, setShowDetail }) => {
  const showDetail = () => {
    setShowDetail(true);
  };
  const [data, setData] = useState<any>([]);
  const [note, setNote] = useState('');
  const previousInputValue = useRef('');
  const [reload, setReload] = useState(false);

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
  };

  const onDelete = async () => {
    await onDeleteById(detail.id);
    setReload(!reload);
  };

  useEffect(() => {
    getList();
  }, [detail.id, reload]);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <S.Title>Thông tin chung</S.Title>
      </Col>
      <Col span={12}>
        <S.Text>Họ tên</S.Text>
        <S.TextContent>{detail.name}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Mã số thuế</S.Text>
        <S.TextContent>{detail.tax_code}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Tên doanh nghiệp</S.Text>
        <S.TextContent>{detail.company_name}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Địa chỉ doanh nghiệp</S.Text>
        <S.TextContent>{detail.headquarters_address}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>SĐT di động</S.Text>
        <S.TextContent>{detail.phone_number}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>SĐT doanh nhiệp</S.Text>
        <S.TextContent>{detail.headquarters_phone}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Email cá nhân</S.Text>
        <S.TextContent>{detail.email}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Email doanh nhiệp</S.Text>
        <S.TextContent>{detail.headquarters_email}</S.TextContent>
      </Col>
      <Col span={12}>
        <S.Text>Nguồn gốc</S.Text>
        <S.TextContent>{detail.customer_source.name}</S.TextContent>
      </Col>
      <Col span={24}>
        <br />
        <S.Title>Ghi chú</S.Title>
        {data.map((item: any) => {
          return (
            <Row key={item.id} justify="space-between" align="middle" style={{ marginTop: '12px' }}>
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
          );
        })}
      </Col>
      <Col span={24}>
        <S.Text>Thêm ghi chú</S.Text>
        <S.TextAreaContainer>
          <TextArea rows={4} placeholder="Thêm ghi chú" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button onClick={onCreate}>
            <img src={sendIcon} alt="" />
          </Button>
        </S.TextAreaContainer>
      </Col>
      <Col span={24}>
        <Row>
          <Col span={18}>
            <S.ButtonChange>
              <Link to="/customer">Chuyển sang khách hàng</Link>
            </S.ButtonChange>
          </Col>
          <Col span={6}>
            <S.TypographyLink onClick={showDetail}>Xem chi tiết</S.TypographyLink>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ModalDetails;
