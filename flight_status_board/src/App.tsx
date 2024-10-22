import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { FlightBoard } from "./components/FlightBoard";


function App() {
  return (
    <>
      <div className="flex gap-4 px-4">
        <div className="lg:w-[150px] xl:w-[200px]  hidden lg:block">
          <Sidebar />
        </div>
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/history" element={<FlightBoard />} />
          <Route path="/tickets" element={<FlightBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
