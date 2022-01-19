import axios from "axios";
import StorageService from "../services/StorageService";
import { CONSTS } from "../config/Constant";
import { parseBody, parseError } from "../utils/requestUtils";
const API_URL = process.env.REACT_APP_API;

const CancelToken = axios.CancelToken;
let cancleRequest;
class CustomUploadAdapter {
  constructor(loader, editor) {
    this.editor = editor;
    this.loader = loader;
    this.client = axios.create({
      baseURL: API_URL,
      timeout: process.env.TIME_OUT || 30000,
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8"
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.lengthComputable) {
          loader.uploadTotal = progressEvent.total;
          loader.uploaded = progressEvent.loaded;
        }
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancleRequest = c;
      })
    });

    this.client.interceptors.request.use(
      config => {
        // if (typeof window !== "undefined") {
        //   if (!document.body.classList.contains("show-indicator")) {
        //     document.body.classList.add("show-indicator");
        //   }
        // }
        const token = StorageService.get(CONSTS.STORE_KEYS.USER.TOKEN);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        // if (typeof window !== "undefined") {
        //   document.body.classList.remove("show-indicator");
        // }
        Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      response => {
        // if (typeof window !== "undefined") {
        //   setTimeout(() => {
        //     document.body.classList.remove("show-indicator");
        //   }, 5000);
        // }
        return parseBody(response);
      },
      error => {
        // if (typeof window !== "undefined") {
        //   document.body.classList.remove("show-indicator");
        // }
        if (error.response) {
          return parseError(error.response.data);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const postId = this.editor.config._config.postId;
          var bodyFormData = new FormData();
          const data = {
            media_type: "5e6e8894b666b37854332a1b",
            post: postId
          };
          file.path = `/posts/${postId}`;

          bodyFormData.set("data", JSON.stringify(data));
          bodyFormData.append("files.file", file);
          bodyFormData.append("files.file.path", `/posts/${postId}`);

          this.client
            .post(`/media`, bodyFormData)
            .then(result => {
              resolve({
                default: result.file.url
              });
            })
            .catch(err => {
              reject(err);
            });

          // this._initRequest();
          // this._initListeners(resolve, reject, file);
          // this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    // if (this.xhr) {
    //   this.xhr.abort();
    // }
    cancleRequest && cancleRequest();
  }
  _initRequest() {}
}
export default CustomUploadAdapter;
