import { combineReducers } from 'redux';
import { adminReducer } from './adminReducer';
import { bookingReducer } from './bookingReducer';
import { roomReducer } from './roomReducer';

export const rootReducer = combineReducers({
  admin: adminReducer,
  booking: bookingReducer,
  room: roomReducer,
});