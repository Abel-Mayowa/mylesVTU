
import { FloatingWhatsApp } from 'react-floating-whatsapp'

import React, { forwardRef,useEffect } from 'react';

const Support = (props) => {
  const {showSupport,setShowSupport} = props.show;
const {idleTime,setIdleTime} = props.idleTime;


  const closeWidget = ()=>{

    setShowSupport(false)
  }

  return (
    <FloatingWhatsApp 
      phoneNumber={"2349060421393"}
      accountName={"MayorTechz"}
      chatboxHeight={400}
      statusMessage={"I reply in less than a minute. Lodge (your complaints,buy data manually etc"}
notificationSound={true}
    notificationSoundSrc={"./alert.wav"}  
darkMode={false}
chatMessage={"Hi 😇 \nI am Mayor!! \n How can  help you please"}
    avatar={"./user_one.jpg"}  
        allowClickAway={true}
      onClose={closeWidget}
     className={"floating-whatsapp"}
    />
  )

}

export default Support;
