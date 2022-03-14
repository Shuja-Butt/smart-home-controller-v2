import { useEffect } from "react";
import { createPortal } from "react-dom";

const modal_root = document.getElementById("modal-root");
console.log(modal_root)
const Modal =({children})=>{
   const el =  document.createElement("div")

    useEffect(() => {

        modal_root.appendChild(el)
        return () => {
            modal_root.appendChild(el)
        }
    }, [el])

    return createPortal(children,modal_root)
}

export default Modal;