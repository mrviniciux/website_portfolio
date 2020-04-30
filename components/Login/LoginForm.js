//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import LoginRequest from '../../requests/LoginRequest';
import { Cookies } from 'react-cookie';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import Router from 'next/router';
import {ContainerLoader} from '../Loading/ContainerLoader';
import { Form, Icon, Input, Button, Row, Col, Spin, Typography } from 'antd';
import {loginDone} from "../../store/actions/actionLogin";


// set up cookies
const cookies = new Cookies();
const { Title } = Typography;
class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      token: cookies.get('token') || null,
      email: "",
      password: "",
      pageLoading: true
    };
  }

  loginClick = async (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, obj) => {
      if (!err) {
        this.setState({email: obj.email, password: obj.password});
        this.props.login(obj.email, obj.password);
      }
    });
  };

  componentDidUpdate(prevProps) {
    if(this.props.profile && this.props.profile.id && cookies.get('token')){
      Router.push('/dashboard');
    } else {
      Router.push('/login');
    }
  }

  componentDidMount(){
    this.setState({pageLoading: false});
    this.props.done();

  }

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const divLogin = {
      height: '100%',
      position: 'absolute',
      width: '100%'
    };

    return (
      <div id="main">
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

                <ContainerLoader condition={this.props.loading}/>

                  <Form style={{display: (!this.props.loading ? 'block' : 'none')}} onSubmit={this.loginClick} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Insira o seu usuário ou e-mail!' }],
                      })(
                        <Input autoFocus
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
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  
  const auth = state.auth;
  if(auth && auth.profile){
    state.email = auth.profile.email ? auth.profile.email : "";
    state.password = auth.profile.password ? auth.profile.password  : "";
  }
  

  return {...state, loading: auth.loading, profile: auth.profile}
};

const mapDispatchToProps = dispatch => {
  return {
    login : (mail, password) => {
      dispatch(LoginRequest.login(mail, password));
    },
    done : () => {
      dispatch(loginDone({}));
    }
  }
};

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Form.create({name: 'login'})(LoginFormContainer);