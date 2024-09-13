import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import Rooms from "../components/rooms";
import Footer from "../components/footer";
import "/src/pages/sidebar.css";
import { addBooking } from '../redux-state-management/features/firestore-reducer/firestore';
import { setBookingDetails} from '../redux-state-management/features/booking-reducer';
import search from "/src/assets/icons/search-01-stroke-rounded.svg";


function Booking() {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    const [rooms, setRooms] = useState('');
    const [roomType, setRoomType] = useState('');

    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

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
            default:
                break;
            case 'room-type':
                setRoomType(value);
                break;
        }
    };

    // const handleCheckAvailability = (e) => {
    //     e.preventDefault();
    //     dispatch(setBookingDetails({ checkIn, checkOut, guests, rooms }));
    //     console.log(checkIn)
    // };

    const handleBooking = async (e) => {
        e.preventDefault();
        dispatch(addBooking({ checkIn, checkOut, guests, rooms }));
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
                                <label htmlFor="type-of-room">
                                    <option value="">
                                        <select name="" id=""></select>
                                    </option>
                                </label>
                            </label>
                            <button type="submit">Check Availability</button>
                        </fieldset>
                    </form>
                    <form onSubmit={handleBooking}>

                       <div className='booking-summary'>
                        <fieldset>
                            <legend>Booking Summary</legend>
                            <ul>
                                <li>Room info</li>
                            </ul>
                            <button >Book</button>
                        </fieldset>
                    </div> 
                    </form>
                    

                    <div className='search-form'>
                        <form action="">
                            <label htmlFor="room-search">
                                <img src={search} alt="Search icon" />
                                <input
                                    type="text"
                                    id="room-search"
                                    placeholder='Search by room name'
                                />
                                <button type="submit">Search</button>
                            </label>
                        </form>
                    </div>
                </div>

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

                <div>
                    <Rooms />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Booking;
