import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientId: 'YOUR_PAYPAL_CLIENT_ID',
};

const paypalSlice = createSlice({
  name: 'paypal',
  initialState,
  reducers: {},
});

export default paypalSlice.reducer;
