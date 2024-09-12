import { createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
 import { auth } from '../../config/firebase';
 import { useNavigate } from 'react-router-dom';

export const userAuthSlice = createSlice({
    name: 'userAuthentication',
    initialState: {
      user: {
        email: "",
        password:"",
        
      }
    },
    reducers: {
        setUserRegistration: (state, action) => {
            console.log(state, action, 'pay');
            
            createUserWithEmailAndPassword(auth, action.payload, action.payload)
            .then(()=>{
                alert("You have been registered");  
              }).catch((error)=>{
            console.log(error.message)
              })
        },
        setUserLogin: (state, action) => {
            signInWithEmailAndPassword(auth,  action.payload, action.payload)
            .then(()=>{
                alert("Sign in successful")
                
            })
            .catch((error)=>{
        console.log(error.message)
            })
        },
        setUserLogout: () => {
          signOut(auth)
          .then (()=>{
            alert("signed out")
          }) 
          .catch((error)=> {console.log(error.message)})
        },
        setResetPassword: (state, action) => {
          sendPasswordResetEmail(auth, action.payload)
          .then(()=>{
            alert("reset link sent to your email")
          })
          .catch((error)=>{console.log(error.message)})
        }
    }
})
export const { setUserRegistration, setUserLogin,setUserLogout, setResetPassword } = userAuthSlice.actions
export default userAuthSlice.reducer;