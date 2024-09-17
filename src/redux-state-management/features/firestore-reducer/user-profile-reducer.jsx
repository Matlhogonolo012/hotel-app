import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '/src/config/firebase.jsx';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (uid, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data();
      if (userData.createdAt) {
        userData.createdAt = userData.createdAt.toDate().toISOString();
      }

      return { uid, ...userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ uid, profileData }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, profileData, { merge: true });
      return { uid, ...profileData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: {
      email: '',
      username: '',
      role: '',
      loading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.userProfile.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
          email: action.payload.email, 
          loading: false,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.userProfile.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
          loading: false,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
