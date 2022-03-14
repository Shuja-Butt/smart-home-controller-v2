// import { ReactComponent as Logo} from '../../assets/logo.svg'
import { ReactComponent as AltLogo} from '../../assets/altlogo.svg'
import './navbar.css'
import { useIsAuthenticated } from "@azure/msal-react";

const  Navbar=()=>{
  const isAuthenticated = useIsAuthenticated();

    return (

        <div className="navbar-container">
            <div className="navbar-logo-container">
                <AltLogo className="logo" />
            </div>
            <div className="navbar-links-container">
                {
                    isAuthenticated?
                     "Signout"
                     :"Signin"

                }
                <span>CONTACT</span>
                <span>SERVICES</span>
                <span>ABOUT</span>
            </div>
        </div>
    )
}

export default Navbar;
