import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const querySnapshot = await getDocs(collection(db, 'ratings'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addRating = createAsyncThunk('ratings/addRating', async (rating) => {
  const docRef = await addDoc(collection(db, 'ratings'), rating);
  return { id: docRef.id, ...rating };
});

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.ratings = action.payload;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload);
      });
  }
});

export default ratingsSlice.reducer;
