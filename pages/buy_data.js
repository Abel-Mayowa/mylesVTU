import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
import $ from 'jquery';
import { FallingLines } from 'react-loader-spinner';
import { ChakraProvider, Box, Flex, Heading, Input, Select, Button, Center } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userData } from "../components/recoil";
import { Rings } from "react-loader-spinner";

const Data = () => {
  const router = useRouter();
  const [input, setInput] = useState({ network: "mtn" });
  const [btnLoading, setBtnLoading] = useState(false);
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);
  const [spin, setSpin] = useState(true);
  const [selected, setSelected] = useState(null);
  const [network, setNetwork] = useState('mtn');

  useEffect(() => {
    if (!data.profile) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        crossDomain: true,
        success: function (r, status, xhr) {
          const dataBundle = r.data.dataBundle;
          setData({ dataBundle: dataBundle });
          setSpin(false);
        },
        error: function () {
          showAlert("Server is down", "warning");
        },
      });
    }
  }, [data, setData]);

  const bundle = data.dataBundle || {};
  const airtel = bundle.airtel || [];
  const mtn = bundle.mtn || [];
  const etisalat = bundle.etisalat || [];

  const getInput = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     // progress: 100,
      theme: "light",
      toastId:"data",
    });
    setBtnLoading(false);
  }

  const buyData = () => {
    if (Object.keys(input).length < 3) {
      showAlert("Please fill all fields appropriately!!!", "info");
      return;
    }
    setBtnLoading(true);
      const url = "https://mylesvtu.com.ng/app/store/buy_data";
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        setBtnLoading(false);
        console.log(r)
        if (r.status === 1) {
          showAlert("Thank You... Your order has been processed!!", "success");
        } else {
          showAlert("Your request failed."  +r.msg+ " If problem persists,do contact us. Thanks...", "info");
        }
        setBtnLoading(false);
      },
      error: function () {
        showAlert("Your request cannot be processed. Please Try again.", "info");
        setBtnLoading(false);
      }
    });
  }

  const selectItem = (item) => {
    setSelected(item);
  }

  const chooseNetwork = (choice) => {
    setNetwork(choice);
    setSelected(null);
    setInput((prev) => ({ ...prev, ['network']: choice }));
  }

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  const styles = {
    planSelected: {
      backgroundColor: '#656ce0',
      color: 'white'
    }
  }

  let dataPlansDetails;

  if (network === "mtn") {
    dataPlansDetails = mtn;
  } else if (network === "airtel") {
    dataPlansDetails = airtel;
  } else {
    dataPlansDetails = etisalat;
  }

  return (
    <>
      <Header />
      <ChakraProvider>
        <Flex maxHeight="100vh" align="center" justify="center" bg="white">
          <Box p="4" borderRadius="sm" boxShadow="sm" textAlign="center" bg="white" width="100%" maxWidth="500px">
            <Heading as="h1" size="md" fontFamily="sans-serif" mb="4">
              Buy Data
            </Heading>
            <Input
              onChange={(e) => setInput((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              type="tel"
              placeholder="Enter 11 digits number"
              borderRadius="md"
              mb="4"
              size="lg"
            />
            <Select onChange={(e) => chooseNetwork(e.target.value)}
              borderRadius="lg"
              mb="4"
              size="lg"
            >
              <option value="mtn">MTN</option>
              <option value="airtel">Airtel</option>
              <option value="9mobile">9Mobile</option>
            </Select>
            <Flex justify="center" mb="4" flexWrap="wrap">
              {!data.dataBundle && (
                <Center m={10}>
                  <Box>
                    <Rings
                      height="80"
                      width="80"
                      color="#657ce0"
                      radius="6"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="rings-loading"
                    />
                  </Box>
                </Center>
              )}
              {dataPlansDetails.map((item, index) => (
                <Box onClick={() => {
                  selectItem(index + 1);
                  getInput('plan', item.product);
                }}
                  key={index}
                  bg="white"
                  color="black"
                  p="4"
                  borderRadius="md"
                  m="2"
                  textAlign="center"
                  width="22"
                  boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  style={selected === index + 1 ? styles.planSelected : {}}
                >
                  <Box
                    bg="white"
                    width="12px"
                    height="4px"
                    borderRadius="2%"
                    mb="4"
                    mx="auto"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                  />
                  <Heading as="h5" fontSize="15px" size="sm" mb="2" fontWeight="bold" fontFamily="sans-serif">
                    {item.product}
                  </Heading>
                  <Heading as="h4" size="sm" fontWeight="normal" fontSize="13px" fontFamily="sans-serif">
                    ₦{item.price}
                  </Heading>
                </Box>
              ))}
            </Flex>
            <Box ml={36} textAlign="center" justify="center" align="center" display={`${btnLoading ? "block" : "none"}`}>
              <FallingLines
                color="#657ce0"
                width="50"
                visible={true}
                ariaLabel='falling-lines-loading'
              />
            </Box>
            <Button onClick={buyData}
              bgColor="#657ce0"
              color="white"
              size="lg"
              width="100%"
              borderRadius="md"
              fontFamily="sans-serif"
              fontWeight="bold"
              mt="4"
              opacity={1}
              display={`${btnLoading ? "none" : "block"}`}
            >
              Buy
            </Button>
          </Box>
        </Flex>
      </ChakraProvider>
      <ToastContainer />
      <NavbarBottom />
    </>
  );
};

export default Data;
