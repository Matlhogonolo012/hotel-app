// import { useDispatch } from "react-redux";
// import  userAuthSlice  from "../../redux-state-management/features/authentication-reducer";
// import Logo from "../../components/logo";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// function ForgotPassword() {
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         try {
//             setError("");
//             await dispatch(userAuthSlice (email));
//         } catch (error) {
//             setError("Reset password failed. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <header>
//                 <Logo />
//             </header>
//             <div>
//                 <Link to="/user-login">
//                     <img 
//                         src="/src/assets/icons/link-backward-stroke-rounded.svg" 
//                         alt="Back" 
//                     />
//                 </Link>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <fieldset>
//                     <legend>
//                         Please enter your email to reset password
//                     </legend>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <input 
//                         type="email" 
//                         placeholder="Enter Email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                     />
//                     <br />
//                     <button type="submit">
//                         Reset
//                     </button> 
//                 </fieldset>
//             </form>
//         </div>
//     );
// }

// export default ForgotPassword;
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux-state-management/features/authentication-reducer";
import Logo from "../../components/logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.userAuthentication);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!email) {
      setError("Email is required!");
      return;
    }

    try {
      await dispatch(resetPassword(email)).unwrap();
      // Show success message
      alert("Password reset email sent!");
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
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
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Reset Password</legend>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Reset'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ForgotPassword;
