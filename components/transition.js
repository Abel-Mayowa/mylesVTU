import {InfinitySpin} from "react-loader-spinner";

export default function Transition (){
  return(

  <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}} className="">
  
    <InfinitySpin 
      width='200'
      color="#657ce0"
    />
    
    </div>
    )
}