
const axios = require('axios');
const API_URL = process.env.REACT_APP_API;
class ApiService {
  constructor() {
    if (!ApiService.instance) {
      this.client = axios.create({
        baseURL: API_URL,
        timeout: process.env.TIME_OUT || 30000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        }
      });

      this.client.interceptors.request.use(
        config => {
          if (typeof window !== "undefined") {
            if (!document.body.classList.contains("show-indicator")) {
              document.body.classList.add("show-indicator");
            }
          }

          return config;
        },
        error => {
          if (typeof window !== "undefined") {
            document.body.classList.remove("show-indicator");
          }
          Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        response => {
          return parseBody(response);
        },
        error => {
          if (error.response) {
            return parseError(error.response.data);
          } else {
            return Promise.reject(error);
          }
        }
      );
    }

    return ApiService.instance;
  }


  get(url) {
    return this.client.get(url);
  }
  post(url, data) {
    return this.client.post(url, data);
  }
  put(url, data) {
    return this.client.put(url, data);
  }
  patch(url, data) {
    return this.client.patch(url, data);
  }
  delete(url) {
    return this.client.delete(url);
  }

  parseError(messages) {
    if (messages) {
      if (messages instanceof Array) {
        return Promise.reject({ messages: messages });
      } else {
        return Promise.reject({ messages: [messages] });
      }
    } else {
      return Promise.reject({ messages: ["Something went wrong"] });
    }
  }
  
  parseBody(response) {
    if (response.status === 200) {
      return response.data;
    } else {
      return this.parseError(response.data.messages);
    }
  }

  
}

  
export default new ApiService();
