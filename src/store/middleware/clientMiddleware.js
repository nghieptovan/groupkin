import { unSetToken } from '../reducer/auth';
export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, actionTypes, ...rest } = action; // eslint-disable-line no-redeclare
      
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS, FAILURE] = types || actionTypes;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          if((Object.hasOwn(result,'status') && result.status) || !Object.hasOwn(result,'status')){
            next({...rest, result, type: SUCCESS});
          }
          else{
            next({...rest, result, type: FAILURE});
          }
        },
        (error) => {
          const respErr = error.response;
          if(respErr.data.statusCode === 403){
            console.log('Bạn chưa có quyền thực hiện thao tác này');
          }
          if(respErr.data.statusCode === 401){
            console.log('--- not authorized');
            unSetToken();
          }
          next({...rest, error, type: FAILURE});
        }
      ).catch((error)=> {       
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}
