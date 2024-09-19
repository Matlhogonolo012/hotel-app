import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const initialState = {
    checkIn: '',
    checkOut: '',
    guests: 0,
    rooms: 0,
    bookingStatus: '',
    error: null,
    roomType: null,
};

const firestoreSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setBookingStatus: (state, action) => {
            state.bookingStatus = action.payload;
        },
    },
});

export const { setError, setBookingStatus } = firestoreSlice.actions;

export default firestoreSlice.reducer;

export const addBooking = (bookingData) => async (dispatch) => {
    try {
        console.log("Booking data: ", bookingData);

       
        const bookingCollection = collection(db, "BookingData");
        const docRef = await addDoc(bookingCollection, bookingData);
        console.log("Document written with ID: ", docRef.id);

        const roomRef = doc(db, "rooms", bookingData.roomId);
        await updateDoc(roomRef, { isAvailable: false }); 
        console.log("Room availability updated");

        dispatch(setBookingStatus('Booking successful'));
    } catch (error) {
        console.error("Error adding document: ", error.message);
        dispatch(setError(error.message));
    }
};

