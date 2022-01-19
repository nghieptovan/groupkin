import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducer'
import ApiClient from './helpers/ApiClient';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createMiddleware from './middleware/clientMiddleware';
import persistState from 'redux-sessionstorage';

const client = new ApiClient();

const loggerMiddleware = createLogger();

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    if(process.env.NODE_ENV === 'development'){
        const store = createStore(
            createRootReducer(history),
            preloadedState,        
            composeEnhancer(
                applyMiddleware(
                    createMiddleware(client),
                    routerMiddleware(history),                
                    loggerMiddleware,
                    thunkMiddleware
                ),
            ),
        )
        return store
    }else{
        const store = createStore(
            createRootReducer(history),
            preloadedState,        
            composeEnhancer(
                applyMiddleware(
                    createMiddleware(client),
                    routerMiddleware(history),                
                    thunkMiddleware
                ),
            ),
        )
        return store
    }
    

  
}
