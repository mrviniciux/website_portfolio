import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

export class PageLoader extends Component {

  constructor(props){
    super();

    this.state = {
      hidden: props.hidden || false
    };
  }

  render() {

    const layerStyle = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: '1000',
      backgroundColor: 'black'
    };

    if(this.state.hidden){
      layerStyle.visibility = 'hidden';
    } else {
      layerStyle.visibility = 'visible';
    }

    const spinStyle = {
      marginTop: '20%',
      textAlign: 'center'
    };

    return (
      <div style={layerStyle}>
        <div style={spinStyle}>
          <Spin size="large" />
          <h2 style={{ color: 'white'}}>Carregando...</h2>
        </div>
      </div>
    );
  }
}