import {logged, loginError, doAuth, logout} from "../store/actions/actionLogin";
import 'isomorphic-fetch';
import axios from "axios";
import { Flash } from '../components/Flash';
import {apiUrl} from "../config/ApiConfig";
import { Cookies } from 'react-cookie';
import { login, getLoginInfo } from '../utils/auth'
import Router from "next/router";

const cookies = new Cookies();
export default class LoginRequest{

  static login(email, password){
    const body = {
      email: email,
      password: password
    };

    return dispatch => {

      dispatch(doAuth(body));

      axios.post(apiUrl + '/auth/sign_in',  body).then((resp) => {
        cookies.set('profile', JSON.stringify(resp.data.data));

        const headers = {
          token: resp.headers["access-token"],
          uid: resp.headers["uid"],
          client: resp.headers["client"],
          name: resp.headers["name"],
        };

        login(Object.assign({}, headers, resp.data.data));

        return resp.data;
      }).then(profile => {
        dispatch(logged(profile.data));
      }).catch(reject => {
        dispatch(loginError(body));
        Flash.create('error', reject.response.data.errors);
      });
    }
  };

  static logout(){
    const headers = getLoginInfo();

    axios.post(apiUrl + '/auth/sign_out',  {headers: headers}).then((resp) => {
//        dispatch(logout({}));

      cookies.remove('token');
      cookies.remove('uid');
      cookies.remove('client');

      Router.push('/login');
    }).catch(reject => {
      Flash.create('error', reject.response.data.errors);
    });
  }
}