import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '/src/redux-state-management/features/firestore-reducer/user-profile-reducer';
import { useNavigate } from 'react-router-dom';
import Logo from "../../components/logo";
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer';
import { logoutUser } from '../../redux-state-management/features/authentication-reducer';

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const profile = useSelector((state) => state.userProfile.profile);
  const user = useSelector((state) => state.userAuthentication.user);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    gender: '',
    nationality: '',
    idNumber: '',
    dob: '',
    address: '',
    mobileNumber: '',
    email: '',
    titleOther: '',
    genderOther: '',
    nationalityOther: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchUserProfile(user.uid));
    }
  }, [user.uid, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required.';
    } else if (!/^\d+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number is invalid.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (user.uid) {
      dispatch(updateUserProfile(user.uid, formData));
      setEditMode(false); // Exit edit mode after saving
    }
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/user-login");
  };

  return (
    <div>
      <header>
        <Logo />
        <p>User</p>
        <button onClick={handleLogout}>
          <img src="/src/assets/icons/logout-01-stroke-rounded.svg" alt="Logout" />
        </button>
        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          <img src="/src/assets/icons/menu-01-stroke-rounded.svg" alt="Menu" />
        </button>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button onClick={handleSidebarToggle} className="close-sidebar">
            <img src="/src/assets/icons/cancel-circle-stroke-rounded.svg" alt="Close" />
          </button>
          <ul>
            <li><a href="/user-dashboard">Edit Info</a></li>
            <li><a href="/reserved">Saved Info</a></li>
            <li><a href="/reservations">Reservations</a></li>
          </ul>
        </div>
      </header>
      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>{editMode ? 'Edit Your Details' : 'User Details'}</legend>
              
              <label>
                Title:
                <select name="title" value={formData.title} onChange={handleChange} disabled={!editMode}>
                  <option value="">-- Select Title --</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Other">Other</option>
                </select>
                {formData.title === 'Other' && editMode && (
                  <input
                    type="text"
                    name="titleOther"
                    value={formData.titleOther || ''}
                    onChange={handleChange}
                    placeholder="Please specify"
                  />
                )}
              </label>
              <br />
              
              <label>
                Name & Surname:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </label>
              <br />
              
              <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode}>
                  <option value="">-- Select Gender --</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                {formData.gender === 'Other' && editMode && (
                  <input
                    type="text"
                    name="genderOther"
                    value={formData.genderOther || ''}
                    onChange={handleChange}
                    placeholder="Please specify"
                  />
                )}
              </label>
              <br />
              
              <label>
                Nationality:
                <select name="nationality" value={formData.nationality} onChange={handleChange} disabled={!editMode}>
                  <option value="">-- Select Nationality --</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Russia">Russia</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
                {formData.nationality === 'Other' && editMode && (
                  <input
                    type="text"
                    name="nationalityOther"
                    value={formData.nationalityOther || ''}
                    onChange={handleChange}
                    placeholder="Please specify"
                  />
                )}
              </label>
              <br />
              
              <label>
                ID/Passport Number:
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
              <br />
              
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
              <br />
              
              <label>
                Address:
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
              <br />
              
              <label>
                Mobile Number:
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
              </label>
              <br />
              
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </label>
              <br />
              
              {editMode ? (
                <>
                  <input type="submit" value="Save Changes" />
                  <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <button type="button" onClick={() => setEditMode(true)}>Edit</button>
              )}
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
