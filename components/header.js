import { Box, Text} from '@chakra-ui/react';
import { AiOutlineBell } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Image from "next/image";
const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital@1&display=swap" rel="stylesheet"/>
    </Head>
    <Box
      borderBottomLeftRadius="1px"
      position={isFixed ? 'fixed' : 'static'}
      top={isFixed ? 0 : 'auto'}
      boxShadow={isFixed ? 'xl' : 'none'}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={7}
      borderRadius="md"
      backgroundColor="white"
      zIndex={10}
    >
      <Text
        fontFamily="Ubuntu"
        fontSize="1.3em"
        fontWeight="bold"
        textAlign="left"
        ml={4}
      >
        MylesVTU
      </Text>
      <Box position="relative">
        <AiOutlineBell size={24} color="#657ce0" cursor="pointer" />
        <Box
          position="absolute"
          top="-6px"
          right="-6px"
          borderRadius="50%"
          bg="#ff5851"
          color="white"
          fontSize="1em"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="1em"
          height="1em"
        >
          <Text
            fontFamily="Poppins, sans-serif"
            fontSize="0.7em"
            fontWeight="bold"
            textAlign="center"
          >
            0
          </Text>
        </Box>
      </Box>
      <Box
        width="50px"
        height="50px"
        borderRadius="50%"
        borderWidth="2px"
        borderColor="#657ce0"
        overflow="hidden"
        mr={4}
      >
        <Image
          src="/public/avater1.jpeg"

          alt="Profile Picture"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
    </>
  );
};

export default Header;
