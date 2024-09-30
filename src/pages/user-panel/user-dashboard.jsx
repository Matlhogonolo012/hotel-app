import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { setUser, logoutUser } from '../../redux-state-management/features/authentication-reducer';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './user-dashboard.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { uid, email, username, role } = useSelector((state) => state.userAuthentication.user);

  const [additionalData, setAdditionalData] = useState({
    title: '',
    name: '',
    surname: '',
    dob: '',
    gender: 'Other',
    nationality: '',
    id: '',
    address: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            dispatch(setUser({ username: data.username, role: data.role }));
            setAdditionalData({
              title: data.title || '',
              name: data.name || '',
              surname: data.surname || '',
              dob: data.dob ? data.dob.toDate().toISOString().split('T')[0] : '',
              gender: data.gender || 'Other',
              nationality: data.nationality || '',
              id: data.id || '',
              address: data.address || '',
              phoneNumber: data.phoneNumber || ''
            });
          } else {
            setError('User not found.');
          }
        } catch (err) {
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const fetchUserBookings = async () => {
      if (uid) {
        try {
          const bookingsRef = collection(db, 'users', uid, 'bookings');
          const bookingDocs = await getDocs(bookingsRef);
          const bookingsData = bookingDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(bookingsData);
        } catch (error) {
          console.error('Error fetching user bookings:', error);
        }
      }
    };

    fetchUserData();
    fetchUserBookings();
  }, [uid, dispatch]);

  const validate = () => {
    const errors = {};
    if (!additionalData.name) errors.name = "Name is required.";
    if (!additionalData.surname) errors.surname = "Surname is required.";
    if (!additionalData.dob) errors.dob = "Date of Birth is required.";
    if (!additionalData.gender) errors.gender = "Gender is required.";
    if (!additionalData.nationality) errors.nationality = "Nationality is required.";
    if (!additionalData.id) errors.id = "ID is required.";
    if (!additionalData.address) errors.address = "Address is required.";
    if (!additionalData.phoneNumber) errors.phoneNumber = "Phone Number is required.";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    if (uid) {
      try {
        const dobDate = new Date(additionalData.dob);
        if (isNaN(dobDate.getTime())) {
          setError('Invalid date of birth.');
          return;
        }

        const userData = {
          ...additionalData,
          dob: dobDate
        };

        await setDoc(doc(db, 'users', uid), userData, { merge: true });
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error updating profile:', err);
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  const handleFavoriteToggle = async (bookingId, isFavorite) => {
    try {
      const bookingRef = doc(db, 'users', uid, 'bookings', bookingId);
      await updateDoc(bookingRef, { favorite: !isFavorite });
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, favorite: !isFavorite } : booking
      ));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleRatingChange = async (bookingId, newRating) => {
    try {
      const bookingRef = doc(db, 'users', uid, 'bookings', bookingId);
      await updateDoc(bookingRef, { rating: newRating });
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, rating: newRating } : booking
      ));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(logoutUser());
      navigate('/user-login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <header className="user-profile-header">
        <h1>Welcome, {username.toUpperCase()}! </h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className='container'>
        <div className="user-profile">
          {success && <div className="success-message">{success}</div>}
          <form className="user-profile-form" onSubmit={handleSubmit}>
            <h2>Edit Additional Information</h2>
            <br />
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <select name="title" id="title" value={additionalData.title} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </select>
              {validationErrors.title && <div className="validation-error">{validationErrors.title}</div>}
            </div>

            {Object.entries(additionalData).map(([key, value]) => (
              key !== 'title' && (
                <div className="form-group" key={key}>
                  <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  {key === 'gender' ? (
                    <select name={key} id={key} value={value} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : key === 'nationality' ? (
                    <select name={key} id={key} value={value} onChange={handleChange}>
                      <option value="">Select Country</option>
                      <option value="Botswana">Botswana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <input
                      type={key === 'dob' ? 'date' : 'text'}
                      name={key}
                      id={key}
                      value={value}
                      onChange={handleChange}
                      disabled={key === 'id' && value !== ''}
                    />
                  )}
                  {validationErrors[key] && <div className="validation-error">{validationErrors[key]}</div>}
                </div>
              )
            ))}
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="bookings-list">
          <h2>Your Bookings</h2>
          <br />
          {bookings.length > 0 ? (
            <ol>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <label>Favorite:</label>
                  <span
                    className="favorite-icon"
                    onClick={() => handleFavoriteToggle(booking.id, booking.favorite)}
                    style={{ cursor: 'pointer', fontSize: '19px', color: booking.favorite ? 'red' : 'gray' }}
                  >
                    {booking.favorite ? '❤️' : '🤍'}
                  </span>
                  <span>Room ID: {booking.roomId}</span>
                  <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                  <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                  <span>Guests: {booking.guests}</span>
                  <span>Rating: 
                    <select value={booking.rating || ''} onChange={(e) => handleRatingChange(booking.id, parseInt(e.target.value))}>
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
