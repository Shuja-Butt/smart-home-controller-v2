import {devices} from '../../mockdata';
import Device from '../device.component/device';
import './device_categories.css';


const DeviceCategoriesContainer =()=>{



    return (
      <div className="homeregistration-container">
        <div className="homeregistration-heading-container">
            <h1>Register your devices </h1>
        </div>
        <div  className="device-categories-container">
        {

            Object.keys(devices).map((key)=>{
              //  return <> <Link to={`${key.toLowerCase()}`}  ><Device  category={key} url={devices[key].imageurl}/></Link></>
              return <Device  category={key} url={devices[key].imageurl}/>
            
            })
            }

        </div>

      </div>
    )
} 

export default DeviceCategoriesContainer;