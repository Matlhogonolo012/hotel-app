// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import { setUser, logoutUser } from '../../redux-state-management/features/authentication-reducer';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signOut } from 'firebase/auth';
// import UserRating from './ratings';
// import '/src/pages/user-panel/use-dashboard.css'

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const { uid, email, username, role } = useSelector((state) => state.userAuthentication.user);
  
//   const [additionalData, setAdditionalData] = useState({
//     name: '',
//     surname: '',
//     dob: '',
//     gender: 'Other',
//     nationality: '',
//     id: '',
//     address: '',
//     phoneNumber: ''
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (uid) {
//         try {
//           const userDoc = await getDoc(doc(db, 'users', uid));
//           if (userDoc.exists()) {
//             const data = userDoc.data();
//             dispatch(setUser({ username: data.username, role: data.role }));
//             setAdditionalData({
//               name: data.name || '',
//               surname: data.surname || '',
//               dob: data.dob ? data.dob.toDate().toISOString().split('T')[0] : '',
//               gender: data.gender || 'Other',
//               nationality: data.nationality || '',
//               id: data.id || '',
//               address: data.address || '',
//               phoneNumber: data.phoneNumber || ''
//             });
//           } else {
//             setError('User not found.');
//           }
//         } catch (err) {
//           setError('Failed to fetch user data.');
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [uid, dispatch]);

//   const validate = () => {
//     const errors = {};
//     if (!additionalData.name) errors.name = "Name is required.";
//     if (!additionalData.surname) errors.surname = "Surname is required.";
//     if (!additionalData.dob) errors.dob = "Date of Birth is required.";
//     if (!additionalData.gender) errors.gender = "Gender is required.";
//     if (!additionalData.nationality) errors.nationality = "Nationality is required.";
//     if (!additionalData.id) errors.id = "ID is required.";
//     if (!additionalData.address) errors.address = "Address is required.";
//     if (!additionalData.phoneNumber) errors.phoneNumber = "Phone Number is required.";

//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAdditionalData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
    
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
  
//     if (uid) {
//       try {
//         const dobDate = new Date(additionalData.dob);
//         if (isNaN(dobDate.getTime())) {
//           setError('Invalid date of birth.');
//           return;
//         }

//         const userData = {
//           ...additionalData,
//           dob: dobDate
//         };
  
//         await setDoc(doc(db, 'users', uid), userData, { merge: true });
//         setSuccess("Profile updated successfully!");
//         console.log("User profile saved:", userData);
//         setTimeout(() => setSuccess(''), 3000);
//       } catch (err) {
//         console.error('Error updating profile:', err);
//         setError('Failed to update profile. Please try again.');
//       }
//     }
//   };

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     const auth = getAuth();
//     try {
//       await signOut(auth);
//       dispatch(logoutUser());
//       console.log("User logged out successfully.");
//       navigate('/user-login'); 
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="user-profile">
//       <header className="user-profile-header">
//         <h1>User Profile</h1>
//       </header>
//       <div className="user-profile-info">
//         <p>Email: {email}</p>
//         <p>Username: {username}</p>
//         <p>Role: {role}</p>
//         <button className="logout-button" onClick={handleLogout}>Logout</button>

//         {success && <div className="success-message">{success}</div>}

//         <h2>Edit Additional Information</h2>
//         <form className="user-profile-form" onSubmit={handleSubmit}>
//           {Object.entries(additionalData).map(([key, value]) => (
//             <div className="form-group" key={key}>
//               <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
//               {key === 'gender' ? (
//                 <select name={key} id={key} value={value} onChange={handleChange}>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               ) : (
//                 <input
//                   type={key === 'dob' ? 'date' : 'text'}
//                   name={key}
//                   id={key}
//                   value={value}
//                   onChange={handleChange}
//                 />
//               )}
//               {validationErrors[key] && <div className="validation-error">{validationErrors[key]}</div>}
//             </div>
//           ))}
//           <button type="submit">Save</button>
//         </form>

//               </div>
//               <UserRating/>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { setUser, logoutUser } from '../../redux-state-management/features/authentication-reducer';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import UserRating from './ratings';
import './use-dashboard.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { uid, email, username, role } = useSelector((state) => state.userAuthentication.user);

  const [additionalData, setAdditionalData] = useState({
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
        console.log("User profile saved:", userData);
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error updating profile:', err);
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(logoutUser());
      console.log("User logged out successfully.");
      navigate('/user-login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <header className="user-profile-header">
        <h1>User Profile</h1>
      </header>
      <div className="user-profile-info">
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <p>Role: {role}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        {success && <div className="success-message">{success}</div>}

        <h2>Edit Additional Information</h2>
        <form className="user-profile-form" onSubmit={handleSubmit}>
          {Object.entries(additionalData).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {key === 'gender' ? (
                <select name={key} id={key} value={value} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type={key === 'dob' ? 'date' : 'text'}
                  name={key}
                  id={key}
                  value={value}
                  onChange={handleChange}
                />
              )}
              {validationErrors[key] && <div className="validation-error">{validationErrors[key]}</div>}
            </div>
          ))}
          <button type="submit">Save</button>
        </form>

        <h2>Your Bookings</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p>Check-in: {booking.checkIn}</p>
                <p>Check-out: {booking.checkOut}</p>
                <p>Room ID: {booking.roomId}</p>
                <p>Number of Guests: {booking.guests}</p>
                <p>Total Price: R{booking.totalPrice}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      <UserRating />
    </div>
  );
};

export default UserProfile;
