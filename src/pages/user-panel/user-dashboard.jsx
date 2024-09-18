import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const UserProfile = () => {
  const { uid } = useSelector((state) => state.userAuthorisation.user);
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
