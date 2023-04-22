import { ConfigProvider } from 'antd';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
// import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import 'typeface-lato';
import 'typeface-montserrat';
import { AppRouter } from './components/router/AppRouter';
import { useAppSelector } from './hooks/reduxHooks';
import { useLanguage } from './hooks/useLanguage';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import GlobalStyle from './styles/GlobalStyle';
import { themeObject } from './styles/themes/themeVariables';

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  useThemeWatcher();

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <HelmetProvider>
        <ConfigProvider locale={language === 'en' ? enUS : viVN}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
