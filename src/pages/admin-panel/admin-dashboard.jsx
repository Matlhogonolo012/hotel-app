import Logo from "../../components/logo"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import RoomList from "./roomList";
import AddRoomForm from "./add-room-admin";

function AdminDashboard(){
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
      };

 return(
    <div>
        <header>
            <Logo/>
            <p>ADMIN</p>
            <Link to="/admin-login">
            <img src="/src/assets/icons/logout-01-stroke-rounded.svg" alt="logout" />
            </Link>
            <button className="sidebar-toggle" onClick={handleSidebarToggle}>
             
              <img
                src="/src/assets/icons/menu-01-stroke-rounded.svg"
                alt="menu"
              />
            </button>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button onClick={handleSidebarToggle} className="close-sidebar">
        <img src="/src/assets/icons/cancel-circle-stroke-rounded.svg" alt="cancel" />
        </button>
        <ul>
          
          <li>
            <Link to="/add-room-admin">Add rooms</Link>
          </li>
          <li>
            <Link to="/reserved">Reservations</Link>
          </li>
         {/* <li>
            <Link to="/selectedRooms">Selected Rooms</Link>
          </li>
          <li>
            <Link to="/cancellations">Cancellations</Link>
          </li>
          <li>
            <Link to="/Registered-users">Registered Users</Link>
          </li> */}
        </ul>
      </div>
        </header>
<main> 
  <div>
  <h2>
            Create a room:
        </h2>
<AddRoomForm/>
</div>
    <div>
      <h2>Added Rooms:</h2>
     <fieldset>
        <legend>
            Rooms
        </legend>
       <RoomList/>
     </fieldset>
    </div>
    
</main>
    </div>
    )

}
 export default AdminDashboard  
