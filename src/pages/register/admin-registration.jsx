import { Link } from "react-router-dom";
import Logo from "../../components/logo";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUserRegistration } from "../../redux-state-management/features/authentication-reducer";

function AdminRegister(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value,username } = e.target;
     if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    else if (username === "username") {
      setUsername(value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username && !email && !password) {
      alert(" Your username, email and password are required!");
      return;
    }
    dispatch(setUserRegistration(email, password));
  };
    return(
      <div>
        <header>
        <Logo/> 
        
        </header>

<div>
<Link to="/admin-login">
            <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
        </Link>
</div>
<div>
  <form className="admin-registration-form" onSubmit={handleSubmit}>
<fieldset>
    <legend>
        Admin Registration
    </legend>
    <input className="username" type="text" placeholder="Username" name="username" autoComplete="no" onChange={handleChange} /> <br />
    <input className="email" type="email" placeholder="Email" name="email" autoComplete="no" onChange={handleChange} /> <br />
    <input className="password" type="password" placeholder="Password" name="password" autoComplete="no" onChange={handleChange}/> <br />
    <input className="confirm-password" type="password" placeholder="Confirm Password" name="confirm-password" autoComplete="no" onChange={handleChange}/> <br />
    <button>Register</button>
</fieldset>
</form>   
</div>

    </div>  
    )
}
export default AdminRegister
