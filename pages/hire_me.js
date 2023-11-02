import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  Select,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  FormControl,
  ChakraProvider,
  Container 
} from '@chakra-ui/react';
import { FaPhone, FaUser, FaPen } from 'react-icons/fa';
import NavbarBottom from '../components/navbarBottom';
import Header from '../components/header';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';
import { useRouter } from 'next/router';
import Adverts from "../components/adverts"
import 'react-toastify/dist/ReactToastify.css';


const Hire = () => {

  const navigate = useRouter();

  const [input, setInput] = useState({

    phoneNumber: '',
    service: '',
    description: '',
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const getInput = (name, value) => {
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    //console.log("changed")
  };

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setBtnLoading(false);
  };

  // Process Hire
  const hireUs = () => {
    // Ensure all required fields are filled
    console.log(input)
    if (!input.phoneNumber || !input.service || !input.description) {
      showAlert('Please fill all fields appropriately!!!', 'info');
      return;
    }

    setBtnLoading(true);
    const url = 'https://mtstorez.000webhostapp.com/app/store/hire';

    // AJAX request using jQuery
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        setBtnLoading(false);
        if (r.status === 1) {
          showAlert('Your request has been processed!! Our agent will get in touch with you very shortly. Please make your phone number available', 'success');
        } else {
          showAlert(r.msg, 'info');
        }
        setBtnLoading(false);
      },
      error: function (a) {
        showAlert('Your request cannot be processed. Please Try again.', 'info');
        setBtnLoading(false);
      },
    });
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Header />
      <Container>
      <ChakraProvider>

      <Box p={4} maxWidth="500px" mx="auto">
        <Heading align="center" my={10} as="h2" size="lg" mb={4}>
          Hire Us
        </Heading>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaPhone} color="gray.400" />
              </InputLeftElement>

              <Input onChange={(e) => getInput(e.target.name, e.target.value)}
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) => getInput(e.target.name, e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">

              </InputLeftElement>

              <Select
                name="service"
              placeholder="Select Service"
                onChange={(e) => getInput(e.target.name, e.target.value)}
              >
                <option value="Web developer">Web Developer</option>
                <option value="Graphics Design">Graphics Design</option>
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">

              </InputLeftElement>
              <Textarea h="11em" 
                name="description"
                placeholder="Explain What you want in details... E.g I want to design a school management system"
                onChange={(e) => getInput(e.target.name, e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={btnLoading}
            onClick={hireUs}
          >
            Save Changes
          </Button>
        </VStack>
      </Box>
        </ChakraProvider>
      <Adverts/>
    </Container>
      <NavbarBottom />
      <ToastContainer />
    </>
  );
};

export default Hire;
