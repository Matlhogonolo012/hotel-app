import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const { setProfile, setLoading, setError } = userProfileSlice.actions;

export const fetchUserProfile = (uid) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      dispatch(setProfile(docSnap.data()));
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserProfile = (uid, profileData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await setDoc(doc(db, 'users', uid), profileData, { merge: true });
    dispatch(setProfile(profileData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export default userProfileSlice.reducer;
