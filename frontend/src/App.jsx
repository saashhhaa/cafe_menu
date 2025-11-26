import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Language } from "./pages/Language";
import { Positions } from "./pages/Positions";
import { Categories } from "./pages/Categories";
import './index.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Language />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/positions" element={<Positions />} />
      </Routes>
    </BrowserRouter>
  );
};
