import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from '/src/redux-state-management/features/sidebar-reducer.jsx';
import userAuthSlice from '/src/redux-state-management/features/authentication-reducer.jsx'
import  adminAuthSlice  from './admin-reducer';
import  firestoreSlice from './features/firestore-reducer/firestore';
import userProfileSlice from '/src/redux-state-management/features/firestore-reducer/user-profile-reducer.jsx'
import roomsSlice from '/src/redux-state-management/rooms-reducer.jsx'
import roomAvailabilityReducer from '/src/redux-state-management/roomsAvailability.jsx'
import ratingsReducer from './features/ratings-reducer';
import bookingSlice from '/src/redux-state-management/features/booking-crud-reducer.jsx'
import userRoleSlice from '/src/redux-state-management/features/authorization-reducer.jsx'
import paypalReducer from '/src/redux-state-management/features/paypal-reducer.jsx';

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        userAuthentication: userAuthSlice,
        firestore: firestoreSlice,
        adminAuthentication: adminAuthSlice,
        userProfile: userProfileSlice,
        rooms: roomsSlice,
        userAuthorization: userRoleSlice,
        ratings: ratingsReducer,
        roomAvailability: roomAvailabilityReducer,
        bookings: bookingSlice,
        paypal: paypalReducer,
    },
});
export default store