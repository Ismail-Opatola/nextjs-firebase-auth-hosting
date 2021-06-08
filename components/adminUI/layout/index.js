import React, {useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

const Layout = ({children}) => {
  <>
    <Meta/>
    <main>
      <Header/>
      {children}
    </main>
    <Footer/>
  </>;
};

export default Layout;
