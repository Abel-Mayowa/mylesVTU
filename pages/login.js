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
        //showAlert('Server is down', 'warning');
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
     // toastId:"login",
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
         // const { profile, dataBundle } = r.data;

          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
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
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login - MylesVTU</title>
  <meta name="description" content="Log in to your MylesVTU account. Access a wide range of services including cheap data, airtime top-up, fund wallet, and more. Your gateway to convenient and affordable digital services." />
  <meta name="keywords" content="login, MylesVTU login, cheap data, airtime top-up, fund wallet, digital services" />
  <meta name="author" content="MylesVTU" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="generator" content="Your CMS or Development Platform" />

  {/* Open Graph meta tags for social sharing */}
  <meta property="og:title" content="Login - MylesVTU" />
  <meta property="og:description" content="Log in to your MylesVTU account. Access a wide range of services including cheap data, airtime top-up, fund wallet, and more. Your gateway to convenient and affordable digital services." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mylesvtu.com.ng/login" />
  <meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />

  {/* Twitter Card meta tags for Twitter sharing */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Login - MylesVTU" />
  <meta name="twitter:description" content="Log in to your MylesVTU account. Access a wide range of services including cheap data, airtime top-up, fund wallet, and more. Your gateway to convenient and affordable digital services." />
  <meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />
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
