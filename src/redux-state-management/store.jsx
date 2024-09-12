import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from '/src/redux-state-management/features/sidebar-reducer.jsx';
import bookingSlice from '/src/redux-state-management/features/booking-reducer.jsx'
import userAuthSlice from '/src/redux-state-management/features/authentication-reducer.jsx'
import  firestoreSlice from './features/firestore-reducer/firestore';

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        booking: bookingSlice,
        userAuthentication: userAuthSlice,
        db: firestoreSlice

    },
});
