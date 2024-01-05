import { HourGlass } from "react-loader-spinner";
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";

export default function Transition() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} className="">
      <HourGlass 
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#306cce', '#72a1ed'] />
      </div>
      <NavbarBottom />
    </>
  )
}
