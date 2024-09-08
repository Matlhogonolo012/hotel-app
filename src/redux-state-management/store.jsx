import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from '/src/redux-state-management/features/sidebar-reducer.jsx';
import bookingSlice from '/src/redux-state-management/features/booking-reducer.jsx'

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        booking: bookingSlice,
    },
});
