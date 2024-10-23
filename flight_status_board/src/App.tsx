import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { FlightBoard } from "./components/FlightBoard";
import FlightDetails from "./pages/FlightDetails";
import { NavigateHome } from "./pages/notfound";

function App() {
  return (
    <>
      <div className="flex gap-4 px-4">
        <div className="lg:w-[150px] xl:w-[200px] hidden lg:block">
          <Sidebar />
        </div>
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/history" element={<FlightBoard />} />
          <Route path="/tickets" element={<FlightBoard />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
          <Route path="*" element={<NavigateHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
