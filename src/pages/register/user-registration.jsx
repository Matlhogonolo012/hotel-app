import { Link } from "react-router-dom";
import Logo from "../../components/logo";

function UserRegister(){

    return(
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
  <form className="user-registration-form">
<fieldset>
    <legend>
       User Registration
    </legend>
    <input className="username" type="text" placeholder="Username" name="username" autoComplete="no" />
    <input className="email" type="email" placeholder="Email" name="email" autoComplete="no" />
    <input className="password" type="password" placeholder="Password" name="password" autoComplete="no"/>
    <input className="confirm-password" type="password" placeholder="Confirm Password" name="confirm-password" autoComplete="no" />
    <button>Register</button>
    <label htmlFor=""><input type="checkbox" name="checkbox" id="checkbox" /> I agree to the <Link> Terms and Conditions </Link> and I am at least 18 years of age.

        
    </label>
    
</fieldset>
</form>   
</div>

    </div>  
    )
}
export default UserRegister
