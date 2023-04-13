import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Typography } from 'antd';
import axios from 'axios';
import { API_CHECKLOGINSSO_URL, API_LOGINSSO_URL } from '@app/configs/api-configs';
import { getJsonLog } from '@app/configs/main-configs';
import { doLogin, setToken } from '@app/store/slices/authSlice';
import loading from '@app/assets/images/loading.png';
import error from '@app/assets/images/error.png';
import * as S from './LoginForm.styles';
import { notificationController } from '@app/controllers/notificationController';

export const initValues = {
  email: 'hello@altence.com',
  password: 'some-test-pass',
};

export const LoginForm: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  const ticket = queryParams.get('ticket');
  const casURL = 'sso.mobifone9.vn/cas/login';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { t } = useTranslation();
  const [errorMesseage, setErrorMesseage] = useState();

  const checkTicket = async (ticket: string, service: string) => {
    try {
      const data = JSON.stringify({
        jsonLog: getJsonLog(),
        jsonData: {
          service: service,
          ticket: ticket,
        },
        jsonKey: 'LOGIN',
      });

      const api = await axios.post(API_LOGINSSO_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (api.data.code === '0000') {
        const resp = await axios.post(API_CHECKLOGINSSO_URL, {
          data: { token: api.data.data.token, user: api.data.data },
        });
        if (resp.data.code === 200) {
          setToken(api.data.data.token);
          dispatch(doLogin(resp.data.data))
            .unwrap()
            .then(() => navigate('/'))
            .catch((err) => {
              notificationController.error({
                message: err,
              });
            });
        }
      } else {
        setErrorMesseage(api.data.mess);
      }
    } catch (error: any) {
      setErrorMesseage(error.message);
    }
  };

  useEffect(() => {
    if (!ticket) {
      window.location.href = `https://${casURL}?service=${window.location.href}`;
      return;
    }
    checkTicket(ticket, window.location.href.split('?')[0]);
  }, []);

  return (
    <S.LoginContainer>
      {errorMesseage ? (
        <S.LoginError>
          <img src={error} alt="login-image" />
          <Typography.Title level={2} style={{ margin: 0 }} type="danger">
            Đăng nhập thất bại
          </Typography.Title>
          <Typography.Title level={4} style={{ margin: 0 }} type="danger">
            {errorMesseage}
          </Typography.Title>
          <a href="/auth/login">Quay lại</a>
        </S.LoginError>
      ) : (
        <S.LoginSuccess>
          <img src={loading} alt="login-image" />
        </S.LoginSuccess>
      )}
    </S.LoginContainer>
  );
};
