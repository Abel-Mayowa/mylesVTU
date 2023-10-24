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
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Use FiEye and FiEyeOff icons from react-icons
import $ from "jquery";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {csrfToken} from "../components/recoil"
import {loginStatus} from "../components/recoil"
import {userData} from "../components/recoil"



export default function Login() {
  const [input, setInput] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [csrf, setCsrf] = useRecoilState(csrfToken);
  const [isLogged, setLogged] = useRecoilState(loginStatus);
  const [data, setData] = useRecoilState(userData);
  //const [notify, setNotify] = useState(null);

  const router = useRouter();
  
  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
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

  useEffect(() => {
    const url = 'https://mtstorez.000webhostapp.com/app/store/welcome';

    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      crossDomain: true,
      success: function (r, status, xhr) {
        setBtnLoading(false);
        setLogged(r.data.isLogged);
        setCsrf(r.token);

      /*  if (r.data.isLogged) {
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          //setData({ profile: profile, dataBundle: dataBundle });
        }*/
      },
      error: function () {
        showAlert("Server is down","warning");
        setBtnLoading(false);
      },
    });
  }, [setLogged,setCsrf]);

 
  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const openRegister = ()=>{

    showAlert("We are now taking you to registration page ","info");

    
  }

  const processLogin = () => {
   
    setBtnLoading(true);
    
    if (Object.keys(input).length < 2) {
     // setNotify({ type: "info", msg: "Please fill all fields" });
      showAlert("Fill all required details.","warning");

      setBtnLoading(false);

      return;
    }
    // Perform your login logic here}
    // ...
     const url = 'https://mtstorez.000webhostapp.com/app/store/login';
        $.ajax({
          url: url,
          method: 'post',
          data:{
            login:"login"
          },
          dataType: 'json',
          data: input,
          success: function (r) {
            //r.status = 1;
            if (r.status === 1) {
setLogged(true);
          //setToRender("/dashboard");

              const { profile, dataBundle } = r.data;

              setData({ profile: profile, dataBundle: dataBundle });
             // setPage({ goto: 'dashboard' });
   // navigate("/dashboard");
              router.push({
                pathname:"/dashboard"
              });    
            } else {
              //setNotify({ type: "info", msg:r.msg });
showAlert(r.msg,"warning")
            }
            setBtnLoading(false);
            setCsrf(r.token);
          },
          error: function (a) {
            showAlert("Something went wrong. Please try again!!!","warning")
            setBtnLoading(false);
          },
        });
  };

  return (
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

            <Text mt={2} color="blue.500">
              <Link href="/reset">Reset password here</Link>
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
              <Link href="/register">
                <Text as="span" color="blue.500">
                  Sign Up
                </Text>
              </Link>
            </Text>
          </Box>
        </Center>
    </ChakraProvider>
  );
}
