import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { Link, useNavigate } from "react-router-dom";


function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError, isLoggedIn } = useSelector((state) => state.userAuthentication);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user-dashboard");
    }
    if (authError) {
      setError(authError);
    }
  }, [authError, isLoggedIn, navigate]);

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
      setError("Both fields are required!");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/user-dashboard"); // Redirect to home after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="user-login-container">
      <header className="user-login-header">
        <Logo />
      </header>
      <main className="user-login-main">
        <form className="user-login-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="user-login-legend">User Login</legend>
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
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </fieldset>
        </form>
        <div className="user-login-footer">
          <Link to="/user-registration" className="register-link">Don't have an account? Register</Link>
          <Link to="/forgot-password" className="reset-password-link">Forgot Password?</Link>
        </div>
      </main>
    </div>
  );
}

export default UserLogin;
