import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '/src/config/firebase.jsx'; 

export const fetchRoomAvailability = createAsyncThunk(
    'roomAvailability/fetchRoomAvailability',
    async (roomId) => {
        try {
            const roomDoc = await db.collection('rooms').doc(roomId).get();
            if (!roomDoc.exists) {
                throw new Error('Room does not exist');
            }
            return { id: roomId, ...roomDoc.data() };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

const roomAvailabilitySlice = createSlice({
    name: 'roomAvailability',
    initialState: {
        rooms: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomAvailability.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRoomAvailability.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { id, ...roomData } = action.payload;
                state.rooms[id] = roomData;
            })
            .addCase(fetchRoomAvailability.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default roomAvailabilitySlice.reducer;
