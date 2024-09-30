import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "/src/redux-state-management/features/authentication-reducer.jsx";
import firestoreSlice from "./features/firestore-reducer/firestore";
import userProfileSlice from "/src/redux-state-management/features/firestore-reducer/user-profile-reducer.jsx";
import roomsSlice from "/src/redux-state-management/features/rooms-reducer.jsx";
import bookingSlice from "/src/redux-state-management/features/booking-crud-reducer.jsx";
import userRoleSlice from "/src/redux-state-management/features/authorization-reducer.jsx";

export const store = configureStore({
  reducer: {
    userAuthentication: userAuthSlice,
    firestore: firestoreSlice,
    userProfile: userProfileSlice,
    rooms: roomsSlice,
    userAuthorization: userRoleSlice,
    bookings: bookingSlice,
  },
});
export default store;
