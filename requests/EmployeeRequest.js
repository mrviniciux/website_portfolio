import { show, index, create } from "../store/actions/employees";
import 'isomorphic-fetch';
import AxiosRequest from './AxiosRequest';

export default class EmployeeRequest {

  constructor(params) {
    this._returnSingle = "employee";
    this._returnMultiple = "employees";

    this._path = "employees/:id";
    this._params = params;


    this._actions = [
      {index: {method: "GET"}},
      {show:  {method: "GET" }},
      {create: { method: "POST" }},
      {update: { method: "PATCH" }},
      {destroy: { method: "DELETE" }},
      {destroy_photo: { method: "DELETE", url: "employees/:id/destroy_photo" }}
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
        dispatch(new EmployeeRequest().index);
      });
    }
  };


  get destroy() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    const payload = request.send("destroy");

    return dispatch => {
      payload.then((resp) => {
        dispatch(new EmployeeRequest().index);
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
    return dispatch => {}
  };

  get upload() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params, true);
    request.send("update");
    return dispatch => {}
  };

  get destroyPhoto() {
    const request = new AxiosRequest(this._path, this._actions, this._returnSingle, this._params);
    const payload = request.send("destroy_photo");
    return dispatch => {}
  };
}