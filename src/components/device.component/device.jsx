
import './device.css'
import {Link,useNavigate} from 'react-router-dom';

const Device=({url,category})=>{
    let navigate = useNavigate()
 


    return (
      
                   
                    <div onClick={()=>navigate(`${category.toLowerCase()}`)}  className="device-category-container">
                        <div className="device-category-backgroud-image-container"   style={{backgroundImage:`url(${url})`}}>
                          
                        </div>
                        <div className="device-category-tag-container">
                           {/* <Link to={`${category}`}>{category}</Link> */}
                           {category}
                        </div>
                    </div>


    )
}

export default Device;