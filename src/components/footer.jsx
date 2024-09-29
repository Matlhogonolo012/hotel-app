import '/src/components/footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <p className="footer-title">RESERVATIONS</p>
        <div className="footer-contact">
          <img
            src="/src/assets/icons/telephone-stroke-rounded.svg"
            alt="tel"
            className="footer-icon"
          />
          <p className="footer-contact-info">+27 813 684 688</p>
        </div>
        <div className="footer-contact">
          <img
            src="/src/assets/icons/mail-at-sign-01-stroke-rounded.svg"
            alt="email"
            className="footer-icon"
          />
          <p className="footer-contact-info">harmonyheights@gmail.com</p>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-title">HOTEL RECEPTION</p>
        <div className="footer-contact">
          <img
            src="/src/assets/icons/telephone-stroke-rounded.svg"
            alt="tel"
            className="footer-icon"
          />
          <p className="footer-contact-info">+27 813 684 688</p>
        </div>
        <div className="footer-contact">
          <img
            src="/src/assets/icons/mail-at-sign-01-stroke-rounded.svg"
            alt="email"
            className="footer-icon"
          />
          <p className="footer-contact-info">harmonyheights@gmail.com</p>
        </div>
        <div className="footer-about">
          <p className="footer-title">About</p>
          <p className="footer-info">[info about Harmony]</p>
        </div>
        <div className="footer-promotion">
          <p>Sign up for promotions:</p>
          <input
            type="email"
            placeholder="Enter email"
            className="footer-input"
          />
        </div>
      </div>

      <div className="footer-socials">
        <Link to="https://www.facebook.com/">
          <img
            src="/src/assets/icons/facebook-02-stroke-rounded.svg"
            alt="facebook"
            className="footer-social-icon"
          />
        </Link>
        <Link to="https://www.instagram.com/accounts/login/?hl=en">
          <img
            src="/src/assets/icons/instagram-stroke-rounded.svg"
            alt="instagram"
            className="footer-social-icon"
          />
        </Link>
        <Link to="https://x.com/i/flow/login">
          <img
            src="/src/assets/icons/new-twitter-stroke-rounded.svg"
            alt="twitter"
            className="footer-social-icon"
          />
        </Link>
        <Link to="https://www.tiktok.com/login">
          <img
            src="/src/assets/icons/tiktok-stroke-rounded.svg"
            alt="tiktok"
            className="footer-social-icon"
          />
        </Link>
      </div>

      <div className="footer-links">
        <p>
          <Link to="/terms-and-conditions" className="footer-link">
            Terms and Conditions
          </Link>
        </p>
        <p>
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
export default Footer