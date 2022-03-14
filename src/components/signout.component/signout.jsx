import CustomButton from "../custombutton.component/custombutton";
import {useMsal} from "@azure/msal-react";


//function to handle signout
const handleSignout=async (instance)=>{

    try{
    const res = await  instance.logoutPopup()

    console.log(res,"signout res is")
    }
    catch(e){

        console.log(e,"Some Error Occured during signout/logout process")


    }
}

const Signout = ()=>{

    const {instance} = useMsal();

    return (

        <CustomButton  signout onClick={()=>handleSignout(instance)} >
         Sign Out
        </CustomButton>
    )
}

export default Signout;




