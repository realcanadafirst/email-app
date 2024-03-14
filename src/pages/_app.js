import React from 'react';
import { useRouter } from 'next/router';
import '@ft/styles/globals.css';



export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Component {...pageProps} />
  );
}
