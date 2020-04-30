import 'isomorphic-fetch';
import axios from "axios";
import {Flash} from '../components/Flash';
import {apiUrl} from "../config/ApiConfig";
import {getSessionInfo} from '../utils/auth';
import {truncateString} from '../utils/helpers';


export default class AxiosRequest{

    constructor(strRoute, actions=[], returnName, objData, isFormData, objUrlFilters={active: true, sort_property: "id", sort_direction: "desc"}){
        this._strRoute = strRoute;
        this._actions = actions;
        this._returnName = returnName;
        this._objData = objData;
        this._isFormData = isFormData;
        this._objUrlFilters = objUrlFilters;
    }

    send(action){
        try{
            const headers = getSessionInfo();
            let urlFilters = "";
            let requestAction = {};
            let data = {};
            let route = "";
            let config = {};
            
            this.actions.forEach( (key, value) => {
                if(key[action] && key[action].method)
                    requestAction = key[action];
            });

            if(requestAction.url)
                this.route = requestAction.url;

            route = this.route;    
    
            if(!requestAction.method)
                throw new Error("Method request not found.");
    
            if(this.urlFilters)
                urlFilters = JSON.stringify(this.urlFilters);    
            
            if(this._isFormData){
                let formdata = new FormData();
                
                formdata.append("id", this._objData["id"]);
                formdata.append(`${this._returnName}[file]`, this._objData["file"]);

                config = { headers: {'Content-Type': 'multipart/form-data' }}

                data = formdata;                
            } else {
                data[this._returnName] = this._objData;
                config = {headers: headers}
            }

            let axiosConfig = {
                method: requestAction.method.toLowerCase(), 
                url: `${apiUrl}/${route}`, 
                params: this._objUrlFilters, 
                data: data, 
                config: config,
                headers: headers
            }
                       
            return axios(axiosConfig).then(res => {
                    if(res.data.success)
                        Flash.create('success', [res.data.success]);
    
                    return res.data[this._returnName];
                }, (e) => {
                    Flash.create('error', ["Request failed", truncateString(e.response.data.replace(/\r?\n|\r/g, ""), 100)])
                })
                .catch( (error) => Flash.create('error', ["Api error", error]))
        } catch(e){
            throw new Error(e);
        }
    }

    set route(path){
        this._strRoute = path;
    }

    get route(){

         //Search all the params in the URL. They start with dotdot ":"
         const arrUrlParams = this._strRoute.match(/:\w+/gm).map(item => item.replace(":", ""));
         const params = this._objData;
 
         let urlWithReplacedParams = "";
         arrUrlParams.forEach(itemParam => {
             if(params && params[itemParam]){
                 urlWithReplacedParams = this._strRoute.replace(`:${itemParam}`, params[itemParam]);
             }
         });
 
         //Cant find some param? Then remove it from URL;
         const arrUrlNotSpecifiedParams = (urlWithReplacedParams || this._strRoute).match(/\/:\w+/gm);
         let urlWithParams = "";

         if(arrUrlNotSpecifiedParams && arrUrlNotSpecifiedParams.length > 0){
             arrUrlNotSpecifiedParams.forEach(item => {
                 urlWithParams = (urlWithReplacedParams || this._strRoute).replace(item, "");
             });
         }
 
         let finalUrl = urlWithReplacedParams || urlWithParams;
     
         
         return finalUrl;
    }

    get urlFilters(){
        return this._objUrlFilters;
    }

    get params(){
        return this._objParams;
    }

    get actions(){
        return this._actions;
    }
    
}