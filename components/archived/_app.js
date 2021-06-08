import React from "react";
import AuthContextProvider from "../lib/services/auth.context";
/**
 *
 */
export default function App({Component, pageProps}) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

