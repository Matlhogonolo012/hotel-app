import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import Rooms from "../components/rooms";
import Footer from "../components/footer";
import "/src/pages/booking.css";

function Booking() {
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
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
                <div className="availability-form">
                    <form>
                        <fieldset>
                            <legend>Booking Details</legend>
                            <label htmlFor="check-in">Check-In:
                                <input type="date" name="check-in" id="check-in" />
                            </label>
                            <label htmlFor="check-out">Check-Out:
                                <input type="date" name="check-out" id="check-out" />
                            </label>
                            <label htmlFor="guests">Number of guests:
                                <input type="number" name="guests" id="guests" />
                            </label>
                            <label htmlFor="rooms">Number of rooms:
                                <input type="number" name="rooms" id="rooms" />
                            </label>
                            <button type="submit">Check Availability</button>
                        </fieldset>
                    </form>
                </div>
                <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                    <img src="/src/assets/icons/filter-stroke-rounded.svg" alt={isSidebarOpen ? "Close filter" : "Open filter"} />
                </button>
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <button className="close-sidebar" onClick={handleToggleSidebar}>X</button>
                    <div>
                        <label htmlFor="price-range">
                            Price Range:
                            <select name="price-range" id="price-range">
                                <option value="">Select price range</option>
                                <option value="0-1500">R0 - R1500</option>
                                <option value="1501-2500">$1501 - R2500</option>
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

                        <label htmlFor="amenities">
                            Amenities:
                            <select name="amenities" id="amenities">
                                <option value="">Select amenities</option>
                                <option value="wifi">Wi-Fi</option>
                                <option value="pool">Pool</option>
                                <option value="gym">Gym</option>
                                <option value="parking">Parking</option>
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
