
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function UserLoginBooking() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();  

  const { checkIn, checkOut, roomId, guests } = location.state || {};

  const { loading, error: authError, user } = useSelector(
    (state) => state.userAuthentication
  );

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

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
    setError("");

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      alert("Login successful!");

  
      navigate("/summary", {
        state: {
          checkIn,
          checkOut,
          roomId,
          guests,
        },
      });
    } catch (err) {
      setError("Login failed. Please try again.");
      return;
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <button type="submit">
              {loading ? "Logging in..." : "Login"}
            </button>
            No account? <Link to="/user-registration">Create one</Link>
            <p>Forgot password? <Link to="/forgot-password">Reset</Link></p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default UserLoginBooking;
