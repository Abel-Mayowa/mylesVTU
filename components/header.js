import { Box, Text, Image, Badge } from '@chakra-ui/react';
import { AiOutlineBell } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';

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
    <Box
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
        fontFamily="Poppins, sans-serif"
        fontSize="4xl"
        fontWeight="bold"
        textAlign="left"
        ml={4}
      >
        Good Morning!
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
            2
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
          src="https://images.unsplash.com/photo-1668732038385-1717f3c72b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&w=1000&q=80"
          alt="Profile Picture"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default Header;
