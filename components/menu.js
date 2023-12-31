import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, GridItem, Text, ChakraProvider, useMediaQuery, Center, Spinner } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineWifi, AiOutlineMobile, AiOutlineDesktop, AiOutlineThunderbolt, AiOutlineUser, AiOutlineWallet, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, page, switchData } from '../components/recoil';
//import Data from '../pages/buy_data';


export default function Menu() {
  const data = useRecoilValue(userData);
  const thisPage = useRecoilValue(page);
  const setPage = useSetRecoilState(page);
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
//const {switching,setSwitching} = props.data;
  const switching = useRecoilValue(switchData);
  const setSwitching = useSetRecoilState(switchData);
  
  
  if (!data) {
    return null;
  }
  /*
useEffect(()=>{
  setPage("dashboard");
},[])*/
  
  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const openBuyData = () => {

    setSwitching(true);
    router.push("/buy_data");
//setPage("data");
   //alert(thisPage);

  };

  const openFund = () => {
setSwitching(true);
    
   router.push('/fundWallet');
//setPage("fund");
    //setSwitching(true);
  };

  const openAirtime = () => {

setSwitching(true);

    router.push('/airtime');
    //setPage("airtime");
  //  setSwitching(true);
  };

  const openHire = () => {

setSwitching(true);

    router.push('/hire_me');
    //setPage("hire");
//setSwitching(true);
    
  };

  const openCable = () => {
    showAlert("We are sorry this service is not available. Check back again later...", "info");
  };

  const openAirtime2Cash = () => {

setSwitching(true);

    router.push("/airtime_to_cash");
    //setPage("a2c");

 //   setSwitching(true);
  };


useEffect(() => {
  if (switching) {
    // Simulating a delay, adjust the timeout as needed
    const timeoutId = setTimeout(() => {
      setSwitching(false);
    }, 1000); // 1 second delay, adjust as needed

    return () => clearTimeout(timeoutId);
  }
}, [switching]);

  return (
    <>  
      
      <ChakraProvider>

     {switching ? (
      <Center mt={5} height="">
      <Box
        p={4}
        maxW="md"
        borderWidth=",0px"
  borderColor="#657ce0"
        borderRadius="md"
        boxShadow="sm"
        textAlign="center"
        
      >
        <Spinner color="#657ce0" size="md" />
        <p></p>
      </Box>
    </Center>) : (

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
                  <Text cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
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
                  <Text cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
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
                  <Text cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
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
                  <Text cursor="pointer" mt={2} fontSize="0.8em" fontWeight="bold">
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
                  <Text cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
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
                  <Text cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
                    Hire
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>)}
      </ChakraProvider>
      <ToastContainer />
        
    </>
  );
}
