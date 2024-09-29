import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Rooms from '../components/rooms';
import Logo from '../components/logo';
import { toggleSidebar } from '/src/redux-state-management/features/sidebar-reducer.jsx';
import '/src/pages/sidebar.css';
import '/src/pages/deafault.css'; 

function Default() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div>
      <header>
        <div className="contact-info">
          <p>Book by phone: 081 368 4688</p> OR click icon
          <Link to="https://wa.me/qr/YTSZ7HS4JE4QL1">
            <img src="/src/assets/icons/whatsapp-business-stroke-rounded.svg" alt="whatsapp-business" />
          </Link>
        </div>
        <div className="nav-container">
          <nav>
            <Logo />
            <Link to="/">Home</Link>
            <button>
              <Link to="/booking">Book Now</Link>
            </button>
           
            <div className="user-auth-buttons">
              <Link to="/user-login" className="auth-button">Login</Link>
              <Link to="/user-registration" className="auth-button">Register</Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="hero-image">
          <img
            src="/src/assets/hotel-app-images/hotel-building.jpg"
            alt="hotel-building"
            width="1320"
            height="466"
          />
        </div>
        <div className="hero-text">
          <p> AT HARMONY HEIGHTS</p>
          <h2>Best Value Is Guaranteed</h2>
        </div>

        <div className="features">
          <div className="feature">
            <img src="/src/assets/icons/award-02-stroke-rounded.svg" alt="award" />
            <h4>Price Match Promise</h4>
            <p>
              We're confident our rates are the best in the market. If you find
              a lower price from another provider, we'll match it and give you
              twice the difference. Terms and conditions apply.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icons/ticket-star-stroke-rounded.svg" alt="award-icon" />
            <h4>Complimentary Facilities Access Pass</h4>
            <p>
              This pass grants all guests in your unit unlimited access to the
              listed facilities throughout your entire stay.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icons/building-06-stroke-rounded.svg" alt="building" />
            <h4>Charming Pretoria Locale</h4>
            <p>
              Located in the cozy heart of Pretoria, Harmony Heights offers
              charming views of the cityscape, including notable buildings and
              lively streets, providing a delightful retreat in the urban
              environment.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icons/user-group-stroke-rounded.svg" alt="group" />
            <h4>An Unforgettable Family Retreat</h4>
            <p>
              Perfect for families, Harmony Heights provides a cozy escape with
              beautiful views of Pretoria, including the Union Buildings and local
              vendors selling unique items. Enjoy easy access to these attractions
              for a memorable getaway.
            </p>
          </div>
        </div>

        <div className="location-info">
          <img
            src="/src/assets/hotel-app-images/city.jpg"
            alt="city"
            width="619"
            height="416"
          />
          <h5>GAUTENG, PRETORIA</h5>
          <h3>Harmony Heights.</h3>
          <p>
            Nestled at the heart of Pretoria, Harmony Heights offers stunning
            views of the cityscape, including the iconic Union Buildings and
            vibrant local vendors.
          </p>
          <p>
            Harmony Heights is a comprehensive retreat with modern amenities,
            including a relaxing spa, a children’s play area, and various
            activities to enhance your stay. Enjoy a memorable getaway with easy
            access to these unique local attractions.
          </p>
        </div>

        <div className="facilities">
          <h2>OUR ROOMS</h2>
          <Rooms />
        </div>

        <div className="facilities">
          <h2>FACILITIES</h2>
          <div className="facility">
            <p>Indoor Swimming Pool</p>
            <img src="/src/assets/hotel-app-images/indoor-pool.jpg" alt="pool" width="619" height="416" />
          </div>
          <div className="facility">
            <p>Spa</p>
            <img src="/src/assets/hotel-app-images/spa.jpg" alt="spa" width="619" height="416" />
          </div>
          <div className="facility">
            <p>Kids Play Area</p>
            <img src="/src/assets/hotel-app-images/playarea.jpg" alt="play-area" width="619" height="416" />
          </div>
          <div className="facility">
            <p>Laundry</p>
            <img src="/src/assets/hotel-app-images/laundry.jpg" alt="laundry" width="619" height="416" />
          </div>
          <div className="facility">
            <p>Restaurant</p>
            <img src="/src/assets/hotel-app-images/restaurant.jpg" alt="restaurant" width="619" height="416" />
          </div>
          <div className="facility">
            <p>Gym</p>
            <img src="/src/assets/hotel-app-images/gym.jpg" alt="gym" width="619" height="416" />
          </div>
        </div>

        <div className="ratings">
          <h2>RATINGS</h2>
          <div className="rating">
            <img src="/src/assets/icons/16231558095-star-rating.svg" alt="star-ratings" width="70" height="70" />
            <p>4.5 - EXCELLENT</p>
          </div>
          <div className="review">
            <p>"Fantastic for Families!"</p>
            <p>
              We loved our stay at Harmony Heights! The Kids' Club kept our kids
              entertained, and the Family Pool was perfect for family fun. The
              on-site restaurant made dining easy and enjoyable, and the laundry
              facilities were super convenient for our extended stay. Highly
              recommend for a family getaway!
            </p>
            <p>— Jessica L., Pretoria</p>
          </div>
          <div className="review">
            <p>"Great Stay with Kids"</p>
            <p>
              Harmony Heights was excellent for our family trip. The Kids' Club
              and Family Pool were big hits with our children. The on-site
              restaurant was convenient and had great food. The laundry
              facilities were a lifesaver. Only downside was the room size, but
              overall a fantastic stay!
            </p>
            <p>— Mark R., Free State</p>
          </div>
          <img src="/src/assets/hotel-app-images/rating.jpg" alt="smiling-people-rating" width="210" height="210" />
        </div>

        <div className="location">
          <h2>LOCATION</h2>
          <div className="map">
            <iframe
              width="720"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=Ga-Rankuwa%20Arts%20and%20Crafts%20Centre%205088%20Maele%20Street+(Harmony%20Heights)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps devices</a>
            </iframe>
          </div>
          <div className="address">
            <h3>Address:</h3>
            <p>Arts and Crafts Centre</p>
            <p>5088 Maele street</p>
            <p>Zone 6</p>
            <p>Ga-Rankuwa</p>
            <p>Pretoria</p>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Default;
