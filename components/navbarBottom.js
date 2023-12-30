import React, { useState } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineFund, AiOutlineUser, AiOutlineWhatsApp,AiOutlineLogout,AiOutlinePoweroff } from 'react-icons/ai';
import Support from '../components/support';
import { useRouter } from 'next/router';
import {useRecoilValue,useSetRecoilState} from "recoil";
import {loginStatus} from "./recoil";
import $ from "jquery";



const NavbarBottom = ({switchData}) => {
  
  const [showSupport, setShowSupport] = useState(false);
  const [color, setColor] = useState();
  const [idleTime, setIdleTime] = useState(5000);
 // const {switching,setSwitching} = switchData;
  const isLogged = useRecoilValue(loginStatus);
  //const {switching,setSwitching} = props.data;
const switching = useRecoilValue(switchData);
  const setSwitching = useSetRecoilState(switchData);
  
 // const isLogged = data.isLogged;
  //alert(isLogged)
  const openSupport = () => {
    setShowSupport(true);
  };

  const router = useRouter();

  const highlights = (num) => {
    setColor(num);
  };

  const goHome = () => {
    setSwitching(true)
    highlights(1);
    router.push('/dashboard');
   // setPage("dashboard");
    ;
  };

  const fund = () => {
setSwitching(true)

    highlights(2);
    router.push('/fundWallet');
   // setPage("fund");
    
  };

  const login = () => {

    setSwitching(true)

    //highlights(2);
    router.push('/login');
   // setPage("fund");
    
  };

  const openProfile = () => {

    setSwitching(true)
    highlights(3);
    router.push('/profile');
    //setPage("profile");
  };

    const logout = () => {
setSwitching(true);
      $.ajax({
        url:        'https://mylesvtu.com.ng/app/store/logout',
        
        method: 'POST', 
      dataType:"json",
        
        success:function(response){
          
          if(response.status === 1){
           
          router.push('/login');
          }
        },
        error:function(error){
          
         console.error('Logout error:', error);
        }
      })
    };

  return (
    <>
      {showSupport && <Support show={{ showSupport, setShowSupport }} idleTime={{ idleTime, setIdleTime }} />}
      <Flex
        zIndex={9999}
        mt={18}
        bg="white"
        p={5}
        alignItems="center"
        justifyContent="space-around"
        position="fixed"
        bottom={0}
        width="100%"
        boxShadow="0px -4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box onClick={() => { goHome(); highlights(1); }} textAlign="center">
          <Icon as={AiOutlineHome} boxSize={20} color={color === 1 && '#657ce0'} />
          <Text fontSize="sm" color={color === 1 && '#657ce0'}>
            Home
          </Text>
        </Box>
        {/*} <Box onClick={() => { fund(); highlights(2); }} textAlign="center">
          <Icon color={color === 2 && '#657ce0'} as={AiOutlineFund} boxSize={20} />
          <Text fontSize="sm" color={color === 2 && '#657ce0'}>Fund</Text>
        </Box>*/}
        <Box onClick={openProfile} textAlign="center">
          <Icon as={AiOutlineUser} boxSize={20} />
          <Text fontSize="sm">Profile</Text>
        </Box>
        <Box textAlign="center" onClick={openSupport}>
          <Icon as={AiOutlineWhatsApp} boxSize={20} />
          <Text fontSize="sm">Support</Text>
        </Box>
      { isLogged ?  (<Box textAlign="center" onClick={logout}>
          <Icon as={AiOutlineLogout} boxSize={20} color="red" />
          <Text fontSize="sm">Logout</Text>
        </Box>) : (<Box textAlign="center" onClick={login}>
        <Icon as={AiOutlinePoweroff} boxSize={20} />
        <Text fontSize="sm">Login</Text>
      </Box>)}
      </Flex>
    </>
  );
};

export default NavbarBottom;
