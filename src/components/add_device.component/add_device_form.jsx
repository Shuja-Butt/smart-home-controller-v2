import React,{useState}  from 'react'
import {useMsal,useAccount} from '@azure/msal-react'
import { InteractionRequiredAuthError} from "@azure/msal-browser"
import {protectedResources} from '../../authConfig'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'; 
import './add_device_form.css'
import 'tachyons'




const AddDeviceForm = ({displayHandler,upDateDevices})=> {   

   const  {category}= useParams();
   console.log(category,"adddddd")
   const navigate = useNavigate()



 
  const { instance, accounts, inProgress } = useMsal();
  
  const account = useAccount(accounts[0] || {});


  const [deviceInfo,setDeviceInfo] = useState({
    name:"",
    description:"",
    // category:"lightning",
    // user,
    // status
    type:"",
    // ip:""//may be later
    
})


 const  onInputChange=(event)=>{
    setDeviceInfo({...deviceInfo,[event.target.name]:event.target.value})
  }

 const handleSubmit=async (event)=>{


  if (account && inProgress === "none" ) {
    // aquare an access token to access the express-api that will be used as 
    // bearer token to request the api
    instance.acquireTokenSilent({
        scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
        account: account// get access token for this account
    }).then((response) => {

        console.log(response,"see the response")

        // window.alert(`access token recieved ${response.accessToken}`);

        fetch(`http://localhost:5000/device/addnew`,{

            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'authorization':`Bearer ${response.accessToken}`
            },
            body:JSON.stringify({...deviceInfo,category:category,user:response.uniqueId,status:"inactive"})

        
        }).then(res=>res.json())
        .then(data=>{
          
          upDateDevices(data)
          navigate(-1)//go back to prev route or url
        
        
        })


        // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
        //     .then(response => setHelloData(response));



    }).catch((error) => {
        //if acquireTokenSilent fails then it requires interactive methods to get the access token
        if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
                instance.acquireTokenPopup({
                    scopes: protectedResources.smartHomeAPI.scopes,
                }).then((response) => {
                    // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                    //     .then(response => setHelloData(response));
                    console.log("Call the Express API")
                }).catch(error => console.log(error));
            }
        }
        console.log(error)

       

    });
}

  }

    
        return(
        <div className="custom">
        <article style={{backgroundColor: '#FFFFFF',flexDirection:'column'}}className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center ">
        <span   onClick={()=>navigate(-1)} className="cross">&Chi;</span>
        <main className="pa4 black-80" style={{paddingTop:0}}>
          <div className="measure">
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="age">Description</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="description"
                  id="age"
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Type</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="type"
                  id="pet"
                  onChange={onInputChange}
                />
              </div>

            <div className="buttons_container">
            <div className="Update">
              <input
                className="b ph3 pv2 input-reset ba  grow pointer f6 dib"
                type="submit"
                value="Add"
                onClick={handleSubmit}
              />
            </div>
            
            <div className="Cancel">
              <input
                className="b ph3 pv2 input-reset ba   grow pointer f6 dib"
                type="submit"
                value="Cancel"
                onClick={()=>navigate(-1)}
              />
            </div>
            </div>
          </div>
        </main>
      </article>
      </div>
        )
    


}


export default AddDeviceForm;




















