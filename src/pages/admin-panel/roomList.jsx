// src/components/RoomList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRoom, unselectRoom } from '../redux/roomsSlice';

const RoomList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const selectedRooms = useSelector((state) => state.rooms.selectedRooms);
    const status = useSelector((state) => state.rooms.status);
    const error = useSelector((state) => state.rooms.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRooms());
        }
    }, [status, dispatch]);

    const handleRoomToggle = (roomId) => {
        if (selectedRooms.includes(roomId)) {
            dispatch(unselectRoom(roomId));
        } else {
            dispatch(selectRoom(roomId));
        }
    };

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>{error}</p>;

    return (
        <div>
            {rooms.map(room => (
                <div key={room.id}>
                    <h2>{room.name}</h2>
                    <p>{room.description}</p>
                    <p>${room.price}</p>
                    <button onClick={() => handleRoomToggle(room.id)}>
                        {selectedRooms.includes(room.id) ? 'Unselect' : 'Select'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RoomList;
