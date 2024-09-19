import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = createAsyncThunk(
  'userAuthentication/registerUser',
  async ({ email, password, username, role }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        role,
        createdAt: new Date(),
      });

      return { email, uid: user.uid, username, role };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'userAuthentication/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { email, uid: userCredential.user.uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'userAuthentication/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'userAuthentication/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: 'userAuthentication',
  initialState: {
    user: {
      email: '',
      loading: false,
      error: null,
      uid: '',
      username: '',
      role: '',
    },
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = !!action.payload.uid; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.uid = action.payload.uid;
        state.user.username = action.payload.username;
        state.user.role = action.payload.role;
        state.user.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.uid = action.payload.uid;
        state.user.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.email = '';
        state.user.uid = '';
        state.user.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.user.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
      });
  },
});

export const { setUser } = userAuthSlice.actions; 
export default userAuthSlice.reducer;
