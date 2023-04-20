import { getDataById } from '@app/api/app/api_getDataById';
import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { DataContext } from '@app/contexts/DataContext';
import { Col, Form, Row, Tooltip, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  id: number;
  contentButton: any;
}

const DetailModal: React.FC<IProps> = ({ id, contentButton }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setState } = useContext(DataContext);

  const onDataById = async () => {
    const dataById = await getDataById(id, path);
    setState(dataById);
    form.setFieldsValue(dataById);
  };

  const showModal = async () => {
    onDataById();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customers/${id}`);
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
            <H4>Thông tin chung</H4>
          </Col>
          <Col span={12}>
            <H5>Họ tên</H5>
            <div>{state?.name}</div>
          </Col>
          <Col span={12}>
            <H5>Mã số thuế</H5>
            <div>{state?.tax_code}</div>
          </Col>
          <Col span={12}>
            <H5>Tên doanh nghiệp</H5>
            <div>{state?.company_name}</div>
          </Col>
          <Col span={12}>
            <H5>Địa chỉ doanh nghiệp</H5>
            <div>{state?.headquarters_address}</div>
          </Col>
          <Col span={12}>
            <H5>SĐT di động</H5>
            <div>{state?.phone_number || 'chưa có'}</div>
          </Col>
          <Col span={12}>
            <H5>SĐT doanh nhiệp</H5>
            <div>{state?.headquarters_phone || 'chưa có'}</div>
          </Col>
          <Col span={12}>
            <H5>Email cá nhân</H5>
            <div>{state?.email || 'chưa có'}</div>
          </Col>
          <Col span={12}>
            <H5>Email doanh nhiệp</H5>
            <div>{state?.headquarters_email || 'chưa có'}</div>
          </Col>
          <Col span={12}>
            <H5>Nguồn gốc</H5>
            <div>{state?.customer_source?.name || 'chưa có'}</div>
          </Col>
          <Col span={24}>
            <br />
            <Row align="middle" justify="end">
              <Col span={6}>
                <Button onClick={handleClick} className="detail-watch">
                  Xem chi tiết
                </Button>
              </Col>
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
