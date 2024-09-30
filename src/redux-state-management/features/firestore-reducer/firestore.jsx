import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

const initialState = {
  bookings: [],
  checkIn: "",
  checkOut: "",
  guests: 0,
  rooms: 0,
  bookingStatus: "",
  error: null,
  roomType: null,
};

const firestoreSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload; // Update bookings state
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBookingStatus: (state, action) => {
      state.bookingStatus = action.payload;
    },
  },
});

export const { setBookings, setError, setBookingStatus } =
  firestoreSlice.actions;

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

    dispatch(setBookingStatus("Booking successful"));
  } catch (error) {
    console.error("Error adding document: ", error.message);
    dispatch(setError(error.message));
  }
};

export const saveBookingToFirestore = (bookingData) => async (dispatch) => {
  try {
    await addDoc(collection(db, "confirmedBookings"), bookingData);
    console.log("Booking saved successfully:", bookingData);
  } catch (error) {
    console.error("Error saving booking:", error);
  }
};

export const fetchBookings = (userId) => async (dispatch) => {
  try {
    const q = query(
      collection(db, "BookingData"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const userBookings = [];
    querySnapshot.forEach((doc) => {
      userBookings.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setBookings(userBookings));
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    dispatch(setError(error.message));
  }
};
