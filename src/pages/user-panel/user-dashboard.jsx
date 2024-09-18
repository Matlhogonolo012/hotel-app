// import { useDispatch, useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../../components/logo';
// import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer';
// import { logoutUser } from '../../redux-state-management/features/authentication-reducer';
// import { fetchUserProfile, updateUserProfile } from '/src/redux-state-management/features/firestore-reducer/user-profile-reducer';

// function UserDashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
//   const profile = useSelector((state) => state.userProfile.userProfile);
//   const user = useSelector((state) => state.userAuthentication.user);

//   const [formData, setFormData] = useState({
//     title: '',
//     name: '',
//     gender: '',
//     nationality: '',
//     idNumber: '',
//     dob: '',
//     address: '',
//     mobileNumber: '',
//     email: '',
//     titleOther: '',
//     genderOther: '',
//     nationalityOther: '',
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user?.uid) {
//       dispatch(fetchUserProfile(user.uid));
//     }
//   }, [user?.uid, dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         title: profile.title || '',
//         name: profile.name || '',
//         gender: profile.gender || '',
//         nationality: profile.nationality || '',
//         idNumber: profile.idNumber || '',
//         dob: profile.dob || '',
//         address: profile.address || '',
//         mobileNumber: profile.mobileNumber || '',
//         email: profile.email || '',
//         titleOther: profile.titleOther || '',
//         genderOther: profile.genderOther || '',
//         nationalityOther: profile.nationalityOther || '',
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.name) {
//       newErrors.name = 'Name is required.';
//     }
//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid.';
//     }
//     if (!formData.mobileNumber) {
//       newErrors.mobileNumber = 'Mobile Number is required.';
//     } else if (!/^\d+$/.test(formData.mobileNumber)) {
//       newErrors.mobileNumber = 'Mobile Number is invalid.';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     if (user?.uid) {
//       dispatch(updateUserProfile({ uid: user.uid, profileData: formData }));
//     }
//   };

//   const handleSidebarToggle = () => {
//     dispatch(toggleSidebar());
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/user-login");
//   };

//   return (
//     <div>
//       <header>
//         <Logo />
//         <p>User</p>
//         <button onClick={handleLogout}>
//           <img src="/src/assets/icons/logout-01-stroke-rounded.svg" alt="Logout" />
//         </button>
//         <button className="sidebar-toggle" onClick={handleSidebarToggle}>
//           <img src="/src/assets/icons/menu-01-stroke-rounded.svg" alt="Menu" />
//         </button>
//         <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//           <button onClick={handleSidebarToggle} className="close-sidebar">
//             <img src="/src/assets/icons/cancel-circle-stroke-rounded.svg" alt="Close" />
//           </button>
//           <ul>
//             <li><a href="/user-dashboard">Edit Info</a></li>
//             <li><a href="/reserved">Saved Info</a></li>
//             <li><a href="/reservations">Reservations</a></li>
//           </ul>
//         </div>
//       </header>
//       <main>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <fieldset>
//               <legend>User Details</legend>

//               <label>
//                 Title:
//                 <select name="title" value={formData.title} onChange={handleChange}>
//                   <option value="">-- Select Title --</option>
//                   <option value="Mrs">Mrs</option>
//                   <option value="Mr">Mr</option>
//                   <option value="Miss">Miss</option>
//                   <option value="Ms">Ms</option>
//                   <option value="Dr">Dr</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {formData.title === 'Other' && (
//                   <input
//                     type="text"
//                     name="titleOther"
//                     value={formData.titleOther || ''}
//                     onChange={handleChange}
//                     placeholder="Please specify"
//                   />
//                 )}
//               </label>
//               <br />

//               <label>
//                 Name & Surname:
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 {errors.name && <p className="error">{errors.name}</p>}
//               </label>
//               <br />

//               <label>
//                 Gender:
//                 <select name="gender" value={formData.gender} onChange={handleChange}>
//                   <option value="">-- Select Gender --</option>
//                   <option value="Female">Female</option>
//                   <option value="Male">Male</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {formData.gender === 'Other' && (
//                   <input
//                     type="text"
//                     name="genderOther"
//                     value={formData.genderOther || ''}
//                     onChange={handleChange}
//                     placeholder="Please specify"
//                   />
//                 )}
//               </label>
//               <br />

//               <label>
//                 Nationality:
//                 <select name="nationality" value={formData.nationality} onChange={handleChange}>
//                   <option value="">-- Select Nationality --</option>
//                   <option value="Botswana">Botswana</option>
//                   <option value="Russia">Russia</option>
//                   <option value="India">India</option>
//                   <option value="China">China</option>
//                   <option value="South Africa">South Africa</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {formData.nationality === 'Other' && (
//                   <input
//                     type="text"
//                     name="nationalityOther"
//                     value={formData.nationalityOther || ''}
//                     onChange={handleChange}
//                     placeholder="Please specify"
//                   />
//                 )}
//               </label>
//               <br />

//               <label>
//                 ID/Passport Number:
//                 <input
//                   type="text"
//                   name="idNumber"
//                   value={formData.idNumber}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />

//               <label>
//                 Date of Birth:
//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />

//               <label>
//                 Address:
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />

//               <label>
//                 Mobile Number:
//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                 />
//                 {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
//               </label>
//               <br />

//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}
//               </label>
//               <br />

//               <input type="submit" value="Save Changes" />
//             </fieldset>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../config/firebase';

// const UserProfile = () => {
//   const { uid } = useSelector((state) => state.userAuthentication.user);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (uid) {
//         const userDoc = await getDoc(doc(db, 'users', uid));
//         if (userDoc.exists()) {
//           setUserData(userDoc.data());
//         }
//       }
//     };

//     fetchUserData();
//   }, [uid]);

//   if (!userData) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Email: {userData.email}</p>
//       <p>Username: {userData.username}</p>
//       <p>Role: {userData.role}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const UserProfile = () => {
  const { uid } = useSelector((state) => state.userAuthentication.user);
  const [userData, setUserData] = useState(null);
  const [additionalData, setAdditionalData] = useState({
    name: '',
    surname: '',
    dob: '',
    gender: '',
    nationality: '',
    id: '',
    address: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setAdditionalData({
            name: userDoc.data().name || '',
            surname: userDoc.data().surname || '',
            dob: userDoc.data().dob || '',
            gender: userDoc.data().gender || '',
            nationality: userDoc.data().nationality || '',
            id: userDoc.data().id || '',
            address: userDoc.data().address || '',
            phoneNumber: userDoc.data().phoneNumber || ''
          });
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uid) {
      await setDoc(doc(db, 'users', uid), additionalData, { merge: true });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
      <p>Role: {userData.role}</p>
      {/* Add more read-only fields as needed */}

      <h2>Edit Additional Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={additionalData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={additionalData.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={additionalData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={additionalData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={additionalData.nationality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={additionalData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={additionalData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={additionalData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;
