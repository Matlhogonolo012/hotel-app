import Logo from "../../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoomList from "./roomList";
import AddRoomForm from "./add-room-admin";
import {
  setUser,
  logoutUser,
} from "../../redux-state-management/features/authentication-reducer";

import "/src/pages/admin-panel/admin-dashboard.css";

function AdminDashboard() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(logoutUser());
      console.log("User logged out successfully.");
      navigate("/user-login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <Logo />
        <p className="admin-dashboard-title">ADMIN</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
