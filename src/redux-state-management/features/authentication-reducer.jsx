// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
// import { auth, db } from '../../config/firebase';
// import { doc, setDoc } from 'firebase/firestore';

// export const registerUser = createAsyncThunk(
//   'userAuthentication/registerUser',
//   async ({ email, password, username, role }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         email,
//         username,
//         role,
//         createdAt: new Date(),
//       });

//       return { email, uid: user.uid };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'userAuthentication/loginUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       return { email };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'userAuthentication/logoutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'userAuthentication/resetPassword',
//   async (email, { rejectWithValue }) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const userAuthSlice = createSlice({
//   name: 'userAuthentication',
//   initialState: {
//     user: {
//       email: "",
//       loading: false,
//       error: null,
//       uid: "",
//     },
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.user.loading = true;
//         state.user.error = null; 
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user.email = action.payload.email;
//         state.user.uid = action.payload.uid;
//         state.user.loading = false;
//         console.log("Registration successful");
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.user.loading = false;
//         state.user.error = action.payload;
//         console.error("Registration failed:", action.payload);
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.user.loading = true;
//         state.user.error = null; 
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user.email = action.payload.email;
//         state.user.loading = false;
//         console.log("Login successful");
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.user.loading = false;
//         state.user.error = action.payload;
//         console.error("Login failed:", action.payload);
//       })
//       .addCase(logoutUser.pending, (state) => {
//         state.user.loading = true;
//         state.user.error = null; 
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user.email = "";
//         state.user.uid = "";
//         state.user.loading = false;
//         console.log("Logout successful");
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.user.loading = false;
//         state.user.error = action.payload;
//         console.error("Logout failed:", action.payload);
//       })
//       .addCase(resetPassword.pending, (state) => {
//         state.user.loading = true;
//         state.user.error = null; 
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.user.loading = false;
//         console.log("Password reset email sent");
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.user.loading = false;
//         state.user.error = action.payload;
//         console.error("Password reset failed:", action.payload);
//       });
//   },
// });

// export default userAuthSlice.reducer;
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

      return { email, uid: user.uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'userAuthentication/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { email };
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
      email: "",
      loading: false,
      error: null,
      uid: "",
    },
    isLoggedIn: false, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null; 
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.uid = action.payload.uid;
        state.user.loading = false;
        state.isLoggedIn = true; 
        console.log("Registration successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        console.error("Registration failed:", action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.loading = false;
        state.isLoggedIn = true; // Set to true on successful login
        console.log("Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        console.error("Login failed:", action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null; 
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.email = "";
        state.user.uid = "";
        state.user.loading = false;
        state.isLoggedIn = false;
        console.log("Logout successful");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        console.error("Logout failed:", action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.user.loading = true;
        state.user.error = null; 
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.user.loading = false;
        console.log("Password reset email sent");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        console.error("Password reset failed:", action.payload);
      });
  },
});

export default userAuthSlice.reducer;
