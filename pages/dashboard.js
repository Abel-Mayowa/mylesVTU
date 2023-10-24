import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Wallet from '../components/wallet';
import Menu from '../components/menu';
import Transactions from '../components/transactions';
import Adverts from '../components/adverts';
import NavbarBottom from '../components/navbarBottom';
import Support from '../components/support';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import Data from '../components/data';
import { Box, Button, Center, ChakraProvider, Text ,Container} from '@chakra-ui/react';
import { FiFrown } from "react-icons/fi";
import Link from "next/link";
import {useRecoilValue,useSetRecoilState} from "recoil";
import{loginStatus,userData} from "../components/recoil"
import {useRouter} from "next/router";


  
export default function Dashboard() {

const [isLoading,setLoading] = useState(false);
  
  const logged = useRecoilValue(loginStatus);
  
  const setLogged = useSetRecoilState(loginStatus);

  const setData = useSetRecoilState(userData);

  const router = useRouter();
  
  useEffect(() => {

    const url = 'https://mtstorez.000webhostapp.com/app/store/welcome';

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      crossDomain: true,
      success: function (r, status, xhr) {
        //setBtnLoading(false);
       
        //setCsrf(r.token);
        if (r.data.isLogged) {
          setLogged(r.data.isLogged);
          
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle });
        }
  },
      error: function () {
        showAlert("Server is down","warning");
       // setBtnLoading(false);
      },
    });
  }, [setLogged,setData]);
  
const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      //autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  
    //setBtnLoading(false);
  };

//showAlert(props,"warning")
  
const spin = ()=>{
  
  setLoading(true)
}

  useEffect(()=>{
    if(isLoading){

     const set = setTimeout(()=>{
        
      },2500)

return()=> clearTimeout(set)
    }
  },[isLoading,setLoading])

  if(!logged){

   // showAlert("You cannot view this page because you are not logged in","warning");

    
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Box m={1} p={3}  textAlign="center">
            <Center m={5}><FiFrown textAlign="center" size={50} color="gray" /></Center>
  <Text fontSize="xl" fontWeight="bold" color="#657ce0" mb={4}>
              You cannot view this page because you are not logged in
            </Text>
            <Link href="/login">
  <Button isLoading={isLoading} onClick={spin} colorScheme="blue" size="lg">
              
Log In
    </Button>
            </Link>
          </Box>
          <ToastContainer/>
    
        </Center>
      </ChakraProvider>
    );
  }

  
  
  //const { logged, setLogged } = props.logged;
  //const { csrf, setCsrf } = props.csrf;
//  const  data = useRecoilValue(userData);

  
//  const profile = data.profile;
  //const bundle = data.dataBundle;
//  const navigate = useNavigate();
 // console.log("dashboard data is ",data)



  return (
    <Container textAlign="center" h="100vh">

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>


        <Header />  
<div style={{ flex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Wallet />
            <Menu />
            <Transactions  />
          </div>
        </div>
        <NavbarBottom />
      </div>
    </Container>
  );
}
