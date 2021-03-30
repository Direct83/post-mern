import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import userReducer from './auth/reducer';
import contentReducer from './content/reducer';

const rootReducer = combineReducers({
  auth: userReducer,
  content: contentReducer,
})
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
  )),
);

export type RootState = ReturnType<typeof rootReducer>
