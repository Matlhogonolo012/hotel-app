import { Link } from "react-router-dom";
import Logo from "../../components/logo";
import { useDispatch } from 'react-redux';
import { setUserRegistration } from "../../redux-state-management/features/authentication-reducer";
import { useState } from "react";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCheckbox(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    if (!checkbox) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    dispatch(setUserRegistration(email, password));
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
            <input
              onChange={handleChange}
              className="email"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="no"
            /> <br />
            <input
              onChange={handleChange}
              className="password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="no"
            />
            <br />
            <button type="submit">Register</button> <br />
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                checked={checkbox}
                onChange={handleChange}
              /> I agree to the <Link to="/terms">Terms and Conditions</Link> and I am at least 18 years of age.
            </label>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
