import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '/src/config/firebase.jsx';

const initialState = {
    bookings: [],
    status: 'idle',
    error: null,
};

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return bookings;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (newBooking, { rejectWithValue }) => {
    try {
        const docRef = await addDoc(collection(db, 'bookings'), newBooking);
        return { id: docRef.id, ...newBooking };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateBooking = createAsyncThunk('bookings/updateBooking', async (booking, { rejectWithValue }) => {
    try {
        const bookingRef = doc(db, 'bookings', booking.id);
        await updateDoc(bookingRef, booking);
        return booking;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (bookingId, { rejectWithValue }) => {
    try {
        const bookingRef = doc(db, 'bookings', bookingId);
        await deleteDoc(bookingRef);
        return bookingId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addBooking.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings.push(action.payload);
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateBooking.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
                state.bookings[index] = action.payload;
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setError } = bookingSlice.actions;

export default bookingSlice.reducer;
