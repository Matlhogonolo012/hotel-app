import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux-state-management/features/authentication-reducer";
import { fetchUserRole } from "/src/redux-state-management/features/authorization-reducer.jsx";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error: authError, user } = useSelector((state) => state.userAuthentication);
  const { role, loading: roleLoading } = useSelector((state) => state.userAuthorization);

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
    } catch (err) {
      setError("Login failed. Please try again.");
      return; 
    }
  };

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchUserRole(user.uid));
    }
  }, [user.uid, dispatch]);

  useEffect(() => {
    if (role && !roleLoading) {
      if (role === 'admin') {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [role, roleLoading, navigate]);

  return (
    <div>
      <header>
        <Logo />
      </header>
      <div>
        <Link to="/user-register">
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
            <button type="submit" >
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

export default UserLogin;
