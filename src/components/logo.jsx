import { Link } from "react-router-dom";


function Logo() {
    return (
        <div className="logo-container">
            <Link to="/">
                <img
                    src="/src/assets/hotel-app-images/logo.png"
                    alt="logo"
                    className="logo-image"
                    height="100px"
                    width= "100px"
                />
            </Link>
        </div>
    );
}

export default Logo;
