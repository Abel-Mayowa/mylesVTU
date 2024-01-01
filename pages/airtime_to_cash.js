import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  VStack,
  Container,
  Select,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { FiCreditCard, FiSend } from 'react-icons/fi';
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import Head from "next/head";
//import data from "../data.json";

const theme = extendTheme({
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Helvetica Neue, sans-serif',
  },
});

function Airtime2Cash() {
  const [network, setNetwork] = useState();
  const [charge, setCharge] = useState(0);
  const [networkCharges, setNetworkCharges] = useState({});
  const [amount, setAmount] = useState(0);
  const [whatsapp, setWhatsapp] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (!network) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (response) {
          const data = response.data;
          const mtnCharge = data.mtnCharge / 100;
          const gloCharge = data.gloCharge / 100;
          const airtelCharge = data.airtelCharge / 100;
          setNetworkCharges({ mtn: mtnCharge, glo: gloCharge, airtel: airtelCharge });

          if (network === "mtn") {
            setCharge(mtnCharge);
          } else if (network === "glo") {
            setCharge(gloCharge);
          } else {
            setCharge(airtelCharge);
          }
        },
        error: function (error) {
          console.log("Server is down", "warning");
        }
      });
    }
  }, [network, setNetwork, charge, setCharge]);

  useEffect(() => {
    setPaidAmount(charge * amount);
  }, [charge, amount]);

  const convert = () => {
    if (amount < 500) {
      showAlert("Amount must be greater than 500", "warning");
      return;
    }
    setBtnLoading(true);

      const url = 'https://mylesvtu.com.ng/app/store/airtime2cash';

    const data = {
      amount: amount,
      whatsapp: whatsapp,
      network: network,
    };

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: function (response) {
        const result = response;
        if (result.status === 1) {
          showAlert('Your request has been processed!! Our agent will get in touch with you very shortly. Please make sure your phone number is available', 'success');
          setBtnLoading(false);
        } else {
          showAlert(result.msg, 'info');
        }
      },
      error: function (error) {
        showAlert('Your request cannot be processed. Please try again.', 'info');
        setBtnLoading(false);
      }
    });
  };

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     // progress: undefined,
      theme: "light",
    });
    setBtnLoading(false);
  }

  return (
    <>
   <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Airtime to Cash | Exchange Mobile Credit for Money - MylesVTU</title>
  <meta name="description" content="Convert airtime to cash seamlessly. Instantly exchange your mobile phone credit for real money. Trustworthy and swift airtime to cash service at MylesVTU." />
  <meta name="keywords" content="airtime to cash, mobile credit exchange, convert airtime to money, MylesVTU" />
  <meta name="author" content="MylesVTU" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="generator" content="Your CMS or Development Platform" />

  {/* Open Graph meta tags for social sharing */}
  <meta property="og:title" content="Airtime to Cash | Exchange Mobile Credit for Money - MylesVTU" />
  <meta property="og:description" content="Convert airtime to cash seamlessly. Instantly exchange your mobile phone credit for real money. Trustworthy and swift airtime to cash service at MylesVTU." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mylesvtu.com.ng/airtime_to_cash" />
  <meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />

  {/* Twitter Card meta tags for Twitter sharing */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Airtime to Cash | Exchange Mobile Credit for Money - MylesVTU" />
  <meta name="twitter:description" content="Convert airtime to cash seamlessly. Instantly exchange your mobile phone credit for real money. Trustworthy and swift airtime to cash service at MylesVTU." />
  <meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />
</Head>
      <Header  />
      <ChakraProvider theme={theme}>
        <Container maxW="lg" my="4em" >
          <Box p={4} borderWidth="0px" borderRadius="lg" shadow="sm">
            <Heading size="sm" mb={4}>
              Airtime 2 Cash
            </Heading>
            <Container boxShadow={0} mb={4}>
              Fill the form below appropriately. Only reply a message from <Text fontWeight="bold" fontSize="lg">07014443158</Text> about this transaction.. Be warned!!! Payment for MTN is {networkCharges && (`${networkCharges.mtn*100}% Glo is ${networkCharges.glo*100}% and Airtel is ${networkCharges.airtel*100}%`)}
            </Container>
            <VStack spacing={4}>
              <FormControl id="amount">
                <FormLabel>Enter the amount you wish to convert to cash:</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <InputLeftElement pointerEvents="none">
                    <FiCreditCard size="1.5em" />
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
              <Select onChange={(e) => setNetwork(e.target.value)} placeholder='Airtime Network'>
                <option value='mtn'>MTN</option>
                <option value='glo'>Glo</option>
                <option value='airtel'>Airtel</option>
                <option value="9mobile">9Mobile</option>
              </Select>
              <FormControl id="whatsapp">
                <FormLabel>Enter your active WhatsApp number:</FormLabel>
                <InputGroup>
                  <Input
                    type="tel"
                    placeholder="Enter WhatsApp Number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                  <InputLeftElement pointerEvents="none">
                    <FiSend size="1.5em" />
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
              {network && (
                <FormControl id="paidAmount">
                  <FormLabel>Amount we would pay you:</FormLabel>
                  <Input
                    type="text"
                    value={paidAmount}
                    isReadOnly
                  />
                </FormControl>
              )}
              {network && amount && whatsapp && (
                <Button
                  colorScheme="blue"
                  onClick={convert}
                  isLoading={btnLoading}
                >
                  Convert
                </Button>
              )}
            </VStack>
          </Box>
          <ToastContainer />
        </Container>
      </ChakraProvider>
      <NavbarBottom />
    </>
  );
}

export default Airtime2Cash;
