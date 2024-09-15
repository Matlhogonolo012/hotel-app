import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '/src/config/firebase.jsx';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const snapshot = await db.collection('rooms').get();
    const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return rooms;
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (newRoom) => {
    const docRef = await db.collection('rooms').add(newRoom);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
});

export const updateRoom = createAsyncThunk('rooms/updateRoom', async ({ id, updatedRoom }) => {
    await db.collection('rooms').doc(id).update(updatedRoom);
    const doc = await db.collection('rooms').doc(id).get();
    return { id: doc.id, ...doc.data() };
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
    await db.collection('rooms').doc(id).delete();
    return id;
});

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        selectedRooms: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        selectRoom(state, action) {
            const roomId = action.payload;
            if (!state.selectedRooms.includes(roomId)) {
                state.selectedRooms.push(roomId);
            }
        },
        unselectRoom(state, action) {
            const roomId = action.payload;
            state.selectedRooms = state.selectedRooms.filter(id => id !== roomId);
        },
        clearSelectedRooms(state) {
            state.selectedRooms = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                const index = state.rooms.findIndex(room => room.id === action.payload.id);
                if (index >= 0) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter(room => room.id !== action.payload);
            });
    },
});

export const { selectRoom, unselectRoom, clearSelectedRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
