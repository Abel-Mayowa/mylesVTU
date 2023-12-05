import {useEffect,useState} from "react";
import Header from '../components/header';
import Wallet from '../components/wallet';
import Menu from '../components/menu';
import Transactions from '../components/transactions';
import Adverts from '../components/adverts';
import NavbarBottom from '../components/navbarBottom';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { Box, Button, Center, ChakraProvider, Text, Container } from '@chakra-ui/react';
import { FiFrown } from "react-icons/fi";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { loginStatus, userData,page } from "../components/recoil";
import { useRouter } from "next/router";
import Transition from '../components/transition';
import Head from "next/head";
//import Data from "./buy_data";

export default function Dashboard() {

  const [isLoading, setLoading] = useState(false);

  const logged = useRecoilValue(loginStatus);

  const setLogged = useSetRecoilState(loginStatus);
  const setData = useSetRecoilState(userData);
  const [spin, setSpin] = useState(true);
 // const thisPage = useRecoilValue(page);
 // const setPage = useSetRecoilState(page);
  const router = useRouter();

  /*
  useEffect(() => {

    const spin = setTimeout(() => {
      setSpin(false);
    }, 100);

    return () => {
      clearTimeout(spin);
    }

  }, [spin, setSpin]);
*/
  useEffect(() => {
    const url = 'https://mylesvtu.com.ng/app/store/welcome';

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      //crossDomain: true,
      success: function (r, status, xhr) {
        if (r.data.isLogged) {
          setLogged(r.data.isLogged);
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle
                  });
//router.push("/login");
          
        }
        else {
          router.push("/login");
        }
      },
      error: function () {
        //showAlert("Server is down", "warning");
      },
    });
  }, [setLogged, setData]);

  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
    });
  };

  if (!logged) {
    return (
      <Transition />
    );
  }

  return (
    <>
      <Head>

      <title>mylesVTU — cheap data,airtime and hire web devey and graphics designer </title>
        </Head>

      
      <Container textAlign="center" h="100vh">
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Wallet />
                <Menu />
                <Transactions />
              </div>
            </div>
            <NavbarBottom />
          </div>
        </Container>
      


      
    </>
  );
}
