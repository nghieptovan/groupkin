import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import loginInfo from "./auth";
import payment from "./payment";
import coinpromotion from "./coinpromotion";
import coin from "./coin";
const rootReducer = history =>
  combineReducers({
    loginInfo,
    payment,
    coinpromotion,
    coin,
    // category,
    // user,
    // config,
    // homepage,
    // royaltiesEditor,
    form: formReducer,
    router: connectRouter(history)
  });

export default rootReducer;
