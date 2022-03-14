import {useState,useEffect} from 'react';
import './device_registration.css';
import {useMsal,useAccount} from '@azure/msal-react'
import {Routes,Route} from 'react-router-dom';
// import {devices} from '../../mockdata';
import {useParams} from 'react-router-dom'; 
import CustomButton from '../custombutton.component/custombutton'
import {protectedResources} from '../../authConfig'
import Modal from '../modal.component/modal'
// import AddDeviceForm from '../../components/add_device.component/add_device'
import { InteractionRequiredAuthError} from "@azure/msal-browser";
import AddDeviceForm from '../add_device.component/add_device_form';
import UpdateDeviceForm from '../update_device.component/update_device_form';
import RemoveDeviceForm from '../remove_device.component/remove_device_form';
import { useNavigate } from "react-router-dom";

const DeviceRegistration =()=>{

    //useParams hook to access the query parameter in urlor route
    const {category} = useParams()
    const [devices,setDevices] = useState([])

    const { instance, accounts, inProgress } = useMsal();


    const account = useAccount(accounts[0] || {});
    const navigate = useNavigate();

    // console.log("account is",account,"useAccount hook")
    // console.log("accounts is",accounts)




    const renderUpdateForm=(deviceData)=>{
        navigate('configure',{state:deviceData})
    }
    const renderAddDeviceForm=()=>{
        navigate('add')
    }
    const renderDeleteForm=(deviceData)=>{
        navigate('remove',{state:deviceData})
    }








    useEffect(() => {

        console.log("device registarrtion is called useEffect")

        if (account && inProgress === "none" ) {
            // aquare an access token to access the express-api that will be used as 
            // bearer token to request the api
            instance.acquireTokenSilent({
                scopes: protectedResources.smartHomeAPI.scopes,//scopes for protected API
                account: account// get access token for this account
            }).then((response) => {

                console.log(response,"see the response")

                // window.alert(`access token recieved ${response.accessToken}`);

                fetch(`http://localhost:5000/devices/${category}`,{

                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization':`Bearer ${response.accessToken}`
                    }

                
                }).then(res=>res.json())
                .then(data=>setDevices(data))


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
    }, [account, inProgress, instance]);
  






    return (

        
        // Object.keys(currentDevices).length?

        <div className="device-registartion-container">
                   <div className="homeregistration-heading-container">
            <h1>{category}</h1>
        </div>

            {
            devices.map((device)=>{
                return <div className="device-registartion">
                           <div className="device-registartion-title-container">
                             <span>{device.name}</span>
                            </div>
                            <div className="device-registartion-actions-container">
                                <span>{device.status}</span>
                                <CustomButton onClick={()=>renderDeleteForm(device)} remove={true}>Remove </CustomButton>
                                <CustomButton onClick={()=>renderUpdateForm(device)} configure={true}  >Configure</CustomButton>

                            </div>
                     </div>
            })
            }
             <CustomButton onClick={()=>renderAddDeviceForm()}  name="add_a_device" addDevice={true}>
                 Add a new device 
                 </CustomButton>
            <Routes>
                <Route path="/add" element={<Modal><AddDeviceForm  upDateDevices={setDevices} /></Modal>} />
                <Route path="/remove" element={<Modal><RemoveDeviceForm  upDateDevices={setDevices} /></Modal>} />
                <Route path="/configure" element={<Modal><UpdateDeviceForm  upDateDevices={setDevices} /></Modal>} />
            </Routes>
        </div>







        
     
    )
} 

export default DeviceRegistration;