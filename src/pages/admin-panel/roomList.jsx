
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRoom, unselectRoom, searchRooms } from '/src/redux-state-management/rooms-reducer.jsx';

const RoomList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.rooms);
    const filteredRooms = useSelector((state) => state.rooms.filteredRooms);
    const selectedRooms = useSelector((state) => state.rooms.selectedRooms);
    const status = useSelector((state) => state.rooms.status);
    const error = useSelector((state) => state.rooms.error);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRooms());
        }
    }, [status, dispatch]);

    useEffect(() => {
        dispatch(searchRooms(searchQuery));
    }, [searchQuery, dispatch]);

    const handleRoomToggle = (roomId) => {
        if (selectedRooms.includes(roomId)) {
            dispatch(unselectRoom(roomId));
        } else {
            dispatch(selectRoom(roomId));
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>{error}</p>;

    return (
        <div className="room-list">
            <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredRooms.length > 0 ? (
                filteredRooms.map(room => (
                    <div key={room.id} className="room-item">
                        <h2>{room.roomType}</h2>
                        <p>{room.description}</p>
                        <p>R{room.price}</p>
                        <button
                            onClick={() => handleRoomToggle(room.id)}
                            className={`toggle-button ${selectedRooms.includes(room.id) ? 'selected' : ''}`}
                        >
                            {selectedRooms.includes(room.id) ? 'Save' : 'Edit'}
                        </button>
                        <button
                            onClick={() => handleRoomToggle(room.id)}
                            className={`toggle-button ${selectedRooms.includes(room.id) ? 'selected' : ''}`}
                        >
                            {selectedRooms.includes(room.id) ? 'Clear' : 'Delete'}
                        </button>
                    </div>
                ))
            ) : (
                <p>No rooms available</p>
            )}
        </div>
    );
};

export default RoomList;
