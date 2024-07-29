import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import Logins from "./pages/Logins";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  });
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/logins" element={<Logins />} />
      </Routes>
    </div>
  );
};

export default App;
