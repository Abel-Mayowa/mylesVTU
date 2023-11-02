import React, { useState } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineFund, AiOutlineUser, AiOutlineWhatsApp } from 'react-icons/ai';
import Support from '../components/support';
import {useRouter} from "next/router"


const NavbarBottom = () => {
  const [showSupport, setShowSupport] = useState(false);
  const [color, setColor] = useState();
  const [idleTime, setIdleTime] = useState(5000);

  const openSupport = () => {
    setShowSupport(true);
  };
  const router = useRouter();

  const highlights = (num) => {
    setColor(num);
  };

  const goHome = () => {
    // Do something related to going home
  highlights(1);
    router.push("/dashboard")
  };

  const fund = () => {
    // Do something related to funding
     highlights(2);
    router.push("/fundWallet")
  };

  const openProfile = () => {
    // Do something related to opening the profile
highlights(3)
    router.push("/profile");
  }
  return (
    <>
      {showSupport && <Support show={{ showSupport, setShowSupport }} idleTime={{ idleTime, setIdleTime }} />}
      <Flex zIndex={9999} mt={18}
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
          <Icon as={AiOutlineHome} boxSize={20} color={color === 1 && "#657ce0"} />
          <Text fontSize="sm" color={color === 1 && "#657ce0"}>
            Home
          </Text>
        </Box>
        <Box onClick={() => { fund(); highlights(2); }} textAlign="center">
          <Icon color={color === 2 && "#657ce0"} as={AiOutlineFund} boxSize={20} />
          <Text fontSize="sm" color={color === 2 && "#657ce0"}>Fund</Text>
        </Box>
        <Box onClick={openProfile} textAlign="center">
          <Icon as={AiOutlineUser} boxSize={20} />
          <Text fontSize="sm">Profile</Text>
        </Box>
        <Box textAlign="center" onClick={openSupport}>
          <Icon as={AiOutlineWhatsApp} boxSize={20} />
          <Text fontSize="sm">Support</Text>
        </Box>
      </Flex>
    </>
  );
};

export default NavbarBottom;
