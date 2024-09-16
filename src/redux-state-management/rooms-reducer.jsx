import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '/src/config/firebase.jsx'; 

const initialState = {
    rooms: [],
    selectedRooms: [],
    filteredRooms: [],
    status: 'idle',
    error: null,
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (_, { rejectWithValue }) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return rooms;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (newRoom, { rejectWithValue }) => {
    try {
        const docRef = await addDoc(collection(db, 'rooms'), newRoom);
        return { id: docRef.id, ...newRoom };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
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
        setRooms(state, action) {
            state.rooms = action.payload;
            state.filteredRooms = action.payload; 
        },
        updateRoom(state, action) {
            const index = state.rooms.findIndex(room => room.id === action.payload.id);
            if (index >= 0) {
                state.rooms[index] = action.payload;
            }
        },
        deleteRoom(state, action) {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
            state.filteredRooms = state.filteredRooms.filter(room => room.id !== action.payload);
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        searchRooms(state, action) {
            const query = action.payload.toLowerCase();
            state.filteredRooms = state.rooms.filter(room =>
                (room.description && room.description.toLowerCase().includes(query)) ||
                (room.roomType && room.roomType.toLowerCase().includes(query))
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rooms = action.payload;
                state.filteredRooms = action.payload; // Initialize filtered rooms
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.filteredRooms.push(action.payload);
            })
            .addCase(addRoom.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const {
    setError,
    selectRoom,
    unselectRoom,
    clearSelectedRooms,
    setRooms,
    updateRoom,
    deleteRoom,
    setStatus,
    searchRooms
} = roomsSlice.actions;

export default roomsSlice.reducer;
