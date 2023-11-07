import { FloatingWhatsApp } from 'react-floating-whatsapp';
import React from 'react';

const Support = (props) => {
  const { showSupport, setShowSupport } = props.show;
  const { idleTime, setIdleTime } = props.idleTime;

  const closeWidget = () => {
    setShowSupport(false);
  }

  return (
    <>
      <div style={{ zIndex: 9999999 }}>
        <FloatingWhatsApp
          phoneNumber={"2347014443158"}
          accountName={"MylesVTU"}
          chatboxHeight={400}
          statusMessage={"I reply in less than a minute. Lodge (your complaints, buy data manually, etc)"}
          notificationSound={true}
          notificationSoundSrc={"../alert.wav"}
          darkMode={false}
          chatMessage={"Hi 😇 \nI am Myles!! \n How can I help you, please"}
          avatar={"../user.png"}
          allowClickAway={true}
          onClose={closeWidget}
          className={"floating-whatsapp"}
        />
      </div>
    </>
  )
}

export default Support;
