import './homepage.css'
import Signin from '../../components/signin.component/signin'
import Signout from '../../components/signout.component/signout'
import {AuthenticatedTemplate,UnauthenticatedTemplate} from '@azure/msal-react'

const HomePage =()=>{
    return (
        <div className="homepage-container">
            <div>
                <h1>A better home is a smart home</h1>
                <UnauthenticatedTemplate>
                    <div className ="buttons-container">
                        <Signin/>
                        <Signout/>
                    </div>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  Go to Devices
                </AuthenticatedTemplate>
            </div>
        </div>
    )
}

export default HomePage;