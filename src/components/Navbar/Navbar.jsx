import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const appWindow = getCurrentWindow();

function Navbar(props) {
  const { openDrawer } = props;

  return (
    <header
      onMouseDown={(e) => {
        if (e.buttons === 1 && e.target.nodeName === "HEADER") {
          // Primary (left) button
          e.detail === 2
            ? appWindow.toggleMaximize() // Maximize on double click
            : appWindow.startDragging(); // Else start dragging
        }
      }}
      className="flex items-center justify-between bg-background"
    >
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
        <h1 className="text-xl text-white pointer-events-none">Time App</h1>
      </div>
      <ul className="toolbar flex items-center justify-end">
        <button
          onClick={() => appWindow.minimize()}
          className="button animated"
        >
          <FontAwesomeIcon className="text-xs mb-2" icon={faWindowMinimize} />
        </button>
        <button
          onClick={() => appWindow.toggleMaximize()}
          className="button animated"
        >
          <FontAwesomeIcon className="text-xs" icon={faSquare} />
        </button>
        <button
          onClick={() => appWindow.close()}
          className="button close animated"
        >
          <FontAwesomeIcon className="" icon={faClose} />
        </button>
      </ul>
    </header>
  );
}

export default Navbar;
