import {index, fetch} from "../store/actions/states";
import 'isomorphic-fetch';
import axios from "axios/index";
import { Flash } from '../components/Flash';
import {apiUrl} from "../config/ApiConfig";
import {getLoginInfo, getSessionInfo} from '../utils/auth';

export default class StateRequest{

  constructor(){}

  static index(params){
    return dispatch => {
      dispatch(fetch());
      const headers = getSessionInfo();
      axios.get(apiUrl + '/states?active=true&sort_property=uf&sort_direction=desc', {params: params, headers: headers}).then(res => {
        return res.data.states;
      }).then(states => {
        dispatch(index(states));
      });
    }
  };
}