import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Layout, Menu, Icon, Button, Divider } from 'antd';
import Router from 'next/router';
import {MenuItems} from './MenuItems';
const { SubMenu } = Menu;
const { Header, Content,  Footer, Sider } = Layout;


export class Sidenav extends Component {

  constructor(){
    super();
    this.state = {
      theme: 'dark',
      current: '1',
      collapsed: true,
      clientSide: false,
      username: "..."
    };
  }


  componentDidMount() {
    if(localStorage && localStorage['theme']){
      this.setState({theme: localStorage['theme']})
    }

    this.updateDimensions();
    this.setState({username: localStorage["username"]});
    window.addEventListener("resize", this.updateDimensions);
    this.checkCollapse();
  };

  componentWillUnmount() {
    this.updateDimensions();
    window.removeEventListener("resize", this.updateDimensions);
    this.checkCollapse();
  };

  updateDimensions = async () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
    
  };

  checkCollapse = () => {
    if(this.state.width <= 1012){
      this.onCollapse(true);
    } else {
      this.onCollapse(false);
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  changeTheme = value => {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });

    localStorage['theme'] = this.state.theme === "dark" ? "light" : "dark";
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });

    Router.push(e.item.props.path);
  };

  render() {
    return (
      <Sider className="sider" theme={this.state.theme} onCollapse={this.onCollapse} collapsed={(this.state.width <= 1012) ? true : false}>
        <div className="userInfoContainer">
         
         <Row type="flex" justify="space-between" align="middle">
           <Col><div className="userPic"></div></Col>
           {(this.state.width > 1012) && (<Col><div className="companyPic"></div></Col>)}
         </Row>

          <div className="userCompanyInfo">
            <h3 className="no-margin-bottom bold" style={{color: (this.state.theme === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.65)')}}>{this.state.username}</h3>
            {(this.state.width > 1012) && (<p style={{color: (this.state.theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.65)')}}>{this.state.company_name || ""}</p>)}
          </div>
          

          {(this.state.width > 1012) && (
            <Row type="flex" justify="center">
              <Col span={5}>
                <Button onClick={this.changeTheme}
                        className={this.state.theme === 'dark' ? 'btn-theme dark' : 'btn-theme light'}
                        shape="circle"
                        icon="bulb" />
              </Col>
              <Col span={5}>
                <Button className={this.state.theme === 'dark' ? 'btn-theme dark' : 'btn-theme light'}
                        shape="circle"
                        icon="setting" />
              </Col>
              <Col span={5}>
                <Button className={this.state.theme === 'dark' ? 'btn-theme dark' : 'btn-theme light'}
                        shape="circle"
                        icon="poweroff" />
              </Col>
            </Row>
          )}
        </div>
        <Divider className="menuDivider" />
       
        <Menu theme={this.state.theme} defaultSelectedKeys={['0']} mode="inline">
          {MenuItems.map((item, key) => (<Menu.Item path={item.path} onClick={this.handleClick} key={key}><Icon type={item.icon} /><span>{item.name}</span></Menu.Item>))}
        </Menu>
      </Sider>
    );
  }
}