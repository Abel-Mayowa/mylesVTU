import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  ChakraProvider,
  useMediaQuery,
  Grid,
  GridItem,
  Button,
  Center,
  Divider,
} from '@chakra-ui/react';

import { BiWalletAlt } from 'react-icons/bi';
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import Wallet from "../components/wallet";
import Adverts from "../components/adverts";
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userData } from "../components/recoil";
import Script from "next/script";
import Head from "next/head";
import { loginStatus } from "../components/recoil";
export default function Fund() {

  const [btnLoading, setBtnLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const setData = useSetRecoilState(userData);
  const data = useRecoilValue(userData);
  const profile = data.profile;
  const [input, setInput] = useState({ fund: "fund" });
  const router = useRouter();

  const handleKeypadClick = (value) => {
    if (value === 'x') {
      setAmount('');
    } else {
      setAmount((prevAmount) => prevAmount + value);
    }
  };

  const fund = () => {
    setBtnLoading(true);
    setInput((prev) => ({ ...prev, ['amount']: Number(amount) }));

    if (Number(amount) < 1) {
      showAlert("Enter the amount you want to add to the wallet", "info");
      return;
    }

      const url = 'https://mtstorez.000webhostapp.com/app/store/fund_wallet';
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (res) {
        if (res.status === 1) {
          const amount = res.amount;
          const email = res.email;
          const pk = res.pk;
          const phoneNumber = res.phoneNumber;
          const reference = res.reference;
          const name = res.fullName;
          pay(amount, email, name, phoneNumber, pk, reference);
        } else {
          showAlert("Error Occurred. " + res.msg, "error");
        }
        setBtnLoading(false);
      },
      error: function (a) {
        setBtnLoading(false);
      }
    });
  }

  const [isMobile] = useMediaQuery('(max-width: 480px');

  const walletFontSize = isMobile ? '2xl' : '3xl';
  const walletSize = isMobile ? 20 : 30;
  const walletWidth = isMobile ? '50vw' : '80vw';

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: "light",
    });
    setBtnLoading(false);
  }

  const getInput = (num) => {
    setInput((prev) => ({ ...prev, ['amount']: num }));
  }

  const pay = (amount, email, name, phoneNumber, pk, reference) => {

    PaystackPop.setup({
        key: pk,
        email: email, // Customer's email address
        amount: amount*100, // Amount in kobo (e.g., ₦1000.00 is 100000 kobo)
        currency: 'NGN', // Currency code
        ref: reference , // Unique transaction reference
        callback: function (response) {

      const transid = response.reference;
      
            verify(transid, amount, email);
            
        },
        onClose: function () {
            
            console.log('Payment closed');
        }
    });
  
  /*FlutterwaveCheckout({
      public_key: pk,
      tx_ref: reference,
      amount: amount,
      currency: 'NGN',
      payment_options: "card, banktransfer, ussd",
      callback: function (response) {
        let transid = response.transaction_id;
        verify(transid, amount, email);
      },
      meta: {
        consumer_id: name,
      },
      customer: {
        email: email,
        phone_number: phoneNumber,
        name: name,
      },
      customizations: {
        title: "MTECHZ VTU",
        description: "Checkout",
        logo: "https://mylesvtu.com.ng/app/public/assets/logo.png",
      },
      onclose: function (incomplete) {
        if (incomplete || window.verified === false) {
          showAlert("Payment Cancelled!!!", "error");
        } else {
          if (window.verified == true) {
            showAlert("Please wait while we verify your payment...", "success", "info");
          } else {
            showAlert("Your payment is verified...", "success");
          }
        }
      }
    });
  }*/
      
  }
  
  const verify = (payment_id, amount, email) => {
    $.ajax({
      url: "https://myles.com.ng/app/store/verify",
      method: "POST",
      dataType: "json",
      data: {
        verify: 'verify',
        payment_id: payment_id,
        email: email,
        amount: amount
      },
      success: function (res) {
        showAlert(res.msg, "info");
        if (res.status === 1) {
          const balance = res.data.balance;
          const transacs = res.data.transactions;
          setData((prev) => ({
            ...prev,
            profile: {
              ...prev.profile,
              ['balance']: balance,
              ['transactions']: transacs,
            }
          }))
        }
      },
      error: function (error) {
        showAlert("We could not process your request. Try again!!!", "error");
      }
    });
  }

  return (
    <>
      <Head>

      <title>mylesVTU — cheap data,airtime and hire web devey and graphics designer </title>
      <script src="https://js.paystack.co/v1/inline.js"></script>

    </Head>
      
      <Header />
      <Wallet />
      <ChakraProvider>
    <form>
        <Flex justify="center" align="center" mb={5} flexDirection="column">
          <Flex justify="center" align="center" flexDirection="column" mt={4}>
            <Box
              bg="white"
              border="1px"
              borderColor="gray.300"
              borderRadius="lg"
              p={4}
              textAlign="center"
              width={isMobile ? '80vw' : '400px'}
              height={isMobile ? '47px' : '60px'}
            >
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                style={{
                  width: '100%',
                  height: '100%',
                  fontSize: 'lg',
                  fontWeight: 'bold',
                  color: amount ? 'black' : 'gray.400',
                  textAlign: 'center',
                  border: 'none',
                  outline: '2px',
                  background: 'none',
                }}
              />
            </Box>

            <Divider mt={2} my={4} />

            <Grid templateColumns="repeat(3, 1fr)" gap={2} width={isMobile ? '80vw' : '400px'}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                <GridItem key={number}>
                  <Button
                    size="lg"
                    w="100%"
                    colorScheme="white"
                    variant="outline"
                    onClick={() => handleKeypadClick(number.toString())}
                  >
                    {number}
                  </Button>
                </GridItem>
              ))}
              <GridItem colSpan={2}>
                <Button
                  size="lg"
                  w="100%"
                  colorScheme="white"
                  variant="outline"
                  onClick={() => handleKeypadClick('x')}
                >
                  X
                </Button>
              </GridItem>
            </Grid>

            <Center mt={4}>
              <Button display={`${btnLoading || !profile ? "none" : "block"}`}
                size="lg"
                bgColor="#0052D4"
                color="white"
                onClick={fund}
                opacity={1}
                width={isMobile ? '80vw' : '400px'}
              >
                {btnLoading ? <FallingLines
                  color="white"
                  width="50"
                  visible={true}
                  ariaLabel='falling-lines-loading'
                /> : "Fund"}
              </Button>
            </Center>
          </Flex>
        </Flex>
       <Script src="https://js.paystack.co/v1/inline.js">
         
</form>          
      </ChakraProvider>
      <Adverts />
      <NavbarBottom />
      <ToastContainer />
    </>
  );
}
