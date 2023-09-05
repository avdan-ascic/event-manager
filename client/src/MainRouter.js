import { Routes, Route } from "react-router-dom";

import Header from "./components/core/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import AddEvent from "./components/event/AddEvent";
import Dashboard from "./components/event/Dashboard";
import MyRegistrations from "./components/event/MyRegistrations";
import Home from "./components/core/Home";

const MainRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Routes>
    </>
  );
};

export default MainRouter;
