import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Input,
  Button,
  Heading,
  Text,
  ChakraProvider,
  Image, // Import Link component
} from '@chakra-ui/react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { csrfToken } from '../components/recoil';
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken);

  useEffect(() => {
    if (csrf === '') {
      const url = 'https://mtstorez.000webhostapp.com/app/store/welcome';

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        crossDomain: true,
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

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setBtnLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProceedClick = () => {
    setBtnLoading(true);

    if (!email) {
      showAlert('Please enter your registered email.', 'warning');
      setBtnLoading(false);
      return;
    }

    const input = {
      csrf: csrf,
      email: email,
    };

    const url = 'https://mtstorez.000webhostapp.com/app/store/reset_password';

    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        if (r.status === 1) {
          showAlert(
            'Your password has been reset. Open your email and follow the instructions.',
            'success'
          );
          setCsrf(r.data.token);
        } else {
          showAlert('Your request was not successful. Ensure that you have entered the right email', 'error');
          setCsrf(r.data.token);
        }
        setBtnLoading(false);
      },
      error: function (a) {
        setBtnLoading(false);
      },
    });
  };

  return (
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
            alt="Image Alt Text"
          />
          <Heading as="h3" size="lg" mb={2}>
            Forgot Password
          </Heading>
          <Text fontSize="sm" color="gray.800" mb={4}>
            If you have forgotten your password or you want to reset it, please enter your registered email and click proceed.
          </Text>
          <Input
            type="email"
            placeholder="Your Registered Email"
            onChange={handleEmailChange}
            value={email}
            required
            size="lg"
            mb={4}
          />
          <Button
            colorScheme="blue"
            size="md"
            isLoading={btnLoading}
            loadingText="Proceeding"
            onClick={handleProceedClick}
            mt={4}
            w="100%"
          >
            Proceed
          </Button>
          <Text mt={4}>
            Remember your password?{' '}
            <Link href="/login">
              <Box as="span" color="blue.500" cursor="pointer">
                Login
              </Box>
            </Link>
          </Text>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
