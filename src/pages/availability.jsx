import React from 'react';
import { useSelector } from 'react-redux';
import { selectCombinedRoomData } from './selectors'; 

const RoomListAvailability = () => {

    const roomsWithAvailability = useSelector(selectCombinedRoomData);
    const status = useSelector(state => state.rooms.status); 
    const error = useSelector(state => state.rooms.error);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ul>
            {roomsWithAvailability.length > 0 ? (
                roomsWithAvailability.map(room => (
                    <li key={room.id}>
                        <h3>{room.name}</h3>
                        <p>Type: {room.type}</p>
                        <p>Rooms: {room.rooms}</p>
                        <p>Status: {room.availability.status || 'Unknown'}</p>
                        <p>Last Updated: {room.availability.lastUpdated || 'Not Available'}</p>
                    </li>
                ))
            ) : (
                <p>No rooms available</p>
            )}
        </ul>
    );
};

export default RoomListAvailability;
