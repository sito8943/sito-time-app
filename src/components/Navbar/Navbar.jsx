import React from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

function Navbar(props) {
  const { openDrawer } = props;

  return (
    <header className="flex items-center justify-between bg-background">
      <div className="flex gap-2 items-center">
        <button
          type="button"
          name="open-menu"
          aria-label="open-menu"
          onClick={openDrawer}
          className="button menu animated"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-xl text-white">Time App</h1>
      </div>
      <ul className="toolbar flex items-center justify-end">
        <button className="button animated">
          <FontAwesomeIcon className="text-xs mb-2" icon={faWindowMinimize} />
        </button>
        <button className="button animated">
          <FontAwesomeIcon className="text-xs" icon={faSquare} />
        </button>
        <button className="button close animated">
          <FontAwesomeIcon className="" icon={faClose} />
        </button>
      </ul>
    </header>
  );
}

export default Navbar;
