import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  },
  reducers: {
    setBookingDetails: (state, action) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.guests = action.payload.guests;
      state.rooms = action.payload.rooms;
    },
  },
});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
