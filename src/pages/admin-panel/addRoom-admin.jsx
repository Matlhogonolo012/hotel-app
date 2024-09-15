// src/components/AddRoomForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../redux/roomsSlice';

const AddRoomForm = () => {
    const dispatch = useDispatch();
    const [room, setRoom] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom(prevRoom => ({ ...prevRoom, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRoom(room));
        setRoom({ name: '', description: '', price: '' }); // Clear form
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={room.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={room.description} onChange={handleChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={room.price} onChange={handleChange} required />
            </label>
            <button type="submit">Add Room</button>
        </form>
    );
};

export default AddRoomForm;
