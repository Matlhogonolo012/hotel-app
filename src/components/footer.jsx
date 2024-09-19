import { Link } from "react-router-dom"

function Footer(){
    return(
        <div>
<div>
          <p>RESERVATIONS</p>
          <div>
            <img
              src="/src/assets/icons/telephone-stroke-rounded.svg"
              alt="tel"
            />
            <p>+27 813 684 688</p>
          </div>
          <div>
            <img
              src="/src/assets/icons/mail-at-sign-01-stroke-rounded.svg"
              alt="email"
            />
            <p>harmonyheights@gmail.com</p>
          </div>
        </div>
        <div>
          <p>HOTEL RECEPTION</p>
          <div>
            <img
              src="/src/assets/icons/telephone-stroke-rounded.svg"
              alt="tel"
            />
            <p>+27 813 684 688</p>
          </div>
          <div>
            <img
              src="/src/assets/icons/mail-at-sign-01-stroke-rounded.svg"
              alt="email"
            />
            <p>harmonyheights@gmail.com</p>
          </div>
          <div>
            <p>About</p>
            <p>[info about Harmony ]</p>
          </div>
          <div>
            <p>sign up for promotions:</p>
            <input type="email" name="" id="" placeholder="Enter email" />
          </div>
        </div>  
        <div>
          <Link to="https://www.facebook.com/">
           <img src="/src/assets/icons/facebook-02-stroke-rounded.svg" alt="facebook" />
          </Link>
           <Link to="https://www.instagram.com/accounts/login/?hl=en">
           <img src="/src/assets/icons/instagram-stroke-rounded.svg" alt="instagram" />
            </Link>
            <Link to="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJteCI6IjIifQ%3D%3D%22%7D">
             <img src="/src/assets/icons/new-twitter-stroke-rounded.svg" alt="twitter" />
            </Link>
           
            <Link to= "https://www.tiktok.com/login">
             <img src="/src/assets/icons/tiktok-stroke-rounded.svg" alt="tiktok" />
            </Link>
           
        </div>
        <div>
          
          <p><Link to="/terms-and-conditions">Terms and Conditions</Link></p>
          
          
          <p> <Link to="/privacy-policy">Privacy Policy  </Link></p>
        </div>
      
        </div>
    )
}
export default Footer