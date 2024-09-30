import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc, collection } from "firebase/firestore"; 
import { useSelector } from "react-redux";
import '/src/pages/summary.css'

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();

  const { checkIn = "", checkOut = "", roomId = "", guests = 1, totalPrice = 0 } = location.state || {};
  
  const isLoggedIn = useSelector((state) => state.userAuthentication.isLoggedIn);
  const userUid = useSelector((state) => state.userAuthentication.user?.uid);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    roomId: roomId || "",
    guests: guests || 1,
    totalPrice,
  });

  const calculateNights = () => {
    const oneDay = 1000 * 60 * 60 * 24;
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const diffInTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(diffInTime / oneDay);
    return nights > 0 ? nights : 0;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && userUid) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", userUid));
          
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            setError("User does not exist");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, userUid]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/user-login", {
        state: {
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            roomId: bookingData.roomId,
            guests: bookingData.guests,
            totalPrice: bookingData.totalPrice,
          },
      });
      return;
    }

    const db = getFirestore();
    const bookingId = `booking_${new Date().getTime()}`; 
    const bookingRef = doc(collection(db, "users", userUid, "bookings"), bookingId);

    try {
      await setDoc(bookingRef, {
        ...bookingData,
        userId: userUid,
        userEmail: user?.email,
        bookingDate: new Date(),
      });
      console.log("Booking saved successfully!");

      navigate("/paypal", {
        state: {
          ...bookingData,
          userId: userUid,
          userEmail: user?.email,
        },
      });
    } catch (error) {
      console.error("Error saving booking data: ", error);
      setError("Failed to save booking data.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    
    <div className="summary-container">
    
      <h1 className="summary-title">Booking Summary</h1>
      {error && <p className="summary-error">{error}</p>}

      {user && (
        <div className="user-info">
          <h2 className="user-info-title">User Information</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <div className="booking-details">
        <h2 className="booking-details-title">Booking Details</h2>
        <p>Check-in: {bookingData.checkIn}</p>
        <p>Check-out: {bookingData.checkOut}</p>
        <p>Number of Nights: {calculateNights()}</p>
        <p>Room ID: {bookingData.roomId}</p>
        <p>Number of Guests: {bookingData.guests}</p>
        <p>Total Room Price: R{bookingData.totalPrice}</p>
      </div>

      <form className="booking-form" onSubmit={handleBooking}>
        <button className="booking-button" type="submit">Proceed to Pay</button>
      </form>
    </div>
  );
}

export default Summary;
