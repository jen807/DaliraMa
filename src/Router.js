import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/search" element={<Search />} />
      <Route path="/detail/:id" element={<Detail />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default Router;
