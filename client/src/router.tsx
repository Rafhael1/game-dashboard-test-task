import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Customers from "./pages/customers/customers";
import Games from "./pages/games/games";
import NotFound from "./pages/notFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Customers />} />
      <Route path="/games" element={<Games />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router;