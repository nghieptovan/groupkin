import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import loginInfo from "./auth";
import transaction from "./transaction";
const rootReducer = history =>
  combineReducers({
    loginInfo,
    transaction,
    form: formReducer,
    router: connectRouter(history)
  });

export default rootReducer;
