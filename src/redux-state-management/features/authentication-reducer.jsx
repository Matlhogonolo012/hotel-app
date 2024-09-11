import { createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
                Navigate.push("/user-dashboard")
            })
            .catch((error)=>{
console.log(error.message)
            })
        }
    }
})
export const { setUserRegistration, setUserLogin } = userAuthSlice.actions
export default userAuthSlice.reducer;