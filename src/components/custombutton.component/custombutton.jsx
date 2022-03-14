import "./custombutton.css"


const CustomButton =({children,signin,signout,remove,configure,onClick,...props})=>{


    return(

        <button className={
            `${signin?"sigin-button":signout?"signout-button":remove?"remove-button":configure?"configure-button":"add-device-button"}   default-buttons-style`
            }
             onClick={onClick} {...props} >{children}</button>

    )


}

export default CustomButton