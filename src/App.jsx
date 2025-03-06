import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TimeToReal from "./tabs/TimeToReal";
import RealToTime from "./tabs/RealToTime";
import SumTime from "./tabs/SumTime";

const tabs = {
  toReal: 0,
  toTime: 1,
  sumTime: 2,
};

const content = {
  0: <RealToTime />,
  1: <TimeToReal />,
  2: <SumTime />,
};

function App() {
  const [tab, setTab] = useState(0);

  const tabsRender = useMemo(
    () =>
      Object.keys(tabs).map((value) => (
        <li key={value} className="flex-1">
          <button
            onClick={() => setTab(tabs[value])}
            className={`${
              tabs[value] === tab
                ? "bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-700 text-gray-100"
            } px-4 py-1 cursor-pointer transition ease-in-out duration-500 w-full`}
          >
            {value}
          </button>
        </li>
      )),
    [tab]
  );

  const contentRender = useMemo(
    () =>
      Object.keys(content).map((tabA) => (
        <li
          key={tabA}
          className={`${
            Number(tabA) === tab
              ? "opacity-100 translate-y-0  transition ease-in-out duration-500"
              : "opacity-0 translate-y-1 absolute"
          }`}
        >
          {content[tab]}
        </li>
      )),
    [tab]
  );

  return (
    <main className="flex flex-col items-center justify-start pt-10 h-screen">
      <h1 className="text-4xl w-140">Welcome to Tauri + React TimeApp</h1>
      <ul className="flex items-center justify-start mt-5 w-140">
        {tabsRender}
      </ul>
      <ul className="w-140">{contentRender}</ul>
    </main>
  );
}

export default App;
