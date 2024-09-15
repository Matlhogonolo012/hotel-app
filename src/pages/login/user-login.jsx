// import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../components/logo";
// import { useDispatch } from "react-redux";
// import  userAuthSlice  from "../../redux-state-management/features/authentication-reducer";
// import { useState } from "react";

// function UserLogin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "email") {
//             setEmail(value);
//         } else if (name === "password") {
//             setPassword(value);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!email || !password) {
//             alert("Email and password are required!");
//             return;
//         }

//         try {
//             await dispatch(userAuthSlice(email, password));
//             navigate("/user-dashboard");
//         } catch (error) {
//             alert("Login failed! Please check your credentials.");
//         }
//     };

//     return (
//         <div>
//             <header>
//                 <Logo />
//             </header>

//             <div>
//                 <Link to="/">
//                     <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
//                 </Link>
//             </div>

//             <div>
//                 <form className="user-login-form" onSubmit={handleSubmit}>
//                     <fieldset>
//                         <legend>User Login</legend>
//                         <input
//                             className="email"
//                             type="email"
//                             placeholder="Email"
//                             name="email"
//                             autoComplete="off"
//                             onChange={handleChange}
//                         />
//                         <input
//                             className="password"
//                             type="password"
//                             placeholder="Password"
//                             name="password"
//                             autoComplete="off"
//                             onChange={handleChange}
//                         />
//                         <button type="submit">Login</button>
//                         No account? <Link to="/user-registration">Create one</Link>
//                     </fieldset>
//                 </form>

//                 Forgot Password? <Link to="/forgot-password">Reset</Link>
//             </div>
//         </div>
//     );
// }

// export default UserLogin;
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      // Handle successful login, e.g., redirect or show a success message
      alert("Login successful!");
      navigate("/user-dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };


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
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            No account?  <Link to="/user-registration"> Create one </Link> 
            <p> Forgot password? <Link to="/forgot-password">Reset</Link>
              </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
