import { createSelector } from '@reduxjs/toolkit';

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomAvailability = (state) => state.roomAvailability.rooms;

export const selectCombinedRoomData = createSelector(
    [selectRooms, selectRoomAvailability],
    (rooms, roomAvailability) => {
        return rooms.map(room => ({
            ...room,
            availability: roomAvailability[room.id] || {}
        }));
    }
);
