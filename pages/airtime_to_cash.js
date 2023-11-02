import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  ChakraProvider,
  Container
} from '@chakra-ui/react';
import { FiDollarSign, FiSend } from 'react-icons/fi';
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";



function Airtime2Cash() {
  const [charge, setCharge] = useState('75/100');
  const [amount, setAmount] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  const handleConvert = () => {
    // Calculate the amount to be paid and set it in the paidAmount state.
    // You can add your logic here.
  };

  return (
    <>
<Header/>
      
    <ChakraProvider>
      <Container>
    <Box p={4} maxW="sm" borderWidth="1px" borderRadius="lg">
      <Heading size="lg" mb={4}>
        Airtime 2 Cash
      </Heading>
      <Text mb={4}>Follow the instructions below:</Text>

      <Stack spacing={4}>
        <FormControl id="amount">
          <FormLabel>Enter the amount you wish to convert to cash:</FormLabel>
          <InputGroup>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              <FiDollarSign size="1.5em" /> {/* Adjust icon size */}
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="whatsapp">
          <FormLabel>Enter your active WhatsApp number:</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              <FiSend size="1.5em" /> {/* Adjust icon size */}
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="paidAmount">
          <FormLabel>Amount we would pay you:</FormLabel>
          <Input
            type="text"
            value={paidAmount}
            isReadOnly
          />
        </FormControl>

        <Button
          bg="#657ce0"
          color="white"
          _hover={{ bg: '#5066b8' }} // Hover color
          onClick={handleConvert}
        >
          Convert
        </Button>
      </Stack>
    </Box>
        </Container>
      </ChakraProvider>
      <NavbarBottom/>
    </>
  );
}

export default Airtime2Cash;
