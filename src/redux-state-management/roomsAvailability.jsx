import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '/src/config/firebase.jsx';

const initialState = {
    availability: {},
    status: 'idle',
    error: null,
};

export const checkRoomAvailability = createAsyncThunk(
    'rooms/checkRoomAvailability',
    async ({ roomId, checkIn, checkOut }, { rejectWithValue }) => {
        try {
            const bookingsRef = collection(db, "BookingData");
            const q = query(bookingsRef, where("roomId", "==", roomId));
            const querySnapshot = await getDocs(q);

            let isAvailable = true;

            querySnapshot.forEach((doc) => {
                const booking = doc.data();
                const bookedCheckIn = new Date(booking.checkIn);
                const bookedCheckOut = new Date(booking.checkOut);

                if (
                    (new Date(checkIn) < bookedCheckOut && new Date(checkOut) > bookedCheckIn)
                ) {
                    isAvailable = false;
                }
            });

            return { roomId, isAvailable };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const roomAvailabilitySlice = createSlice({
    name: 'roomAvailability',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkRoomAvailability.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkRoomAvailability.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { roomId, isAvailable } = action.payload;
                if (!state.availability[roomId]) {
                    state.availability[roomId] = {};
                }
                state.availability[roomId].isAvailable = isAvailable;
            })
            .addCase(checkRoomAvailability.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setError } = roomAvailabilitySlice.actions;

export default roomAvailabilitySlice.reducer;
