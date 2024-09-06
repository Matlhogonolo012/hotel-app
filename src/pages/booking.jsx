import Logo from "../components/logo"
import { Link } from "react-router-dom";
import Rooms from "../components/rooms";
import Footer from "../components/footer";

function Booking(){
    return(
        <div>
            <header>
                
              <Logo/>  
            </header>
            <main>
             <div>
             <Link to="/">
             <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="back" />
          
             </Link>
             </div> 

           <div>

            <form>

                <label htmlFor="in"> Check-In: 
                     <input type="date" name="in" id="" />
                </label>
                <label htmlFor="in"> Check-Out:
                    <input type="date" name="in" id="" />
                </label>

                <label htmlFor="guests">Number of guests:
                <input type="number" />
                
                </label>
                
<label htmlFor="rooms">Number of rooms:
                <input type="number" />
                
                </label>
                <button>
                    Check Availability
                </button>
            </form>
            <label htmlFor="filter">
                <img src="/src/assets/icons/filter-stroke-rounded.svg" alt="" />Filter:
           <select name="" id="">
            <option default value=""> </option>
           </select>
           </label>
       
           
            </div> 

            <div>
                <Rooms/>
            </div>
            </main>
           <footer>
            <Footer/>
           </footer>
        </div>
    )
}
export default Booking