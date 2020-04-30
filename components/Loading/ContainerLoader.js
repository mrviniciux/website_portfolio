import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Spin } from 'antd';

export class ContainerLoader extends Component {

  constructor(props){
    super();
  }

  render() {
    let spinner = "";

    if(this.props.condition){
      spinner = <Row type="flex" align="middle" justify="center">
        <Spin size="large" className="login-form"
              tip="Carregando..."></Spin>
      </Row>;
    }

    return (
      <div>
        {spinner}
      </div>
    );

  }
}