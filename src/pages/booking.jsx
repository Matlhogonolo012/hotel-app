import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "/src/redux-state-management/features/sidebar-reducer.jsx";
import Logo from "../components/logo";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { addBooking } from "../redux-state-management/features/firestore-reducer/firestore";
import {
  fetchRooms,
  searchRooms,
  checkRoomAvailability,
} from "/src/redux-state-management/features/rooms-reducer.jsx";
import "/src/pages/sidebar.css";
import { useState, useEffect } from "react";
import "/src/pages/booking.css";

function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const [searchQuery, setSearchQuery] = useState("");

  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomsData = useSelector((state) => state.rooms.filteredRooms); // Fetch rooms data from Redux
  const isLoggedIn = useSelector(
    (state) => state.userAuthentication.isLoggedIn
  );

  useEffect(() => {
    dispatch(fetchRooms()); // Fetch rooms when component mounts
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchRooms(searchQuery)); // Search rooms when query changes
  }, [searchQuery, dispatch]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

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

  // Helper to calculate the number of nights between check-in and check-out
  const calculateTotalNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const differenceInTime = checkOutDate - checkInDate;
    return differenceInTime / (1000 * 3600 * 24); // convert ms to days
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

        // Check if the number of guests exceeds the room's capacity
        if (guests > selectedRoom.capacity) {
          setError(
            `Selected room has a capacity of ${selectedRoom.capacity} guests.`
          );
          setRoomInfo(null);
        } else {
          setRoomInfo(selectedRoom);
          setTotalPrice(totalNights * selectedRoom.price); // Calculate total price
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
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
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
                  min={checkIn || new Date().toISOString().split("T")[0]} // Ensure check-out is after check-in
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
        </div>
      </main>
      <footer className="booking-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Booking;
