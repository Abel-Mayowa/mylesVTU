import React from 'react';
import { Box, Text, Flex, ChakraProvider } from '@chakra-ui/react';
import { FiCreditCard } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, loginStatus } from '../components/recoil';
import { useEffect } from "react";
import $ from "jquery";

export default function Wallet() {

  const data = useRecoilValue(userData);
  const setLogged = useSetRecoilState(loginStatus);
  const setData = useSetRecoilState(userData);
  const profile = data.profile;

  useEffect(() => {
    if (!profile) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        crossDomain: true,
        success: function (r, status, xhr) {
          if (r.data.isLogged) {
            setLogged(r.data.isLogged);
            const profile = r.data.profile;
            const dataBundle = r.data.dataBundle;
            setData({ profile: profile, dataBundle: dataBundle });
          }
        },
        error: function () {
          console.log("Server is down");
        },
      });
    }
  }, [profile]);

  if (!profile) {
    return (
      <>
        <Text mt={15} textAlign="center"> Wallet Loading...</Text>
      </>
    )
  }

  const gradientBackground = 'linear(to-r, #0052D4, #4364F7)'; // Replace with your desired gradient colors

  return (
    <ChakraProvider>
      <Flex justify="center" align="center" width="100%" mt={6}>
        <Box
          width={{ base: '80%', sm: '60%', md: '40%' }}
          borderRadius="xl" // Use "lg" for rounded corners
          boxShadow="lg"
          p={6}
          bgGradient={gradientBackground} // Apply the gradient background
          color="white"
          textAlign="center"
        >
          <FiCreditCard size={30} color="white" />
          <Text fontSize="lg" fontWeight="bold" mt={4}>
            My Wallet
          </Text>
          <Text fontSize="md" fontWeight="" color="white" mt={2}>
            Balance: ₦{profile.balance.toLocaleString()}
          </Text>
          <Text fontSize="md">Phone: +234{profile.phoneNumber}</Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
