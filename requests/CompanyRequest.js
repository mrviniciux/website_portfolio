import { show, index, create } from "../store/actions/companies";
import 'isomorphic-fetch';
import AxiosRequest from './AxiosRequest';

export default class CompanyRequest {

  constructor(params) {
    this._returnSingle = "company";
    this._returnMultiple = "companies";

    this._path = "companies/:id";
    this._params = params;


    this._actions = [
      {index: {method: "GET"}},
      {show:  {method: "GET"}},
      {create: { method: "POST"}},
      {update: { method: "PUT"} },
      {destroy: { method: "DELETE"} },
      {upload_photo: {method: "PUT"}},
      {destroy_photo: {method: "DELETE"}},
      {recover: { method: "PUT"}}
    ];
  }

  get index() {
    const request = new AxiosRequest(this._path, this._actions, this._returnMultiple);
    const payload = request.send("index");

    return dispatch => {
      payload.then((resp) => {
        dispatch(index(resp));
      })
    }

  };

  get create() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    const payload = request.send("create");

    return dispatch => {
      payload.then((resp) => {

      });
    }
  };


  get destroy() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    const payload = request.send("destroy");

    return dispatch => {
      payload.then((resp) => {
        dispatch(new CompanyRequest().index);
      });
    }
  };

  get show() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    const payload = request.send("show");

    return dispatch => {
      payload.then((resp) => {
        dispatch(show(resp));
      });
    }
  };

  get update() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    request.send("update");
  };
}