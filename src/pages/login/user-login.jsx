import { Link,useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
function UserLogin(){
    const navigate = useNavigate();
    navigate("/user-dashboard");
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
                
              <form className="user-login-form">
            <fieldset>
                <legend>
                    User Login
                </legend>
                <input className="username" type="text" placeholder="Username" name="username" autoComplete="off" />
    <input className="password" type="password" placeholder="Password" name="password" autoComplete="no"/>
   
                <button> <Link to="/user-dashboard">
            Login
            </Link></button>
                No account?  <Link to="/user-registration"> Create one </Link>
            </fieldset>
        </form>   

        Forgot Password? <Link> Reset </Link>
            </div>
       
                </div>
    )
}
export default UserLogin