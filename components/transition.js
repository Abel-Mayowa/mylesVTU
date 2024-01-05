import { Watch } from "react-loader-spinner";
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";

export default function Transition() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} className="">
      <Watch
  visible={true}
  height="80"
  width="80"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
      <NavbarBottom />
    </>
  )
}
