import Logo from "../../components/logo"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';

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
            <Link to="/admin-dashboard">Current Bookings</Link>
          </li>
          <li>
            <Link to="/reserved">Reserved Rooms</Link>
          </li>
         <li>
            <Link to="/available">Available Rooms</Link>
          </li>
          <li>
            <Link to="/cancellations">Cancellations</Link>
          </li>
          <li>
            <Link to="/Registered-users">Registered Users</Link>
          </li>
        </ul>
      </div>
        </header>
<main> 
     <h2>
            Current Bookings:
        </h2>
    <div>
     <fieldset>
        <legend>
            Room--
        </legend>
        details..........
        <button>
            Update
        </button>
        <button>
            Checkout
        </button>
     </fieldset>
    </div>
</main>
    </div>
    )

}
 export default AdminDashboard  
