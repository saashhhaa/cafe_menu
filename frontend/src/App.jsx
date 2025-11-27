import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Language } from "./pages/Language";
import { Positions } from "./pages/Positions";
import { Categories } from "./pages/Categories";
import './style.css';
import { LogInHandler } from "./pages/LogInHandle";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Language />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<Positions />} />
        <Route path="/logIn" element={<LogInHandler/>}/>
      </Routes>
    </BrowserRouter>
  );
};
