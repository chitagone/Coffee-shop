import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AddCoffee from "./pages/AddCoffee";
import ListCoffee from "./pages/ListCoffee";
import AddDessert from "./pages/AddDessert";
import ListDessert from "./pages/ListDessert";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-scroll bg-[#dcd4c0]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-coffee" element={<AddCoffee />} />
            <Route path="/list-coffee" element={<ListCoffee />} />

            <Route path="/add-dessert" element={<AddDessert />} />
            <Route path="/list-dessert" element={<ListDessert />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
