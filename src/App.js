import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import FooterSection from "./components/FooterSection";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {
  const { loading } = useSelector((state) => state.loaderReducer);

  return (
    <div className="App">
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-4">
        {/* You can include navbar here */}
        <Outlet /> {/* <-- This is essential for nested routes to render */}
      </div>
      <FooterSection />
    </div>
  );
}

export default App;
