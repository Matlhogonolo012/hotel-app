import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loginUser = createAsyncThunk(
    'userAuthentication/loginUser',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(fetchUserRole(user.uid));
  
        return { email: user.email, uid: user.uid };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  