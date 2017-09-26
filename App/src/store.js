// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
//
// const enhancers = [];
// const middlewares = [
//     thunk
// ];
//
//
// if(process.env.NODE_ENV === 'development') {
//     const devToolsExtension = window.devToolsExtension;
//
//     if( typeof devToolsExtension === 'function'){
//         enhancers.push(devToolsExtension());
//     }
// }
//
// const composedEnhancers = compose(
//     applyMiddleware(...middlewares),
//     ...enhancers
// )
//
// const store = createStore(
//     rootReducer,
//     composedEnhancers
// )
//
// export default store;


import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
