import { Link } from "react-router-dom";
import Logo from "../../components/logo";


function AdminRegister(){
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
  <form className="admin-registration-form" >
<fieldset>
    <legend>
        Admin Registration
    </legend>
    <input className="username" type="text" placeholder="Username" name="username" autoComplete="no" /> <br />
    <input className="email" type="email" placeholder="Email" name="email" autoComplete="no" /> <br />
    <input className="password" type="password" placeholder="Password" name="password" autoComplete="no"/> <br />
    <input className="confirm-password" type="password" placeholder="Confirm Password" name="confirm-password" autoComplete="no" /> <br />
    <button>Register</button>
</fieldset>
</form>   
</div>

    </div>  
    )
}
export default AdminRegister
