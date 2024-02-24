import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// daha önce yaptığım projeyi son yaptığım projeye aktararak veriyi realtime çekerek ilk yaşadığım sorunu çözeceğim.
// şu an chat ve componentlerini çektim sırada sidebar var
