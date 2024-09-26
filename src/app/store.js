// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { adminReducer } from '../reducers/adminReducer';
// import { bookingReducer } from '../reducers/bookingReducer';

// const rootReducer = combineReducers({
//     admin: adminReducer,
//     booking: bookingReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import { adminReducer } from '../reducers/adminReducer';
import { bookingReducer } from '../reducers/bookingReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  booking: bookingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;