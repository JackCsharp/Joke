import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { publicroutes, privateroutes } from "../../../Router/routes";
import React, { useEffect, useState } from "react";
import NavigationButton from "../Button/NavigationButton";
import { AuthContext } from "../../../Context";
const AppRouter = () => {
  const [isAutorized, setIsAutorized] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsAutorized(true);
      const stringId = localStorage.getItem("userId");
      const numberId = parseInt(stringId, 10);
      setUserId(numberId);
    }
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ isAutorized, setIsAutorized, userId, setUserId }}
      >
        <BrowserRouter>
          <div className="navpanel">
            <div className="routepanel">
              <Link to="/home">
                <NavigationButton>Home</NavigationButton>
              </Link>
              <Link to="/jokes">
                <NavigationButton>Jokes</NavigationButton>
              </Link>
              <Link to="/guilds">
                <NavigationButton>Guilds</NavigationButton>
              </Link>
            </div>
            {isAutorized ? (
              <div>
                <Link to="/profile">
                  <NavigationButton>Profile</NavigationButton>
                </Link>
              </div>
            ) : (
              <div className="authpanel">
                <Link to="/auth">
                  <NavigationButton>Log In</NavigationButton>
                </Link>
                <Link to="/register">
                  <NavigationButton>Register</NavigationButton>
                </Link>
              </div>
            )}
          </div>
          {isAutorized ? (
            <Routes>
              {privateroutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
              ))}
            </Routes>
          ) : (
            <Routes>
              {publicroutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
              ))}
            </Routes>
          )}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default AppRouter;
