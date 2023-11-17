import React, { useState, useEffect } from 'react';
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
  ChakraProvider,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import $ from 'jquery';
import Login from "./login";

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { csrfToken,page } from '../components/recoil';

export default function Register() {
  const [input, setInput] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken);
  const thisPage = useRecoilValue(page);
  const setPage = useSetRecoilState(page);

  useEffect(()=>{

    setPage("register");
    
  },[]);
  
  useEffect(() => {
    
    if (csrf === '') {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r) {
          setCsrf(r.token);
        },
        error: function () {
          showAlert('Server is down', 'warning');
          setBtnLoading(false);
        },
      });
    }
  }, [csrf, setCsrf]);
//alert (thisPage)
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
      //toastId:"register",
    });

    setBtnLoading(false);
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const processRegister = () => {
    setBtnLoading(true);

    if (Object.keys(input).length < 4) {
      showAlert('Fill all required details.', 'warning');
      setBtnLoading(false);
      return;
    }

      const url = 'https://mylesvtu.com.ng/app/store/register';

    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        if (r.status === 1) {
          showAlert(
            'Your account setup is complete. Please go to login to use our services.',
            'success'
          );
        } else {
          showAlert(r.msg, 'warning');
        }
        setBtnLoading(false);
        setCsrf(r.token);
      },
      error: function () {
        setBtnLoading(false);
      },
    });
  };

  const openLogin = () => {
   // showAlert('We are now taking you to the login page', 'info');
setPage("login");

  };

  return (
     <>
    {thisPage ==="login" &&(<Login/>)}

       {thisPage === "register" && (
      <ChakraProvider>
      <ToastContainer />
      <Center h={{ md: '100vh' }}>
        <Box
          bgColor="white"
          p={8}
          rounded="lg"
          boxShadow={0}
          maxW="400px"
          w="100%"
          textAlign="center"
        >
          <Image
            src="https://img.freepik.com/premium-vector/digital-interpreter-flat-style-design-vector-illustration-stock-illustration_357500-664.jpg"
            alt="Register on MylesVTU"
          />
          <Heading as="h3" size="lg" mb={2}>
            Register
          </Heading>
          <Text fontSize="sm" color="gray.800" mb={4}>
            Create your account with{' '}
            <Box as="span" cursor="pointer" color="#657ce0">
              MylesVTU
            </Box>
          </Text>
          <Stack spacing={4}>
            <InputGroup>
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={getInput}
                value={input.phoneNumber || ''}
                required
                size="lg"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={getInput}
                value={input.email || ''}
                required
                size="lg"
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
                size="lg"
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
            <InputGroup>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={getInput}
                value={input.fullName || ''}
                required
                size="lg"
              />
            </InputGroup>
            <Checkbox size="sm">I agree to the terms and conditions</Checkbox>
          </Stack>
          <Button
            colorScheme="blue"
            size="md"
            isLoading={btnLoading}
            loadingText="Registering"
            onClick={processRegister}
            mt={4}
            w="100%"
          >
            Register
          </Button>
          <Text mt={4}>
            Already have an account?{' '}
            {/* <Link href="/login">*/}
              <Text onClick={openLogin} as="span" color="blue.500" cursor="pointer">
                Log In
              </Text>
            {/*</Link>*/}
          </Text>
          {btnLoading && <ToastContainer />}
        </Box>
      </Center>
    </ChakraProvider>)}

     </>
  );
}
