import CustomButton from "../custombutton.component/custombutton";
import {useMsal} from "@azure/msal-react";
import {b2cPolicies} from '../../authConfig';
import {EventType } from "@azure/msal-browser";
import {useEffect} from 'react';


//handles user sign in 
const handleSignIn= async (instance)=>{


    try{

     const res =    await  instance.loginPopup({})
     console.log(res,"The login response ")

    }
    catch(e)
    {
       console.log(e,"Some error occured during the login process")
    }

}

const Signin = ()=>{
    const {instance,accounts} = useMsal();

    console.log(accounts,"accounts")

    // Instead, use useEffect. The function passed to useEffect will run after the render is committed 
    // to the screen. Think of effects as an escape hatch from React’s purely functional world into the 
    // imperative world.
    // If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as
    //  componentDidMount, componentDidUpdate, and componentWillUnmount combined.

    // here useEffect handles "forgot user password"
    useEffect(()=>{

      //The event must be registered onlyonce


        console.log("i am useeffec in sign in")
        // Using the event API, you can register an event callback that will do something when an event is emitted
        // Here we are using Event api to register an event callback
        const callbackId = instance.addEventCallback((event)=>{
           console.log(event,"event is")
           if (event.eventType === EventType.LOGIN_FAILURE){
            //    if user has fotgot the password it throws an error 
            // When a user clicks on the forgot your password? link during sign-in, Azure AD B2C will 
            // throw an error. To initiate the password reset user-flow, you need to catch this error 
            // and handle it by sending another login request with the corresponding password reset authority
            //  string.
               if (event.error && event.error.errorMessage.indexOf("AADB2C90118")>-1){

                console.log("why 2 if ")
                 
                 instance.loginPopup(b2cPolicies.authorities.forgotPassword)
                 .catch(e => {
                     return;
                 });
               }

           }

           if (event.eventType === EventType.LOGIN_SUCCESS){

               console.log(event,"success event is")

               if (event.payload){
                // This is the name of the policy or user flow that was used to acquire the token.
                   if (event.payload.idTokenClaims["tfp"]===b2cPolicies.names.forgotPassword)
                   {
                       console.log("Password was changed succcessfully")
                     return   instance.logoutPopup()
                   }
               }

           }

        })



    //    this part  behaves as ComponendWillUnMount
       return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };

    },[instance])

    return (
    <CustomButton  signin onClick={()=>handleSignIn(instance)}>
     SignIn Or Register
    </CustomButton>
    
    )

}


export default Signin;

