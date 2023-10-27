import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RecoilRoot} from "recoil";
import {ChakraProvider} from "@chakra-ui/react";
import{useSetRecoilState} from "recoil";
import{loginStatus} from "../components/recoil";
import {useEffect} from "react";
//import $ from "jquery"



function MyApp({ Component, pageProps }: AppProps) {

  
  return(
    <>
    <RecoilRoot>
      
        <Component {...pageProps} />
        
    </RecoilRoot>
    </>
    )
}

export default MyApp
