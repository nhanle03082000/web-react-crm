import { getDataById } from '@app/api/app/api_getDataById';
import { Modal } from '@app/components/common/Modal/Modal';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { DataContext } from '@app/contexts/DataContext';
import { Col, Row, Tooltip, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  id: number;
  contentButton: any;
}

const DetailModal: React.FC<IProps> = ({ id, contentButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path, page, state, setState } = useContext(DataContext);

  const onDataById = async () => {
    const dataById = await getDataById(id, path);
    setState(dataById);
  };

  const showModal = async () => {
    onDataById();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Tên doanh nghiệp</H5>
            <Typography.Text>{state?.company_name}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Mã số thuế</H5>
            <Typography.Text>{state?.tax_code}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Địa chỉ doanh nghiệp</H5>
            <Typography.Text>{state?.headquarters_address}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>SĐT doanh nghiệp</H5>
            <Typography.Text>{state?.headquarters_phone}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Email doanh nghiệp</H5>
            <Typography.Text>{state?.headquarters_email}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Nguồn gốc</H5>
            <Typography.Text>{state?.customer_source?.name}</Typography.Text>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <H4 className="uppercase">Thông tin cá nhân</H4>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Họ tên</H5>
            <Typography.Text>{state?.name}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>SĐT di động</H5>
            <Typography.Text>{state?.phone_number}</Typography.Text>
          </Col>
          <Col span={8} xs={12} style={{ whiteSpace: 'break-spaces' }}>
            <H5>Email cá nhân</H5>
            <Typography.Text>{state?.email}</Typography.Text>
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
