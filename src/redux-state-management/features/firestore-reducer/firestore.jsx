import { createSlice } from "@reduxjs/toolkit";

import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

export const firestoreSlice = createSlice({
    name: "db",
    initialState:{
        
    },
    reducers: {
        // addUsers: async(state, action) =>{
        //     const docRef = await addDoc (collection( db, "users"), action.payload)
        // }
    }
})

export const {addUsers} = firestoreSlice.actions
export default firestoreSlice.reducer