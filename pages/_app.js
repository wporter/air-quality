import "./globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Omega Initiative</title>
        <meta name="description" content="Air Quality you can trust!" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
