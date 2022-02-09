import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[]}
      copyright={
        <Fragment>
            Copyright <Icon type="copyright" /> 2020 - {new Date().getFullYear()} 前端出品 <a href="http://beian.miit.gov.cn">粤ICP备19046694号-1</a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
