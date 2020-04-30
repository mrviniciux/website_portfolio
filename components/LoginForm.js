//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import LoginRequest from '../requests/LoginRequest';
import { Cookies } from 'react-cookie';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import Router from 'next/router';
import {PageLoader} from '../components/PageLoader';
import { Form, Icon, Input, Button, Row, Col, Spin, Typography } from 'antd';


// set up cookies
const cookies = new Cookies();
const { Title } = Typography;
class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      token: cookies.get('token') || null,
      user: null,
      password: null,
      pageLoading: true
    };
  }

  loginClick = async (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, obj) => {
      if (!err) {
        this.props.login(obj.email, obj.password);
      }
    });
  };

  componentDidUpdate(prevProps) {
    if(this.props.profile && this.props.profile.id && cookies.get('token')){
      Router.push('/dashboard');
    }
    else {
      Router.push('/login');
    }
  }

  componentDidMount(){
    this.setState({pageLoading: false});
  }

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const divLogin = {
      height: '100%',
      position: 'absolute',
      width: '100%'
    };

    // const loginBackgroundImg = {
    //   background: "url('/static/images/login_background.png') no-repeat center",
    //   height: '100%',
    //   objectFit: 'cover'
    // };


    return (
      <div id="main">
        {this.state.pageLoading ? <PageLoader/> : ""}

        <Row type="flex" style={divLogin}>
          <Col xs={{ span: 24}} lg={{ span: 13}}>
            <div style={{backgroundColor: "#424242",  height: '100%'}}></div>
          </Col>

          <Col xs={{ span: 24}} lg={{ span: 11}} >
            <Row type="flex" style={{height: '100%', marginLeft: '10%'}} align="middle" justify="center">
              <Col span={15}>

                {!this.props.loading && (
                  <Title>TITLE LOREM IPSUM</Title>
                )}

                {this.props.loading && (
                  <Row type="flex" align="middle" justify="center">
                    <Spin size="large" className="login-form"
                          tip="Carregando..."></Spin>
                  </Row>
                )}

                {!this.props.loading && (
                  <Form onSubmit={this.loginClick} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Insira o seu usuário ou e-mail!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="E-mail"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Insira a sua senha!' }],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="Senha"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" >
                        Entrar
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {loading: state.loading, profile: state.profile}
};

const mapDispatchToProps = dispatch => {
  return {
    login : (mail, password) => {
      dispatch(LoginRequest.login(mail, password));
    }
  }
};

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Form.create({name: 'login'})(LoginFormContainer);