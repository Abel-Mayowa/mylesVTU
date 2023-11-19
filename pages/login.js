import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  Checkbox,
  Stack,
  Image,
  ChakraProvider
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState,useSetRecoilState ,useRecoilValue} from 'recoil';
import { csrfToken, loginStatus, userData,page } from '../components/recoil';
import Head from "next/head";
//import Register from "./register";
//import Reset from "./reset";
//import Dashboard from "./dashboard";
//import Data from "../pages/buy_data";
//import Airtime from "../pages/airtime";
//import Atc from "../pages/airtime_to_cash";
//import Hire from "../pages/hire_me";
//import Fund from "../pages/fundWallet";
//import Profile from "../pages/profile";


export default function Login() {
  const [input, setInput] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [csrf, setCsrf] = useRecoilState(csrfToken);
  const [isLogged, setLogged] = useRecoilState(loginStatus);
  const [data, setData] = useRecoilState(userData);
  const thisPage = useRecoilValue(page);
  const setPage = useSetRecoilState(page);
  const router = useRouter();

  useEffect(()=>{
    setPage("login")
  } ,[])
  
  useEffect(() => {
    const url = 'https://mylesvtu.com.ng/app/store/welcome';
      
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      //crossDomain: true,
      success: function (r) {
        setBtnLoading(false);
        setLogged(r.data.isLogged);
        
        setCsrf(r.token);
        
      },
      error: function () {
        showAlert('Server is down', 'warning');
        setBtnLoading(false);
      },
    });
  }, [setLogged, setCsrf]);

  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
      toastId:"login",
    });

    setBtnLoading(false);
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const processLogin = () => {
    setBtnLoading(true);

    if (Object.keys(input).length < 2) {
      showAlert('Fill all required details.', 'warning');
      setBtnLoading(false);
      return;
    }

      const url = 'https://mylesvtu.com.ng/app/store/login';
    $.ajax({
      url: url,
      method: 'post',
      data: { login: 'login', ...input },
      dataType: 'json',
      success: function (r) {
        if (r.status === 1) {
          setLogged(true);
          const { profile, dataBundle } = r.data;
          setData({ profile: profile, dataBundle: dataBundle });

setPage("dashboard");
          router.push({ pathname: '/dashboard' });
        } else {
          showAlert(r.msg, 'warning');
        }
        setBtnLoading(false);
        setCsrf(r.token);
      },
      error: function () {
        showAlert('Something went wrong. Please try again!!!', 'warning');
        setBtnLoading(false);
      },
    });
  };

  const openReg = () =>{
    //setPage("register");
    router.push("/register");
  }

  const openReset = () =>{
    //setPage("reset");
router.push("/reset")
  }
  
  return (
    <>
      <Head>
      <title>mylesVTU-- Login to buy cheap Data,Hire Web Developer and graphics designer </title>
      <meta name="title" content="mylesVTU-- Login to buy cheap Data,Hire Web Developer and graphics designer " />
      <meta name="description" content="Unlock unbeatable savings on data and airtime! Login now for exclusive discounts and access to skilled web developers and graphics designers at affordable rates. Your gateway to seamless connectivity and professional services awaits." />

      
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content="mylesVTU-- Login to buy cheap Data,Hire Web Developer and graphics designer " />
      <meta property="og:description" content="Unlock unbeatable savings on data and airtime! Login now for exclusive discounts and access to skilled web developers and graphics designers at affordable rates. Your gateway to seamless connectivity and professional services awaits." />
      <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content="mylesVTU-- Login to buy cheap Data,Hire Web Developer and graphics designer " />
      <meta property="twitter:description" content="Unlock unbeatable savings on data and airtime! Login now for exclusive discounts and access to skilled web developers and graphics designers at affordable rates. Your gateway to seamless connectivity and professional services awaits." />
      <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />

      </Head>
      
    
      <ChakraProvider>
        <Center h="100vh">
          <Box
            bgColor="white"
            p={8}
            rounded="lg"
            maxW="400px"
            w="100%"
            textAlign="center"
          >
            <Image
              src="https://img.freepik.com/premium-vector/digital-interpreter-flat-style-design-vector-illustration-stock-illustration_357500-664.jpg"
              alt="login to MylesVTU"
            />

            <Heading as="h3" size="lg" mb={2}>
              Login
            </Heading>
            <Text fontSize="sm" color="gray.800" mb={4}>
              Explore our services when you sign in to MylesVTU
            </Text>
            <InputGroup my={4}>
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={getInput}
                value={input.phoneNumber || ''}
                required
              />
            </InputGroup>
            <InputGroup>
              <Input
                type={input.showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={getInput}
                value={input.password || ''}
                required
              />
              <InputRightElement width="3rem">
                <Button
                  size="sm"
                  onClick={() =>
                    setInput((prevInput) => ({
                      ...prevInput,
                      showPassword: !prevInput.showPassword,
                    }))
                  }
                >
                  {input.showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Checkbox size="sm">Remember Me</Checkbox>

            <Text onClick={openReset} mt={2} color="blue.500">Reset Password Here
              {/*<Link href="/reset">Reset password here</Link>*/}
            </Text>

            <Button
              colorScheme="blue"
              size="md"
              isLoading={btnLoading}
              loadingText="Logging in"
              onClick={processLogin}
              mt={4}
              w="100%"
            >
              Login
            </Button>
            <Text mt={4}>
              Don't have an account?{' '}
              {/*<Link href="/register">*/}
                <Text cursor="pointer" onClick={openReg} as="span" color="blue.500">
                  Sign Up
                </Text>
                {/*</Link>*/}
            </Text>
          </Box>
        </Center>
        <ToastContainer />
      </ChakraProvider>

    </>
  );
}
