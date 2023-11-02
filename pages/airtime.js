

import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider, Box, Flex, Heading, Input, Select, Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
//import './Data.css'
import $ from 'jquery'
import { FallingLines } from 'react-loader-spinner';
import {useRecoilValue,useSetRecoilState} from "recoil";
import {csrfToken} from "../components/recoil";
import Head from "next/head";


const Airtime = () => {

  const router = useRouter();

const csrf = useRecoilValue(csrfToken);
  
   const setCsrf = useSetRecoilState(csrfToken);
  
  useEffect(()=>{
    
if(!csrf){

    const url = 'https://mtstorez.000webhostapp.com/app/store/welcome';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      crossDomain: true,
      success: function (r, status, xhr) {
        setCsrf(r.token)
      },
      error: function () {
        showAlert("Server is down", "warning");
      },
    });
  
}
    
  },[csrf])

  const [input, setInput] = useState({ network: "" });
  const [btnLoading, setBtnLoading] = useState(false);
  const [data, setData] = useState({});
  const [network, setNetwork] = useState('mtn');
const [amount,setAmount] = useState('')
const [number,setNumber] = useState(null)

const[toCharge,setToCharge] = useState(0) 

  const getInput = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
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
    setBtnLoading(false);
  }

  const buyAirtime = ()=>{


    const updatedInput = {...input,['csrf']:csrf}

    console.log(updatedInput)
    if (Object.keys(input).length < 3) {
      showAlert("Please fill all fields appropriately!!!", "info");
      return;
    }

    setBtnLoading(true);
    const url = "https://mtstorez.000webhostapp.com/app/store/buy_airtime";
    $.ajax({
      url: url,
      method: 'post',
 dataType: 'json',
      data: updatedInput,
      success: function (r) {
        setBtnLoading(false);
        if (r.status === 1) {
          showAlert("Thank You 💓 Your order has been completed!!!", "success");
        } else {
console.log(r)
          showAlert(r.msg, "info");
        }
        setBtnLoading(false);
      },
      error: function (a) {
        showAlert("Your request cannot be processed. Please try again.", "info");
        setBtnLoading(false);
      }
    });
  }

  const chooseNetwork = (choice) => {
    setNetwork(choice);
    setInput((prev) => ({ ...prev, network: choice }));
  }

const getAmount = (num) => {

  if(num === "x"){

    setAmount('');

    setToCharge(0);
  }

  else{

    setAmount((prevAmount) => prevAmount+num);

  }
}

  useEffect(() => {

  const effectiveCharge = ( Number(amount) - (0.015 * Number(amount)) );

  setToCharge(effectiveCharge);

   getInput("amount",amount);        getInput("charge",effectiveCharge)              
}, [amount]);

  return (
    <>
      <Head>
        <script src="//cdn.jsdelivr.net/npm/eruda"></script>

        <script>eruda.init();</script>  

              
        </Head>
      
    <Header />

    <ChakraProvider>

<Box align="center" mb={5}>

<Heading as="h2">Buy Airtime</Heading>
</Box>
      <Box padding="20px" display="flex" flexDirection="column" alignItems="center" justify="center">
        <Flex alignItems="center" marginBottom="15px">

          <Select w="250px"
            placeholder="Select network"
            onChange={(event) => chooseNetwork(event.target.value)}
          >
            <option value="mtn">MTN</option>
            <option value="glo">Glo</option>
            <option value="airtel">Airtel</option>
            <option value="9mobile">9Mobile</option>
          </Select>
        </Flex>
<Flex>

<Input colorScheme="blue" onChange={(e)=>getInput(e.target.name,e.target.value)} type="number" placeholder="Phone Number" name="phoneNumber"/>
</Flex>
        <Flex mt={12} display="flex" direction="row" justifyContent="center" alignItems="center"  marginBottom="20px">
          <Box marginRight="6px">
            <Heading as="h3" size="sm">Amount:</Heading>

    <Box  p={4} h={8} boxShadow="md" display="flex" justify="center" alignItems="center" border="solid" borderRadius="lg" borderWidth="1px" borderColor="#657ce0"   w="150px">

      <Flex alignItems="center" justify="center">
      {amount === "" ? 0 : amount}
      </Flex>

    </Box>     

          </Box>
          <Box marginRight="4px">
            <Heading as="h3" size="sm">To charge:</Heading>
            <Box  p={4} h={8} boxShadow="md" display="flex" justify="center" alignItem="center" borderWidth="1px" borderRadius="lg" borderColor="#657ce0"  w="150px">

      <Flex alignItems="center" justify="center">
      {toCharge}
      </Flex>

    </Box>     

          </Box>
        </Flex>

        <Flex flexDirection="column" marginBottom="20px">
          <Flex marginBottom="10px">
            {[1, 2, 3].map((number) => (
              <Button onClick={()=>getAmount(number)} key={number} marginRight="5px" size="md" backgroundColor="white" borderWidth="1px">
                {number}
              </Button>
            ))}
          </Flex>
          <Flex marginBottom="10px">
            {[4, 5, 6].map((number) => (
              <Button onClick={()=>getAmount(number)} key={number} marginRight="5px" size="md" backgroundColor="white" borderWidth="1px">
                {number}
              </Button>
            ))}
          </Flex>
          <Flex marginBottom="10px">
            {[7, 8, 9].map((number) => (
              <Button onClick={()=>getAmount(number)} key={number} marginRight="5px" size="md" backgroundColor="white" borderWidth="1px">
                {number}
              </Button>
            ))}
          </Flex>
          <Flex>
            <Button onClick={()=>getAmount(0)} marginRight="5px" size="md" backgroundColor="white" borderWidth="1px">
              0
            </Button>
            <Button onClick={()=>getAmount('x')} marginRight="5px" size="md" backgroundColor="white" borderWidth="1px" width="25">
              Clear
            </Button>
          </Flex>
        </Flex>

        <Button
          w="300px"
          size="md"
          backgroundColor="#657ce0"
          color="white"
          isLoading={btnLoading}
          onClick={buyAirtime}
        >
          Buy
        </Button>
      </Box>


    </ChakraProvider>
<NavbarBottom />
      <ToastContainer />
    </>
  );
};

export default Airtime;


