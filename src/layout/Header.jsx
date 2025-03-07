import React, { useState } from "react";

// component
import Drawer from "../components/Drawer/Drawer";
import Navbar from "../components/Navbar/Navbar";

function Header() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={showDrawer}
        onClose={() => {
          console.log(showDrawer);
          setShowDrawer(false);
        }}
      />
      <Navbar openDrawer={() => setShowDrawer(true)} />
    </>
  );
}

export default Header;
