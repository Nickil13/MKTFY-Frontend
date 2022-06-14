import React from 'react'
import { useNavigate } from 'react-router-dom';
import closeIcon from "../assets/images/icon_close.svg";
import backIcon from "../assets/images/icon_right_arrowhead.svg";
import { useModalContext } from '../context/ModalContext';

export default function ModalWrapper({goBack, children}) {
    let navigate = useNavigate();
    const {setShowModal} = useModalContext();
  return (
    <div className="relative flex flex-col items-center bg-white w-4/5 max-w-3xl  my-auto py-16 px-32 rounded-modal shadow-modal">{children}<span
    className="absolute top-7 right-7 cursor-pointer"
    onClick={() => setShowModal(false)}
>
    <img src={closeIcon} alt="close x icon" />
</span>
{goBack && <span className="absolute top-7 left-7 cursor-pointer" onClick={()=>navigate(-1)}> <img src={backIcon} alt="back arrow icon" />
</span>}</div>
  )
}
