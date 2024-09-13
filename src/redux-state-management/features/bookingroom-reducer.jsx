import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';

export const bookRooms = createAsyncThunk(
  'bookingRoom',
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const bookingRef = db.collection('bookings').doc();
      await bookingRef.set(bookingDetails);
      return bookingDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkIn: '',
    checkOut: '',
    guests: 0,
    rooms: 0,
    bookingStatus: '',
    error: null,
  },
  reducers: {
    setBookingDetails(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRooms.pending, (state) => {
        state.bookingStatus = 'pending';
        state.error = null;
      })
      .addCase(bookRooms.fulfilled, (state, action) => {
        state.bookingStatus = 'confirmed';
      })
      .addCase(bookRooms.rejected, (state, action) => {
        state.bookingStatus = 'error';
        state.error = action.payload;
      });
  },
});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
