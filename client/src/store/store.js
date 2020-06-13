import { createStore , applyMiddleware , compose , combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/authReducer';
import MealReducer from './reducers/mealReducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
  meal: MealReducer
})

//const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = compose;
const store = createStore(RootReducer,composeEnhancers(
  applyMiddleware(thunk)
))

export default store;