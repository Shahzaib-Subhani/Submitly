import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import EvaluatorRegister from "./pages/EvaluatorRegister";
import EvaluatorSignIn from "./pages/EvaluatorSignIn";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </>
  );
}

export default App;
