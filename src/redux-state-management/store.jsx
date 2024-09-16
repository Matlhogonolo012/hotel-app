import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from '/src/redux-state-management/features/sidebar-reducer.jsx';
import userAuthSlice from '/src/redux-state-management/features/authentication-reducer.jsx'
import  adminAuthSlice  from './admin-reducer';
import  firestoreSlice from './features/firestore-reducer/firestore';
import userProfileSlice from '/src/redux-state-management/features/firestore-reducer/user-profile-reducer.jsx'
import roomsSlice from '/src/redux-state-management/rooms-reducer.jsx'
import roomAvailabilitySlice from '/src/redux-state-management/roomsAvailability.jsx'

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        userAuthentication: userAuthSlice,
        firestore: firestoreSlice,
        adminAuthentication: adminAuthSlice,
        userProfile: userProfileSlice,
        rooms: roomsSlice,
        roomAvailability: roomAvailabilitySlice
    },
});
export default store