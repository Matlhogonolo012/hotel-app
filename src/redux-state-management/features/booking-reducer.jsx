// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { db } from '../../config/firebase';

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     checkIn: '',
//     checkOut: '',
//     guests: 0,
//     rooms: 0,
//     bookingStatus: '',
//     error: null,
//   },
//   reducers: {
    
//   setBookingDetails: async(state, action) =>{
//         const docRef = await addDoc (collection( db, "bookings"), action.payload)
//     }
// },
// });

// export const { setBookingDetails } = bookingSlice.actions;
// export default bookingSlice.reducer;
