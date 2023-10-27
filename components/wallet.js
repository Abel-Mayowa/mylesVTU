import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, ChakraProvider } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { userData } from '../components/recoil';

export default function Wallet() {
  const data = useRecoilValue(userData);
  const profile = data.profile;

  if (!profile) {
    return <></>;
  }

  return (
    <ChakraProvider>
      <Flex justify="center" align="center">
        <Box
          bgGradient="linear(to-r, #4465f9, #657ce0)"
          color="white"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          width={{ sm: '80vw', lg: '50vw' }}
          mt={2}
          fontFamily="Arial, sans-serif"
          justifyContent="center"
          align="center"
        >
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Text fontSize={{ sm: 'sm', lg: 'lg' }} fontWeight="bold">
              MT
            </Text>
            <Text fontSize={{ sm: 'sm', lg: 'lg' }} fontWeight="bold">
              Balance: ₦{profile.balance.toLocaleString()}
            </Text>
          </Flex>

          <Text fontSize="lg" fontWeight="bold" textAlign="center" my={4}>
            My Wallet
          </Text>

          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text fontSize={{ sm: 'sm', lg: 'lg' }} fontWeight="bold" fontFamily="Arial, sans-serif">
              {profile.fullname}
            </Text>
            <BiWalletAlt size={{ sm: 20, lg: 30 }} />
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
