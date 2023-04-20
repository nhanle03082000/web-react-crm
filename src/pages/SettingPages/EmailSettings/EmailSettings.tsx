import { apiInstance } from '@app/api/app/api_core';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Select } from '@app/components/common/selects/Select/Select';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './EmailSettings.styles';
import { getRoleUser } from '@app/utils/redux.util';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';

const EmailSettings: React.FC = () => {
  const [form] = Form.useForm();
  const path = API_URL.MAIL;
  const email = 'email_config';
  const { t } = useTranslation();
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === email.replace(/\//g, ''))[0].actions;

  const getMail = async () => {
    try {
      const resp: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`);
      if (resp.code === 200) {
        form.setFieldsValue(resp.data);
      } else {
        notificationController.error({
          message: resp.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };
  const postMail = async (values: any) => {
    console.log(values);
    try {
      const resp: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, values);
      if (resp.code === 200) {
        notificationController.success({
          message: 'Cập nhật thành công',
        });
      } else {
        notificationController.error({
          message: resp.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    getMail();
  }, []);

  return (
    <>
      <PageTitle>{t('namepage.email')}</PageTitle>
      {permission.index && (
        <S.EmailSettings>
          <Col xs={24}>
            <S.Card>
              <Space style={{ marginBottom: '16px' }}>{t('namepage.email')}</Space>
              <Form form={form} layout="vertical" onFinish={postMail}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="MAIL_DRIVER" label="Loại driver dùng để gửi mail">
                      <Input placeholder="SMTP" size="small" disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="MAIL_FROM_ADDRESS" label="Địa chỉ email người gửi">
                      <Input placeholder="Nhập email" size="small" disabled={!permission.edit} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="MAIL_PORT" label="Cổng SMTP server">
                      <Input placeholder="Nhập cổng SMTP server" size="small" disabled={!permission.edit} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="MAIL_USERNAME" label="Tên tài khoản mail">
                      <Input placeholder="Nhập tài khoản mail" size="small" disabled={!permission.edit} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="MAIL_HOST" label="Địa chỉ SMTP server của email service provider">
                      <Input placeholder="Nhập Địa chỉ SMTP server" size="small" disabled={!permission.edit} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name="MAIL_FROM_NAME" label="Tên người gửi">
                      <Input placeholder="Nhập tên người gửi" size="small" disabled={!permission.edit} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="MAIL_ENCRYPTION" label="Giao thức bảo mật SSL/TLS">
                      <Select
                        options={[
                          { value: 'SSL', label: 'SSL' },
                          { value: 'TLS', label: 'TLS' },
                        ]}
                        disabled={!permission.edit}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="MAIL_PASSWORD" label="Mật khẩu của tài khoản email">
                      <InputPassword
                        placeholder="Nhập email người gửi"
                        size="small"
                        autoComplete="true"
                        disabled={!permission.edit}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 0]} justify="end" className="footer">
                  {permission.edit && (
                    <Button size="small" type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  )}
                </Row>
              </Form>
            </S.Card>
          </Col>
        </S.EmailSettings>
      )}
    </>
  );
};

export default EmailSettings;
