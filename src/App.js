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

// yapabilirsem grup arama ve hesap silme özelliklerinide ekleyeceğim
// mesaj olarak görsel atma
// ardından live a alıp performans testi yapıcam
// son olarak linkedinde paylaşarak projeyi noktalicam
