import { createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export const adminAuthSlice = createSlice({
  name: 'adminAuthentication',
  initialState: {
    admin: {
      email: "",
      password: "",
    }
  },
  reducers: {
    setAdminRegistration: (state, action) => {
      const { email, password } = action.payload;
      
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Admin registered successfully");
        })
        .catch((error) => {
          console.log(error.message);

        });
    },
    setAdminLogin: (state, action) => {
      const { email, password } = action.payload;
      
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Admin signed in successfully");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    setAdminLogout: () => {
      signOut(auth)
        .then(() => {
          alert("Admin signed out");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    setResetPassword: (state, action) => {
      const { email } = action.payload;
      
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
});

export const { setAdminRegistration, setAdminLogin, setAdminLogout, setResetPassword } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
