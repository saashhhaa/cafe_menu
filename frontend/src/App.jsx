import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Language } from "./pages/Language";
import { Positions } from "./pages/Positions";
import { Categories } from "./pages/Categories";
import './index.css';
import { LogInHandler } from "./pages/LogInHandle";
import { Game } from "./pages/Game";

export const App = () => {
  return (
    <BrowserRouter basename="/cafe_menu">
      <Routes >
        <Route path="/" element={<Language />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<Positions />} />
        <Route path="/logIn" element={<LogInHandler/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  );
};
