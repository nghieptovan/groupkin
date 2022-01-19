import axios from 'axios';
import Cookies from "js-cookie";
import {
  CONSTS
} from '../../config/Constant';
import CookiesService from '../../services/CookiesService';
const methods = ['get', 'post', 'put', 'patch', 'delete'];
const hostname = process.env.REACT_APP_API;

const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return hostname + adjustedPath;
}
export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, data) => new Promise((resolve, reject) => {
        if(path === 'no-action-url'){
          resolve('success');
        }
        else{
          let token = CookiesService.get(CONSTS.STORE_KEYS.USER.TOKEN);
          if(token && token !== ''){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
          axios[method](formatUrl(path), data)
          .then(response => {
            if (response.status == 200) {
              resolve(response.data)
            }else {
              reject(response.data)
            }
          }).catch(err => {
            reject(err)
          });
        }
       
      }));
  }
  empty() {}
}
