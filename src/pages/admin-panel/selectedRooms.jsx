// src/components/SelectedRooms.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedRooms } from '../redux/roomsSlice';

const SelectedRooms = () => {
    const dispatch = useDispatch();
    const selectedRooms = useSelector((state) => state.rooms.selectedRooms);
    const rooms = useSelector((state) => state.rooms.rooms);

    const handleClearSelection = () => {
        dispatch(clearSelectedRooms());
    };

    const selectedRoomDetails = rooms.filter(room => selectedRooms.includes(room.id));

    return (
        <div>
            <h2>Selected Rooms</h2>
            <ul>
                {selectedRoomDetails.map(room => (
                    <li key={room.id}>
                        {room.name} - ${room.price}
                    </li>
                ))}
            </ul>
            <button onClick={handleClearSelection}>Clear Selection</button>
        </div>
    );
};

export default SelectedRooms;
