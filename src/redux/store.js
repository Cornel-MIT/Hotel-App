// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import roomsReducer from './roomsSlice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     rooms: roomsReducer,
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
