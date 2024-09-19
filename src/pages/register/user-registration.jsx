import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '/src/pages/register/register.css'

function UserRegister() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();
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
      navigate('/user-login');
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="user-register-container">
      <header className="user-register-header">
        <Logo />
      </header>
      <div className="user-register-back-link">
        <Link to="/user-login">
          <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" className="user-register-back-icon" />
        </Link>
      </div>
      <main className="user-register-main">
        <form className="user-registration-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="user-registration-legend">User Registration</legend>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={username}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                value={confirmPassword}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <legend className="form-legend">Role</legend>
              <label className="role-label">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={handleChange}
                  className="role-radio"
                />
                User
              </label>
              <label className="role-label">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={handleChange}
                  className="role-radio"
                />
                Admin
              </label>
            </div>
            {role === "user" && (
              <div className="form-group">
                <label className="terms-label">
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={checkbox}
                    onChange={handleChange}
                    className="terms-checkbox"
                  />
                  I agree to the <Link to="/terms-and-conditions" className="terms-link">Terms and Conditions</Link>.
                </label>
              </div>
            )}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default UserRegister;
