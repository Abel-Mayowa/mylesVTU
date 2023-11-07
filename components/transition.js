import { InfinitySpin } from "react-loader-spinner";
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";

export default function Transition() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} className="">
        <InfinitySpin
          width='200'
          color="#657ce0"
        />
      </div>
      <NavbarBottom />
    </>
  )
}
