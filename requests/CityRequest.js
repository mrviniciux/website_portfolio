import {index, fetch} from "../store/actions/cities";
import 'isomorphic-fetch';
import axios from "axios/index";
import { Flash } from '../components/Flash';
import {apiUrl} from "../config/ApiConfig";
import {getLoginInfo, getSessionInfo} from '../utils/auth';

export default class CityRequest{

  constructor(){}

  static index(params){
    return dispatch => {
      dispatch(fetch());
      const headers = getSessionInfo();
      axios.get(apiUrl + '/cities?active=true&sort_property=name&sort_direction=asc', {params: params, headers: headers}).then(res => {
        return res.data.cities;
      }).then(cities => {
        dispatch(index(cities));
      });
    }
  };
}