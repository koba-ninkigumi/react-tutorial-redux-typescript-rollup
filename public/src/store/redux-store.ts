import {createStore,  applyMiddleware} from 'redux';
import commentReducer from '../reducers/comment-reducer'
declare function reduxLogger(option?:any):any;

export default function configureStore() {
  const logger = reduxLogger({logger:console});
  const createStoreWithMiddleware = applyMiddleware(
    logger
  )(createStore);
  const store = createStoreWithMiddleware(commentReducer);
  return store;
}
