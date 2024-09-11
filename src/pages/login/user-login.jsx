import { Link,useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux-state-management/features/authentication-reducer";
import { useState } from "react";

function UserLogin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();

    
  const handleChange = (e) => {
    const { name, value } = e.target;
     if (name === "email") {
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
    dispatch(setUserLogin(email, password));
  };
    return(
        <div>

        <header>
        <Logo />
       
        </header>

            <div>
            <Link to="/">
                        <img src="/src/assets/icons/link-backward-stroke-rounded.svg" alt="Back" />
                    </Link>
            </div>
            <div>
                
              <form className="user-login-form"  onSubmit={handleSubmit}>
            <fieldset>
                <legend>
                    User Login
                </legend>
                <input className="username" type="text" placeholder="Username" name="username" autoComplete="off"  onChange={handleChange} />
    <input className="password" type="password" placeholder="Password" name="password" autoComplete="no"  onChange={handleChange}/>
   
                <button onSubmit={handleSubmit}> 
            Login
            </button>
                No account?  <Link to="/user-registration"> Create one </Link>
            </fieldset>
        </form>   

        Forgot Password? <Link> Reset </Link>
            </div>
       
                </div>
    )
}
export default UserLogin