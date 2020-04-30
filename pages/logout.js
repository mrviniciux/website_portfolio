import React from 'react';
import {loginError} from "../store/actions/actionLogin";

import { connect } from "react-redux";
import { PageLoader } from "../components/Loading/PageLoader";
import {getLoginInfo, logout} from '../utils/auth';
import Router from "next/router";
import {apiUrl} from "../config/ApiConfig";
import {Flash} from "../components/Flash";
import axios from "axios/index";

class Logout extends React.Component{

  componentDidMount(){
    const body = {};
    const profile = getLoginInfo();
    const headers = {
      'access-token': profile.token,
      'uid': profile.uid,
      'client': profile.client
    };

    axios.delete(apiUrl + '/auth/sign_out', {headers: headers}).then((resp) => {
      logout();
    }).catch(reject => {
      Router.push('/dashboard');
      Flash.create('error', reject.response.data.errors);
    });
  }

  render(){
    return (
      <PageLoader/>
    );
  }
}



export default connect()(Logout);