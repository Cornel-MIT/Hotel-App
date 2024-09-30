import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; 


export const fetchRoomsByAdmin = createAsyncThunk('rooms/fetchRoomsByAdmin', async (adminEmail) => {
  const q = query(collection(db, 'rooms'), where('adminEmail', '==', adminEmail)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomsByAdmin.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoomsByAdmin.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default roomsSlice.reducer;
