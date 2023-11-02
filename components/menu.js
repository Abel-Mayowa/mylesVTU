import React from 'react';
import { Box, Grid, GridItem, Text, ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineWifi, AiOutlineMobile, AiOutlineDesktop, AiOutlineThunderbolt, AiOutlineUser, AiOutlineWallet, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';

import { useRecoilValue } from "recoil";
import { userData } from "../components/recoil";
import { useRouter } from "next/router";

export default function Menu() {
  const data = useRecoilValue(userData);
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const router = useRouter();

  if (!data) {
    return null;
  }

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const openBuyData = () => {
    router.push({
      pathname: '/buy_data',
    });
  };

  const openFund = () => {
     router.push('/fundWallet');
  };

  const openAirtime = () => {
    router.push('/airtime');
  };

  const openHire = () => {
     router.push('/hire_me');
  };

  const openCable = () => {
    showAlert("We are sorry this service is not available. Check back again later...", "info");
  };

  const openAirtime2Cash = () => {
    router.push("/airtime_to_cash");
  };

  return (
    <>
      <ChakraProvider>
        <Box mt={6}>
          <Box maxW="md" mx="auto" p={4}>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem colSpan={1} onClick={openBuyData} cursor="pointer">
                <Box
                
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineWifi color="#657ce0" size={24} />
                  <Text mt={2} fontSize="sm" fontWeight="bold">
                    Data
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1} onClick={openFund} cursor="pointer">
                <Box
          
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineDollarCircle color="#657ce0" size={24} />
                  <Text mt={2} fontSize="sm" fontWeight="bold">
                    Fund
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box onClick={openAirtime}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineMobile color="#657ce0" size={24} />
                  <Text mt={2} fontSize="sm" fontWeight="bold">
                    Airtime
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box onClick={openAirtime2Cash}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaExchangeAlt color="#657ce0" size={24} />
                  <Text mt={2} fontSize="0.8em" fontWeight="bold">
                    Airtime 2 Cash
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box onClick={openCable}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineDesktop color="#657ce0" size={24} />
                  <Text mt={2} fontSize="sm" fontWeight="bold">
                    Cable
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box onClick={openHire}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineUser color="#657ce0" size={24} />
                  <Text mt={2} fontSize="sm" fontWeight="bold">
                    Hire
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ChakraProvider>
      <ToastContainer />
    </>
  );
}
