import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicture: '',  
  userName: '',        
  email: '',          
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.profilePicture = action.payload.profilePicture;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.profilePicture = '';
      state.userName = '';
      state.email = '';
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
