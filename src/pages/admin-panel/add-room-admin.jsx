import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, searchRooms } from '/src/redux-state-management/rooms-reducer.jsx';

const AddRoomForm = () => {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms.filteredRooms); 
    const [room, setRoom] = useState({
        description: '',
        price: '',
        roomType: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom(prevRoom => ({ ...prevRoom, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        if (!room.description) errors.description = 'Description is required.';
        if (!room.price || isNaN(room.price) || room.price <= 0) errors.price = 'Price must be a positive number.';
        if (!room.roomType) errors.roomType = 'Room type is required.';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addRoom(room));
            setRoom({ description: '', price: '', roomType: '' });
            setErrors({});
            console.log(room);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input 
                        type="text" 
                        name="description" 
                        value={room.description} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {errors.description && <p className="error">{errors.description}</p>}
                
                <label>
                    Price:
                    <input 
                        type="number" 
                        name="price" 
                        value={room.price} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                {errors.price && <p className="error">{errors.price}</p>}
                
                <label>
                    Room Type:
                    <select 
                        name="roomType" 
                        value={room.roomType} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Room Type</option>
                        <option value="Family Suite">Family Suite</option>
                        <option value="Connecting Rooms">Connecting Rooms</option>
                        <option value="Deluxe Family Room">Deluxe Family Room</option>
                    </select>
                </label>
                {errors.roomType && <p className="error">{errors.roomType}</p>}
                
                <button type="submit">Add Room</button>
            </form>
            
        </div>
    );
};

export default AddRoomForm;
