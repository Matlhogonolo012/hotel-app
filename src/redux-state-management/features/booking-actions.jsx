// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../../config/firebase";
// import { setError, setBookingStatus } from './firestoreSlice'; // Adjust path as necessary

// // Asynchronous action to add booking
// export const addBooking = (bookingData) => async (dispatch) => {
//     try {
//         // Reference to the Firestore collection
//         const bookingCollection = collection(db, "BookingData");
        
//         // Add the booking data to Firestore
//         const docRef = await addDoc(bookingCollection, bookingData);
        
//         console.log("Document written with ID: ", docRef.id);
        
//         // Optionally dispatch an action to update the booking status
//         dispatch(setBookingStatus('Booking successful'));
//     } catch (error) {
//         console.error("Error adding document: ", error);
//         // Dispatch an error action if needed
//         dispatch(setError({ message: error.message, code: error.code }));
//     }
// };
