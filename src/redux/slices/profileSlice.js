import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth'; 


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

export const saveProfileChanges = createAsyncThunk(
  'profile/saveProfileChanges',
  async (updatedProfile, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No admin is logged in');
      }

      await updateProfile(user, {
        displayName: updatedProfile.fullName,
        photoURL: updatedProfile.profilePicture || user.photoURL, 
      });

 
      const userDocRef = doc(db, 'users', user.uid); 
      await updateDoc(userDocRef, {
        fullName: updatedProfile.fullName,
        email: updatedProfile.email,
        phoneNumber: updatedProfile.phoneNumber,
        city: updatedProfile.city,
        state: updatedProfile.state,
        zipCode: updatedProfile.zipCode,
        country: updatedProfile.country,
      });

      return {
        fullName: updatedProfile.fullName,
        email: updatedProfile.email,
        profilePicture: updatedProfile.profilePicture || user.photoURL,
        phoneNumber: updatedProfile.phoneNumber,
        city: updatedProfile.city,
        state: updatedProfile.state,
        zipCode: updatedProfile.zipCode,
        country: updatedProfile.country,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  'profile/updateProfilePicture',
  async (profilePicture, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No admin is logged in');
      }

      await updateProfile(user, { photoURL: profilePicture });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        profilePicture: profilePicture,
      });

      return { profilePicture };
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
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
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
      })
      .addCase(saveProfileChanges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveProfileChanges.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.city = action.payload.city;
        state.state = action.payload.state;
        state.zipCode = action.payload.zipCode;
        state.country = action.payload.country;
        state.profilePicture = action.payload.profilePicture;
        state.status = 'succeeded';
      })
      .addCase(saveProfileChanges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.profilePicture = action.payload.profilePicture;
        state.status = 'succeeded';
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
