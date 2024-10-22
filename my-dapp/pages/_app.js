import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

import "../styles/globals.css";
import { SOCAIL_MEDIA_Provider } from "../context/context";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Image
          src="/images/logo.png"
          height={500}
          width={500}
          alt="user"
          className="h-12 w-fit"
        />
        <title>Social App- The Graph</title>
      </Head>
      <SOCAIL_MEDIA_Provider>
        <Component {...pageProps} />
        <Toaster />
      </SOCAIL_MEDIA_Provider>

      <script src="js/plugin.js"></script>
      <script src="js/lightbox.js"></script>
      <script src="js/scripts.js"></script>
    </>
  );
}
