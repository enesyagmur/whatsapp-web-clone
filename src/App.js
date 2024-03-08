import React, { Suspense } from "react";
import "./style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const Home = React.lazy(() => import("./Pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// boyutlar normalden farklı gozukuyor
//performans testi yapıcam sonra performans iyileştirmesi sonra tekrar performans testi
// son olarak linkedinde paylaşarak projeyi noktalicam
