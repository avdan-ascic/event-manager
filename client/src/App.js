import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { isAuthenticated } from "./api/user-api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainRouter from "./MainRouter";
import { emitEvent } from "./api/socket-api";

export const UserContext = createContext(null);

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    if (componentMounted) {
      isAuthenticated().then((data) => {
        if (data?.user) {
          setLoggedIn(true);
          setUserInfo({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
          });
          emitEvent("setup", data.user.id);
        }
      });
    } else {
      setComponentMounted(true);
    }
    // eslint-disable-next-line
  }, [componentMounted]);

  return (
    <UserContext.Provider
      value={{ loggedIn, setLoggedIn, userInfo, setUserInfo }}
    >
      <BrowserRouter>
        <ToastContainer position="bottom-left" />
        <MainRouter />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
