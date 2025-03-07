import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import Main from "./layout/Main";

// views
import Home from "./Views/Home";
import TimeToReal from "./Views/TimeToReal";
import RealToTime from "./Views/RealToTime";
import SumTime from "./Views/SumTime";

// css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/time-to-real" element={<TimeToReal />} />
          <Route path="/real-to-time" element={<RealToTime />} />
          <Route path="/sum-time" element={<SumTime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
