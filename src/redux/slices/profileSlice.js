import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchAdminProfile = createAsyncThunk(
  'profile/fetchAdminProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No admin is logged in');
      }

      const q = query(collection(db, 'rooms'), where('adminId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        rooms,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    uid: null,
    fullName: '',
    email: '',
    profilePicture: '',
    rooms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.profilePicture = action.payload.profilePicture;
        state.rooms = action.payload.rooms;
        state.status = 'succeeded';
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
