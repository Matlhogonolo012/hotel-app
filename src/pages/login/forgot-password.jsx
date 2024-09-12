import { useDispatch } from "react-redux";
import { setResetPassword } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setError("");
            await dispatch(setResetPassword(email));
        } catch (error) {
            setError("Reset password failed. Please try again.");
        }
    };

    return (
        <div>
            <header>
                <Logo />
            </header>
            <div>
                <Link to="/user-login">
                    <img 
                        src="/src/assets/icons/link-backward-stroke-rounded.svg" 
                        alt="Back" 
                    />
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                        Please enter your email to reset password
                    </legend>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br />
                    <button type="submit">
                        Reset
                    </button> 
                </fieldset>
            </form>
        </div>
    );
}

export default ForgotPassword;
