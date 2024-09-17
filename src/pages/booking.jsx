import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { addBooking } from '../redux-state-management/features/firestore-reducer/firestore';
import { fetchRooms } from '/src/redux-state-management/rooms-reducer.jsx'; 
import "/src/pages/sidebar.css";

function Booking() {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    const [rooms, setRooms] = useState('');
    const [roomType, setRoomType] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [roomInfo, setRoomInfo] = useState(null);
    const [error, setError] = useState('');

    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const roomsData = useSelector((state) => state.rooms.rooms);
    const roomsStatus = useSelector((state) => state.rooms.status);
    const roomsError = useSelector((state) => state.rooms.error);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    useEffect(() => {
        if (selectedRoomId) {
            const selectedRoom = roomsData.find(room => room.id === selectedRoomId);
            if (selectedRoom) {
                setRoomInfo(selectedRoom);
                setError('');
            } else {
                setRoomInfo(null);
                setError('Room does not exist or there was an error fetching availability.');
            }
        }
    }, [dispatch, selectedRoomId, roomsData]);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'check-in':
                setCheckIn(value);
                break;
            case 'check-out':
                setCheckOut(value);
                break;
            case 'guests':
                setGuests(value);
                break;
            case 'rooms':
                setRooms(value);
                break;
            case 'room-type':
                setRoomType(value);
                break;
            default:
                break;
        }
    };

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    const handleCheckAvailability = (e) => {
        e.preventDefault();
        setSelectedRoomId(roomType); 
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (roomInfo && roomInfo.availability) {
            dispatch(addBooking({ checkIn, checkOut, guests, rooms, roomType }));
        }
    };

    const handleSelectRoom = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <div>
            <header>
                <Logo />
            </header>
            <main>
                <div>
                    <Link to="/">
                        <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
                    </Link>
                </div>
                <div className='right-side-booking'>
                    <form className="availability-form">
                        <fieldset>
                            <legend>Booking Details:</legend>
                            <label htmlFor="check-in">
                                Check-In:
                                <input
                                    type="date"
                                    name="check-in"
                                    id="check-in"
                                    onChange={handleChange}
                                    value={checkIn}
                                />
                            </label>
                            <label htmlFor="check-out">
                                Check-Out:
                                <input
                                    type="date"
                                    name="check-out"
                                    id="check-out"
                                    onChange={handleChange}
                                    value={checkOut}
                                />
                            </label>
                            <label htmlFor="guests">
                                Number of guests:
                                <input
                                    type="number"
                                    name="guests"
                                    id="guests"
                                    onChange={handleChange}
                                    value={guests}
                                />
                            </label>
                            <label htmlFor="rooms">
                                Number of rooms:
                                <input
                                    type="number"
                                    name="rooms"
                                    id="rooms"
                                    onChange={handleChange}
                                    value={rooms}
                                />
                            </label>
                            <label htmlFor="room-type">
                                Room Type:
                                <select
                                    name="room-type"
                                    id="room-type"
                                    value={roomType}
                                    onChange={handleRoomTypeChange}
                                >
                                    <option value="">Select room type</option>
                                    <option value="connecting-rooms">Connecting Rooms</option>
                                    <option value="family-suite">Family Suite</option>
                                    <option value="deluxe-family-room">Deluxe Family Room</option>
                                </select>
                            </label>
                            <button type="button" onClick={handleCheckAvailability}>
                                Check Availability
                            </button>
                        </fieldset>
                    </form>

                    <form onSubmit={handleBooking}>
                        <div className='booking-summary'>
                            <fieldset>
                                <legend>Booking Summary</legend>
                                <ul>
                                    <li>Check-In: {checkIn}</li>
                                    <li>Check-Out: {checkOut}</li>
                                    <li>Number of Guests: {guests}</li>
                                    <li>Number of Rooms: {rooms}</li>
                                    <li>Room Type: {roomType}</li>
                                    <li>Room Info: 
                                        {error ? error : (roomInfo ? (roomInfo.availability ? 'Available' : 'Not Available') : 'Checking...')}
                                    </li>
                                    {roomInfo && roomInfo.availability === false && (
                                        <li style={{ color: 'red' }}>The selected room type is currently not available. Please choose a different option.</li>
                                    )}
                                    {roomInfo && roomInfo.availability === true && (
                                        <li style={{ color: 'green' }}>The selected room type is available for booking.</li>
                                    )}
                                </ul>
                                <button type="submit" disabled={!roomInfo || roomInfo.availability === false}>Book</button>
                            </fieldset>
                        </div>
                    </form>

                    <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                        <img
                            src="/src/assets/icons/filter-stroke-rounded.svg"
                            alt={isSidebarOpen ? "Close filter" : "Open filter"}
                        />
                    </button>

                    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                        <button className="close-sidebar" onClick={handleToggleSidebar}>
                            <img src="/src/assets/icons/cancel-circle-stroke-rounded.svg" alt="Cancel" />
                        </button>
                        <div>
                            <label htmlFor="price-range">
                                Price Range:
                                <select name="price-range" id="price-range">
                                    <option value="">Select price range</option>
                                    <option value="0-1500">R0 - R1500</option>
                                    <option value="1501-2500">R1501 - R2500</option>
                                    <option value="2501-3500">R2501 - R3500</option>
                                    <option value="3501-4500">R3501 - R4500</option>
                                    <option value="5000+">R5000+</option>
                                </select>
                            </label>

                            <label htmlFor="room-type">
                                Room Type:
                                <select name="room-type" id="room-type">
                                    <option value="">Select room type</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                    <option value="suite">Suite</option>
                                    <option value="family">Family</option>
                                </select>
                            </label>

                            <label htmlFor="pets">
                                Pets Allowed:
                                <select name="pets" id="pets">
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className='room-list'>
                        <h2>Available Rooms</h2>
                        {roomsStatus === 'loading' && <p>Loading rooms...</p>}
                        {roomsStatus === 'failed' && <p>Error fetching rooms: {roomsError}</p>}
                        {roomsStatus === 'succeeded' && (
                            <ul>
                                {roomsData.map(room => (
                                    <li key={room.id} onClick={() => handleSelectRoom(room.id)}>
                                        <h3>{room.description}</h3>
                                        <p>Type: {room.roomType}</p>
                                        <p>Price: ${room.price}</p>
                                        <p>Status: {room.availability ? 'Available' : 'Not Available'}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Booking;
