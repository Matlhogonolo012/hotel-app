import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/logo";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { addBooking } from "../redux-state-management/features/firestore-reducer/firestore";
import {
  fetchRooms,
  searchRooms,
  checkRoomAvailability,
} from "/src/redux-state-management/features/rooms-reducer.jsx";

import { useState, useEffect } from "react";
import "/src/pages/booking.css";

function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomsData = useSelector((state) => state.rooms.filteredRooms); // Fetch rooms data from Redux
  const isLoggedIn = useSelector(
    (state) => state.userAuthentication.isLoggedIn
  );

  useEffect(() => {
    dispatch(fetchRooms()); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchRooms(searchQuery)); 
  }, [searchQuery, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "check-in":
        setCheckIn(value);
        break;
      case "check-out":
        setCheckOut(value);
        break;
      case "guests":
        setGuests(value);
        break;
      case "search-query":
        setSearchQuery(value);
        break;
      default:
        break;
    }
  };


  const calculateTotalNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const differenceInTime = checkOutDate - checkInDate;
    return differenceInTime / (1000 * 3600 * 24); 
  };

  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    if (selectedRoomId && checkIn && checkOut) {
      if (new Date(checkIn) >= new Date(checkOut)) {
        setError("Check-out date must be after the check-in date.");
        return;
      }

      const availability = await dispatch(
        checkRoomAvailability({ roomId: selectedRoomId, checkIn, checkOut })
      );

      if (availability.meta.requestStatus === "fulfilled") {
        const selectedRoom = roomsData.find(
          (room) => room.id === selectedRoomId
        );
        const totalNights = calculateTotalNights(checkIn, checkOut);

        if (guests > selectedRoom.capacity) {
          setError(
            `Selected room has a capacity of ${selectedRoom.capacity} guests.`
          );
          setRoomInfo(null);
        } else {
          setRoomInfo(selectedRoom);
          setTotalPrice(totalNights * selectedRoom.price); 
          setError("");
        }
      } else {
        setRoomInfo(null);
        setError("Selected room is not available for the chosen dates.");
      }
    } else {
      setError("Please select a room and enter check-in/out dates.");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("You must be logged in to proceed to payment.");
      navigate("/user-login-for-booking");
      return;
    }
    console.log("Total Price:", totalPrice);
    if (roomInfo && roomInfo.availability) {
      await dispatch(
        addBooking({ checkIn, checkOut, guests, roomId: roomInfo.id, price: totalPrice })
      );
      navigate("/summary", {
        state: {
          checkIn: checkIn,
          checkOut: checkOut,
          roomId: roomInfo.id,
          guests: guests,
          totalPrice
        },
        
      });
    } else {
      setError("Please ensure the room is available before booking.");
    }
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <Logo />
      </header>
      <main className="booking-main">
        <div className="back-link">
          <Link to="/">
            <img
              src="/src/assets/icons/link-backward-stroke-rounded.svg"
              alt="Back"
            />
          </Link>
        </div>
        <div className="booking-form-container">
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
                  min={new Date().toISOString().split("T")[0]} 
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
                  min={checkIn || new Date().toISOString().split("T")[0]} 
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
              <label htmlFor="room-select">
                Select Room:
                <select
                  id="room-select"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                >
                  <option value="">Select a room</option>
                  {roomsData.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.roomType}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={handleCheckAvailability}>
                Check Availability
              </button>
            </fieldset>
          </form>

          <form onSubmit={handleBooking}>
            <div className="booking-summary">
              <fieldset>
                <legend>Booking Summary</legend>
                <ul>
                  <li>Check-In: {checkIn}</li>
                  <li>Check-Out: {checkOut}</li>
                  <li>Number of Guests: {guests}</li>
                  <li>
                    Room Type:
                    {roomInfo ? roomInfo.roomType : "No room selected"}
                  </li>
                  <li>Total Price: R{totalPrice}</li>
                  <li>
                    Status:
                    {error
                      ? error
                      : roomInfo
                      ? roomInfo.availability
                        ? "Available"
                        : "Not Available"
                      : "Checking..."}
                  </li>
                  {roomInfo && !roomInfo.availability && (
                    <li className="error-message">
                      The selected room type is currently not available. Please
                      choose a different option.
                    </li>
                  )}
                  {roomInfo && roomInfo.availability && (
                    <li className="success-message">
                      The selected room type is available for booking.
                    </li>
                  )}
                </ul>
                <button
                  type="submit"
                  disabled={!roomInfo || !roomInfo.availability}
                >
                  Book
                </button>
              </fieldset>
            </div>
          </form>
          <div className="search-rooms">
           <label htmlFor="search-query">
             Search Rooms:
             <input
               type="text"
               id="search-query"
               name="search-query"
               placeholder="Enter room type..."
               value={searchQuery}
               onChange={handleChange}
             />
           </label>
         </div>
           <div className="sidebar-content">
             <h3>Filter Rooms</h3>
             <label>
               Room Type:
               <select onChange={(e) => dispatch(searchRooms(e.target.value))}>
                 <option value="">All</option>
                 <option value="Family Suite">Family Suite</option>
                 <option value="Deluxe Room">Deluxe Room</option>
                 <option value="Connecting Rooms">Connecting Rooms</option>
               </select>
             </label>
             <label>
               Price Range:
               <input
                 type="range"
                 min="0"
                 max="1000000"
                 value={roomsData.price}
                 onChange={(e) => console.log(e.target.value)}
               />
             </label>
           </div>
          <section className="room-list">
             <h2>Available Rooms</h2>
             {roomsData.length > 0 ? (
               roomsData.map((room) => (
                 <div key={room.id} className="room-item">
                   <h3>{room.roomType}</h3>
                   <p>{room.description}</p>
                   <p>Price: R{room.price}</p>
                   <button onClick={() => setSelectedRoomId(room.id)}>
                     Select
                   </button>
                 </div>
               ))
             ) : (
               <p>No rooms available.</p>
             )}
           </section>
        </div>
      </main>
      <footer className="booking-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Booking;