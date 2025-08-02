import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthRegister from "./pages/auth/register.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}
      {/* <h1> Header component</h1> */}
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
