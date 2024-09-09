import { Link,useNavigate } from "react-router-dom";
import Logo from "../../components/logo";

function AdminLogin() {
    const navigate = useNavigate();
    navigate("/admin-dashboard");
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
      
        <form >
          <fieldset>
            <legend>Admin Login</legend>
            <input
              className="username"
              type="text"
              placeholder="Username"
              name="username"
              autoComplete="off"
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="no"
            />
            <button > <Link to="/admin-dashboard">
            Login
            </Link></button>
            Don't have an account? <Link to="/admin-registration"> Register </Link>
          </fieldset>
        </form>
        No account?  <Link to="/admin-registration"> Create one </Link>
      </div>
    </div>
  );
}
export default AdminLogin;
