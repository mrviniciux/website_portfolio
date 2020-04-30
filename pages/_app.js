// pages/_app.js
import React from "react";
import "../components/components.scss";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import makeStore from '../store';
import {Sidenav} from '../components/Menu/Sidenav';
import { useRouter } from 'next/router'


import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    // we can dispatch from here too
    //ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  render() {
    const {Component, pageProps, store} = this.props;
    const arrBreadcrumb = this.props.router.asPath.split('/').filter(chr => chr != '');

    const containerProvider = <Container>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Container>;

    const sidenavWithContainerProvider =   
    <Layout className="content">
      <Sidenav/>
      <Layout>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div>
            <Container>
              <Provider store={store}>
                <Component query={this.props.router.query} currentRoute={this.props.router.asPath} path={arrBreadcrumb} {...pageProps} />
              </Provider>
            </Container>
          </div>
        </Content>
      </Layout>
    </Layout>;
    return (
      <div>
        {this.props.router.asPath.includes('/login') || this.props.router.asPath.includes('/logout') ?  (containerProvider) : (sidenavWithContainerProvider)}
      </div>
    );
  }

}

export default withRedux(makeStore)(MyApp);