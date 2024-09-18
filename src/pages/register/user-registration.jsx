import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.userAuthentication);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCheckbox(checked);
    } else {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "username":
          setUsername(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "confirmPassword":
          setConfirmPassword(value);
          break;
        case "role":
          setRole(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (role === "user" && !checkbox) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      await dispatch(registerUser({ email, password, username, role })).unwrap();
      alert("Registration successful!");
      navigate('/user-login')
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <Logo />
      </header>
      <div>
        <Link to="/user-login">
          <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
        </Link>
      </div>
      <div>
        <form className="user-registration-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>User Registration</legend>
            <div>
              <label htmlFor="username">Username</label>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={username}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                value={confirmPassword}
              />
            </div>
            <div>
              <legend>Role</legend>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={handleChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
            {role === "user" && (
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={checkbox}
                    onChange={handleChange}
                  /> I agree to the <Link to="/terms">Terms and Conditions</Link>.
                </label>
              </div>
            )}
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
