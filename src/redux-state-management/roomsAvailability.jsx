import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '/src/config/firebase.jsx';

const initialState = {
    availability: {},
    status: 'idle',
    error: null,
};

export const checkRoomAvailability = createAsyncThunk('roomAvailability/checkRoomAvailability', async ({ roomId, date }, { rejectWithValue }) => {
    try {
        const q = query(collection(db, 'bookings'), where('roomId', '==', roomId), where('date', '==', date));
        const querySnapshot = await getDocs(q);
        const isAvailable = querySnapshot.empty;
        return { roomId, date, isAvailable };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

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
                const { roomId, date, isAvailable } = action.payload;
                if (!state.availability[roomId]) {
                    state.availability[roomId] = {};
                }
                state.availability[roomId][date] = isAvailable;
            })
            .addCase(checkRoomAvailability.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setError } = roomAvailabilitySlice.actions;

export default roomAvailabilitySlice.reducer;
