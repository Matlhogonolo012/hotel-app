import Logo from "../../components/logo"
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from "react-router-dom"
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import { db } from "../../config/firebase";
import { setUserLogout } from "../../redux-state-management/features/authentication-reducer";

function UserDashboard(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
      };

      const logout =() => {
        const userLogOut = dispatch(setUserLogout());
        if (userLogOut){
            navigate("/user-login")
            alert("logged out")
        }
      }
 return(
    <div>
        <header>
            <Logo/>
            <p>User</p>
            <button onClick={ logout}>

                <Link to="/admin-login">
            <img src="/src/assets/icons/logout-01-stroke-rounded.svg" alt="logout" />
            </Link>  
            </button>
          
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
            <Link to="/admin-dashboard">Edit Info</Link>
          </li>
          <li>
            <Link to="/reserved">Saved info</Link>
          </li>
        </ul>
      </div>
        </header>
<main> 
    <div>
        <form action="">
<fieldset>
        <legend>
            User Details:
        </legend>
<label htmlFor="">Title:
        <select name="" id="">
            <option value="">--select title--</option>
            <option value="mrs">Mrs</option>
            <option value="mrs">Mr</option>
            <option value="mrs">Miss</option>
            <option value="mrs">Ms</option>
            <option value="mrs">Mrs</option>
            <option value="mrs">Dr</option>
            <option value="mrs">Other</option>
        </select>
        <br />
        </label>
<label htmlFor="">Name & Surname:
    <input type="text" />
    <br />
</label>
<label htmlFor="">Gender:
    <select name="" id="">
        <option value=""> --Select gender-- </option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
    </select>
    
</label>
<br />
<label htmlFor="">
    Nationality:
    <select name="nationality" id="">
        <option value="">--Select-Nationality--</option>
        <option value="Botswana">Botswana</option>
        <option value="Russia">Russia</option>
        <option value="India">India</option>
        <option value="China">China</option>
        <option value="South Africa">South Africa</option>
        <option value="Other">Other</option>
    </select>
</label>
<br />
<label htmlFor="">ID/Passport Number:
    <input type="number" />
</label>
<br />
<label htmlFor="">Date of Birth:
    <input type="date" />
</label>
<br />
<label htmlFor="">
    Home or Postal Address:
    <textarea type="text" />
</label>
<br />
<label htmlFor="">
Mobile Number:
<input type="number" />
</label>
<br />
<label htmlFor="">Email:
    <input type="email" />
</label>
<br />
<input type="submit" />
     </fieldset>
        
        </form>
     
    </div>
</main>
    </div>
    )

}
 export default UserDashboard  
