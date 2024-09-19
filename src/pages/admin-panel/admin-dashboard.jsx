import Logo from "../../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "/src/redux-state-management/features/sidebar-reducer.jsx";
import RoomList from "./roomList";
import AddRoomForm from "./add-room-admin";
import { setUser, logoutUser } from '../../redux-state-management/features/authentication-reducer';

import '/src/pages/admin-panel/admin-dashboard.css'

function AdminDashboard() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

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

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <Logo />
        <p className="admin-dashboard-title">ADMIN</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          <img src="/src/assets/icons/menu-01-stroke-rounded.svg" alt="menu" />
        </button>
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button onClick={handleSidebarToggle} className="close-sidebar">
            <img
              src="/src/assets/icons/cancel-circle-stroke-rounded.svg"
              alt="cancel"
            />
          </button>
          <ul className="sidebar-menu">
            <li>
              <Link to="/add-room-admin">Add rooms</Link>
            </li>
            <li>
              <Link to="/reserved">Reservations</Link>
            </li>
          </ul>
        </div>
      </header>
      <main className="admin-dashboard-main">
        <div className="room-form-section">
          <h2>Create a room:</h2>
          <AddRoomForm />
        </div>
        <div className="room-list-section">
          <h2>Added Rooms:</h2>
          <fieldset className="room-list-fieldset">
            <legend>Rooms</legend>
            <RoomList />
          </fieldset>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
