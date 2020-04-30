import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Typography } from 'antd';
import { logout, getLoginInfo } from '../utils/auth';
import Router from "next/router";

const { Title } = Typography;

export class ProfileOptions extends Component {

  constructor(props){
    super();
    this.state = {loginInfo: getLoginInfo()};
  }

  logoutClick = async (e) => {
    Router.push('/logout');
  };

  render() {
    return (
      <div style={{margin: "20px"}}>
        <Title level={3}>Login information :)</Title>
        <p>Token: {this.state.loginInfo.token}</p>
        <p>Client: {this.state.loginInfo.client}</p>
        <p>UID: {this.state.loginInfo.uid}</p>
        <Button onClick={this.logoutClick} type="danger">
          Logout
        </Button>
      </div>
    );
  }
}