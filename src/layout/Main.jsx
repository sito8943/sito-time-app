import { Outlet } from "react-router-dom";

// components
import Footer from "./Footer";
import Header from "./Header";

function Main() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Main;
