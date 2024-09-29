import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '/src/redux-state-management/features/rooms-reducer.jsx';
import '/src/pages/admin-panel/add-room-admin.css';

const AddRoomForm = () => {
    const dispatch = useDispatch();
    const [room, setRoom] = useState({
        title: "",
        image: null,
        description: '',
        price: '',
        roomType: '',
        availability: true,
        maxGuests: 0 // Added maxGuests to state
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom(prevRoom => ({
            ...prevRoom,
            [name]: name === 'availability' ? value === 'true' : value
        }));
    };

    const validate = () => {
        const errors = {};
        if (!room.description) errors.description = 'Description is required.';
        if (!room.price || isNaN(room.price) || room.price <= 0) errors.price = 'Price must be a positive number.';
        if (!room.roomType) errors.roomType = 'Room type is required.';
        if (!room.maxGuests || isNaN(room.maxGuests) || room.maxGuests <= 0) {
            errors.maxGuests = 'Max guests must be a positive number.';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addRoom(room));
            setRoom({ title: '', image: null, description: '', price: '', roomType: '', availability: true, maxGuests: 0 });
            setErrors({});
        }
    };

    return (
        <div className="add-room-form">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={room.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={room.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={room.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="roomType">Room Type:</label>
                    <select
                        id="roomType"
                        name="roomType"
                        value={room.roomType}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select Room Type</option>
                        <option value="Family Suite">Family Suite</option>
                        <option value="Connecting Rooms">Connecting Rooms</option>
                        <option value="Deluxe Family Room">Deluxe Family Room</option>
                    </select>
                    {errors.roomType && <p className="error-message">{errors.roomType}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="maxGuests">Max Guests:</label>
                    <input
                        type="number"
                        id="maxGuests"
                        name="maxGuests"
                        value={room.maxGuests}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.maxGuests && <p className="error-message">{errors.maxGuests}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="availability">Availability:</label>
                    <select
                        id="availability"
                        name="availability"
                        value={room.availability ? 'true' : 'false'}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Add Room</button>
            </form>
        </div>
    );
};

export default AddRoomForm;
