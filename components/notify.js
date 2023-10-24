  import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
export default  function Notify(props){

const type = props.type;

  const msg = props.message; 

    const isProgress = props.isProgress;

    const notify = () => { toast[type](` ${msg}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar:!isProgress ,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
return;
                         };
    return (
      <div>
      <p style={{display:'none'}}> {notify()} </p>
        <ToastContainer />
      </div>
    );
  }
