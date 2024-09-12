import { Link,useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { useState } from "react";
import { useDispatch } from "react-redux";

function AdminLogin() {
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
            navigate("/admin-dashboard");
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
          <img
            src="/src/assets/icons/link-backward-stroke-rounded.svg"
            alt="Back"
          />
        </Link>
      </div>
      <div>
      
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Admin Login</legend>
            <input
              className="username"
              type="text"
              placeholder="Username"
              name="username"
              autoComplete="off"
             onChange={handleChange}
            /> <br />
            <input
              className="password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="no"
              onChange={handleChange}
            /> <br />
            <button > <Link to="/admin-dashboard">
            Login
            </Link></button> <br />
                 No account?  <Link to="/admin-registration"> Create one </Link> 
            <p> Forgot password? <Link to="/forgot-password">Reset</Link>
              </p>
          </fieldset>
        </form>
  
      </div>
    </div>
  );
}
export default AdminLogin;
