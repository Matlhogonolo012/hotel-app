import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux-state-management/features/authentication-reducer";
import { useState } from "react";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }

        try {
            await dispatch(setUserLogin(email, password));
            navigate("/user-dashboard");
        } catch (error) {
            alert("Login failed! Please check your credentials.");
        }
    };

    return (
        <div>
            <header>
                <Logo />
            </header>

            <div>
                <Link to="/">
                    <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
                </Link>
            </div>

            <div>
                <form className="user-login-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>User Login</legend>
                        <input
                            className="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <button type="submit">Login</button>
                        No account? <Link to="/user-registration">Create one</Link>
                    </fieldset>
                </form>

                Forgot Password? <Link to="/forgot-password">Reset</Link>
            </div>
        </div>
    );
}

export default UserLogin;
