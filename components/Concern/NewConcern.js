import React, { Component, useEffect, useState } from 'react';
import 'isomorphic-fetch';

export default class NewConcern extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div>
          {this.props.config.partial}
      </div>)
  }
}