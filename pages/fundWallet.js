import React, { useEffect,useState } from 'react';
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
  VStack,
} from '@chakra-ui/react';


import { BiWalletAlt } from 'react-icons/bi'; // Import a different wallet icon
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import Wallet from "../components/wallet";
import Adverts from "../components/adverts";
import {FallingLines} from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery"
import  {useRouter}  from 'next/router';
import {useSetRecoilState,useRecoilValue} from "recoil";
import {userData} from "../components/recoil";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";



export default function Fund() {


  const [btnLoading, setBtnLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const setData = useSetRecoilState(userData);
const data = useRecoilValue(userData);
  const profile = data.profile;
const[input,setInput] = useState({fund:"fund"})
const router = useRouter();
  //console.log(profile); return;
 // const navigate= useNavigate();

  /*useEffect(()=>{
    alert(data.profile.balance)
  if (!data.profile) {
    router.push({
      pathname:"/login"
    ,
      })
  }
},[data,setData]);
*/
  const handleKeypadClick = (value) => {
    if (value === 'x') {
      setAmount('');

//setInput({fund: "fund"});

    } else {
      setAmount((prevAmount) => prevAmount + value);




    }
  };

  const handleFund = () => {
    // Process the funding logic here
    // ...
    console.log(amount);
  };

  const [isMobile] = useMediaQuery('(max-width: 480px)');
  
  const walletFontSize = isMobile ? '2xl' : '3xl';
  const walletSize = isMobile ? 20 : 30;
  const walletWidth = isMobile ? '50vw' : '80vw';

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
    setBtnLoading(false);
  }

const getInput = (num) => {
  //console.log("darmian"+amount)
    setInput((prev)=>
      ({ ...prev, ['amount']: num}));
  }


const pay = (amount,email,name,phoneNumber,pk,reference) => {

  /*PaystackPop.setup({
      key:pk,
      email:email,
      amount: amount * 100,
      ref:reference,
     label:phoneNumber,
      onClose: function(){
showAlert('Payment is closed','warning');
    },
    callback: function(response){
      let message = 'Payment has been made! Reference: ' + response.reference; 
      
   const ref = response.reference;  

      
      verify(ref,amount,email);
      showAlert(message,"success");
    }
  }).openIframe();*/

  
    FlutterwaveCheckout({

      public_key:pk,

      tx_ref:reference,

      amount: amount,

      currency:'NGN',

      payment_options: "card, banktransfer, ussd",

 callback:function(response){

   let transid = response.transaction_id;

   verify(transid,amount,email);

      },
      meta: {
        consumer_id: name,
       // consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email:email,
        phone_number:phoneNumber,
        name:name,
      },
      customizations: {
        title: "MTECHZ VTU",
        description: "Checkout",
        logo:"https://mtstorez.000webhostapp.com/app/public/assets/logo.png",
      },
 onclose: function(incomplete) {
        if (incomplete || window.verified === false) {
         showAlert("Payment Cancelled!!!","error")
        } else {
          //document.querySelector("form").style.display = 'none';
          if (window.verified == true) {

 showAlert("Please Wait while we verify your payment...","success","info")
          } else {

    showAlert("Your payment is verified...","success")
          }//
        }
      }//onclose()    

    });
 }

const verify = (payment_id,amount,email) => {


$.ajax({
    url: "https://mtstorez.000webhostapp.com/app/store/verify",
    method: "POST",
    dataType: "json",
    data:{

        verify:'verify',
        payment_id:payment_id,
        email:email,
     amount:amount
    },
    success: function(res) {

      showAlert(res.msg,"info");

      if(res.status === 1){

        const balance = res.data.balance;
        const transacs = res.data.transactions;

setData((prev) => ({...prev,
    profile: {
            ...prev.profile,
            ['balance']: balance,
            ['transactions']:transacs,
          },}))   

 //setData(prev => ({...prev.profile,['transactions']:transacs}));         
    }

    },
    error: function(error) {

showAlert("We could not process your request. Try again!!!","error");


    }
});
  
  }
  //console.log(data)

  // Process Funding
  const fund = () => {

    setBtnLoading(true);

setInput((prev)=>
      ({ ...prev, ['amount']: amount}));

let  updatedInput = { ...input, ['amount']:Number(amount) };

   // console.log(amount)
    // ensure empty fields are not sent
    if (updatedInput.amount < 1) {
      showAlert("Enter the amount you want to add to wallet", "info");
      return;
    }

//let updatedInput = { ...input, ['csrf']: csrf };

 // let  updatedInput = { ...input, ['amount']:amount };

    //console.log(input)
    const url = "https://mtstorez.000webhostapp.com/app/store/fund_wallet";
    // AJAX request using jQuery
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: updatedInput,
      success: function (res) {

        if (res.status === 1) {

const amount = res.amount;
    const email = res.email;
    const pk = res.pk;
    const phoneNumber = res.phoneNumber;
    const reference = res.reference;
    const name = res.fullName;
    //initiate payment
    pay(amount, email, name,phoneNumber, pk, reference);

        } else {
          showAlert("Error Occured. "+res.msg, "error");
        }
        setBtnLoading(false);
       // setCsrf(r.token);
      },
      error: function (a) {
        setBtnLoading(false);
      }
    });
  }



  return (
    <>
    <Head>
        <script src="https://checkout.flutterwave.com/v3.js"></script>
<script src="https://js.paystack.co/v1/inline.js"></script>
      
<script src="//cdn.jsdelivr.net/npm/eruda"></script>
    
<script>eruda.init();</script>  

      </Head>

      <Header />
      <Wallet />
      <ChakraProvider>
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
              height={isMobile ? '47px' : '60px'} // Adjusted height
            >
              <input
                type="text"
                value={amount}
                onChange={(e)  => setAmount(e.target.value)}
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
              <Button display ={`${btnLoading || !profile ? "none" : "block"}`}
                size="lg"
                bgColor="#0052D4" 
                color="white"
                onClick={fund}
                opacity={1}
                width={isMobile ? '80vw' : '400px'} // Adjusted width
              >
          {btnLoading ? <FallingLines
  color="white"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/> :"Fund"}
              </Button>
            </Center>
          </Flex>
        </Flex>

      </ChakraProvider>
      <Adverts/>
      <NavbarBottom />
      <ToastContainer/>
    </>
  );
}
