  import React,{useState,useEffect} from 'react';
//import {useEffect} from "react-router-dom"
import { Box, Text, Flex, ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi'; // Import a different wallet icon
import {useRecoilValue} from "recoil";
import{userData,loginStatus} from "../components/recoil";




export default function Wallet() {
 
  //console.log("prps is ".props)

    
  
  const  data  = useRecoilValue(userData);

  const profile = data.profile;
  
  //console.log(profile)
  if(!profile){
   // console.log("nodata")
  return(
    <>
  </>
        );
}

  //console.log(profile)
 // const [isMobile] = useMediaQuery('(max-width: 480px)');
 // const [isDesktop] = useMediaQuery('(min-width: 768px)');

//  const balanceFontSize = isMobile ? 'sm' : 'lg';
  //const walletFontSize = isMobile ? '2xl' : '3xl';
 // const walletSize = isMobile ? 20 : 30;
//const walletWidth = isDesktop ? '50vw': '80vw' ;
  return (
    <ChakraProvider>
      <Flex justify="center" align="center">
        <Box
        
          bgGradient="linear(to-r, #4465f9, #657ce0)"
          color="white"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          width={{sm:"80vw",lg:"50vw"}}
          mt={2}
          fontFamily="Arial, sans-serif"
          justifyContent="center"
          align="center"
        >
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Text fontSize={{sm:"sm",lg:"lg"}} fontWeight="bold">
              MT
            </Text>
            <Text fontSize={{sm:"sm",lg:"lg"}} fontWeight="bold">
              Balance: ₦{profile.balance.toLocaleString()}
            </Text>
          </Flex>

          <Text fontSize={w} fontWeight="bold" textAlign="center" my={4}>
            My Wallet
          </Text>

          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text fontSize={{sm:"sm",lg:"lg"}} fontWeight="bold" fontFamily="Arial, sans-serif">
              {profile.fullname}
            </Text>
            <BiWalletAlt size={{sm:20,lg:30}} />
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
