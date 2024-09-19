import { Link } from "react-router-dom";
import '/src/components/logo.css'

function Logo() {
    return (
        <div className="logo-container">
            <Link to="/">
                <img
                    src="/src/assets/hotel-app-images/logo.png"
                    alt="logo"
                    className="logo-image"
                />
            </Link>
        </div>
    );
}

export default Logo;
