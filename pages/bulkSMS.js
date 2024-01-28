import React from "react";
import { FaUser, FaMobile, FaMoneyBillAlt } from "react-icons/fa";
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  ChakraProvider,
  Flex,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarBottom from "../components/navbarBottom";
import Header from "../components/header";
import $ from "jquery";

const SendBulkSMS = () => {
  const [cost, setCost] = useState(0);

  const [numbers, setNumbers] = useState("");

  const [message, setMessage] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const [pages, setPages] = useState(1);

  const [senderName, setSenderName] = useState("Myles");

  useEffect(() => {
    if (numbers.trim().charAt(numbers.length - 1) != "," && message) {
      const charsPerPage = 150;

      const totalChars = message.length;

      const totalPages = Math.floor(totalChars / charsPerPage);

      totalChars < 150 ? setPages(1) : setPages(totalPages);

      const totalRecipients = numbers.trim().split(",").length; //getting the total phone numbers we want to send message to.

      const costPerPage = 3;

      const chargesDue = costPerPage * totalRecipients * pages;

      setCost(chargesDue);
    }
  }, [numbers, pages, message, cost]);

  const send = () => {
    if (!message && !numbers && !senderName) {
      toast.error(
        "Please fill the the form appropriately. Enter the sender name, the recipients and your message.",
        { hideProgressBar: true },
      );

      return;
    }

    if (message.length < 5) {
      toast.error("Your message must be more than five(5) characters.", {
        hideProgressBar: true,
      });

      return;
    }
    if (senderName > 6) {
      toast.error("Sender Name must be more than five(5) characters.", {
        hideProgressBar: true,
      });

      return;
    }

    //Send data to backend

    setBtnLoading(!btnLoading);

    const endpoint = "https://mylesvtu.com.ng/app/store/sendBulkSMS/";

    const data = {
      sender: senderName,
      numbers: numbers,
      message: message,
    };

    $.ajax({
      url: endpoint,
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.status === 1) {
          setBtnLoading(!btnLoading);

          toast.success(
            "Your message has been sent with success. Thanks for trusting us...",
            { hideProgressBar: true },
          );
        }
      },
      error: function (error) {
        setBtnLoading(false);
        toast.error(
          "Something went wrong. We couldn't reach the server. Please try again!!!",
          { hideProgressBar: true },
        );
      },
    });
  };

  return (
    <>
      <Header />
      <ChakraProvider>
        <Container maxW="xl" centerContent p={4}>
          <Box m="auto" textAlign="center">
            <Heading as="h1" mb={6}>
              Send Bulk SMS
            </Heading>
          </Box>

          <Box width={{ base: "100%", md: "50%" }} mx="auto">
            <InputGroup mb={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="#657ce0" />}
              />
              <Input
                onChange={(e) => setSenderName(e.target.value)}
                border="1px solid #657ce0"
                type="text"
                placeholder="Sender Name"
              />
            </InputGroup>
            <Box mt={5}>
              <Text my={3} color="#657ce0" size="md">
                {" "}
                Enter phone numbers and separate it with comma.{" "}
              </Text>
            </Box>
            <Textarea
              border="1px solid #657ce0"
              onChange={(e) => setNumbers(e.target.value)}
              mb={4}
              placeholder="Enter and separate phone numbers with comma. For example: 08147823198,07033445578,09163526373"
            />

            <Textarea
              border="1px solid #657ce0"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message...."
            />

            <Box mb={4} textAlign="center">
              <Text bg="lightgrey" mt={4}>
                Total page is {pages} | Total Recipients is{" "}
                {numbers ? numbers.trim().split(",").length : 0}{" "}
              </Text>
              <Box color="mediumseagreen" mt={3} fontWeight="bold">
                Amount to pay is ₦{cost}
              </Box>
            </Box>
            {btnLoading ? (
              <Center>
                {" "}
                <Spinner color="#657ce0" size="xl" speed="0.4s" />{" "}
                <Flex>
                  <Text ml={3} color="grey">
                    Sending Message...
                  </Text>{" "}
                </Flex>
              </Center>
            ) : (
              <Button onClick={send} colorScheme="blue" size="lg" width="100%">
                Send
              </Button>
            )}
          </Box>
        </Container>
        <ToastContainer />
      </ChakraProvider>
      <NavbarBottom />
    </>
  );
};

export default SendBulkSMS;
