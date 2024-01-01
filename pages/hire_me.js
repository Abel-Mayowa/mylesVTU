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
import { FaPhone } from 'react-icons/fa';
import NavbarBottom from '../components/navbarBottom';
import Header from '../components/header';
import Adverts from '../components/adverts';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

const Hire = () => {
  const router = useRouter();

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
  };

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
    });
    setBtnLoading(false);
  };

  const hireUs = () => {
    if (!input.phoneNumber || !input.service || !input.description) {
      showAlert('Please fill all fields appropriately!!!', 'info');
      return;
    }

    setBtnLoading(true);
      const url = 'https://mylesvtu.com.ng/app/store/hire';

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
      error: function () {
        showAlert('Your request cannot be processed. Please try again.', 'info');
        setBtnLoading(false);
      },
    });
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <>
     <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hire Web Developer & Graphics Designer - MylesVTU</title>
  <meta name="description" content="Hire a skilled web developer and graphics designer at MylesVTU. Our professionals deliver quality work in web development, graphic design, and more. Take your projects to the next level with our expertise." />
  <meta name="keywords" content="hire web developer, hire graphics designer, web development services, graphic design services, MylesVTU, freelance services" />
  <meta name="author" content="MylesVTU" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="generator" content="Your CMS or Development Platform" />

  {/* Open Graph meta tags for social sharing */}
  <meta property="og:title" content="Hire Web Developer & Graphics Designer - MylesVTU" />
  <meta property="og:description" content="Hire a skilled web developer and graphics designer at MylesVTU. Our professionals deliver quality work in web development, graphic design, and more. Take your projects to the next level with our expertise." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mylesvtu.com.ng/hire_me" />
  <meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />

  {/* Twitter Card meta tags for Twitter sharing */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Hire Web Developer & Graphics Designer - MylesVTU" />
  <meta name="twitter:description" content="Hire a skilled web developer and graphics designer at MylesVTU. Our professionals deliver quality work in web development, graphic design, and more. Take your projects to the next level with our expertise." />
  <meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />
</Head>
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
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={(e) => getInput(e.target.name, e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
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
                  <Textarea
                    h="11em"
                    name="description"
                    placeholder="Explain what you want in detail..."
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
      </Container>
      <Adverts />
      <NavbarBottom />
      <ToastContainer />
    </>
  );
};

export default Hire;
