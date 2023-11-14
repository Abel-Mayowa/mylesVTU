import type { NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
//import Login from "../pages/login.js"
/*const Home: NextPage = () => {
  return (
    
  )
}

export default Home
*/

import { useState } from 'react';
import { Box, Flex, Button, IconButton, Text, Collapse, Stack,ChakraProvider } from '@chakra-ui/react';
import { MdMenu, MdClose } from 'react-icons/md';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <ChakraProvider>
      
    <Box as="nav">
      <Flex align="center" justify="space-between">
        <Box>
          <a href="index.html">
            <img src="assets/images/logo/white-logo.svg" alt="Logo" />
          </a>
        </Box>
        <IconButton
          display={{ base: 'block', md: 'none' }}
          onClick={toggle}
          icon={isOpen ? <MdClose /> : <MdMenu />}
        />
        <Collapse in={isOpen}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'center', md: 'center' }}
            mt={{ base: 4, md: 0 }}
          >
            <Stack spacing={4}>
              <Text><a href="#home">Home</a></Text>
              <Text><a href="#features">Features</a></Text>
              <Text><a href="#overview">Overview</a></Text>
              <Text><a href="#pricing">Pricing</a></Text>
              <Text><a href="#team">Team</a></Text>
              <Text>
                <Button
                  onClick={toggle}
                  variant="link"
                  aria-label="Toggle navigation"
                >
                  Blog
                </Button>
              </Text>
            </Stack>
            <Collapse in={isOpen}>
              <Stack pl={8} mt={2}>
                <Text><a href="blog-grid-sidebar.html">Blog Grid Sidebar</a></Text>
                <Text><a href="blog-single.html">Blog Single</a></Text>
                <Text><a href="blog-single-sidebar.html">Blog Single Sidebar</a></Text>
              </Stack>
            </Collapse>
            <Text><a href="contact.html">Contact</a></Text>
          </Stack>
        </Collapse>
        <Button variant="outline">
          <a href="contact.html">Get it now</a>
        </Button>
      </Flex>
    </Box>
              </ChakraProvider>
                </>
  );
};

export default Home;
