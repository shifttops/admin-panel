import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react";

import HeaderDashboard from "components/header/HeaderDashboard";
import mainNavigation from "constants/main-navigation";
import LoginPage from "pages/LoginPage/LoginPage";
import routes from "constants/routes";
import NewPasswordPage from "pages/NewPasswordPage";
import EmailSendPage from "pages/EmailSendPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import Sidebar from "components/sidebar";
import { innerNavigation } from "constants/inner-navigation";
import InnerHead from "components/header/InnerHead";
import InnerSidebar from "components/InnerSidebar";
import styles from "./styles.module.scss";
import { innerNavigationScripts } from "../constants/inner-navigation";

export default function CustomRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOverlap, setIsSidebarOverlap] = useState(false);

  const sidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
    if (
      new RegExp(`${routes.home}\/.+`).test(location.pathname) &&
      isSidebarOpen
    ) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Switch>
        {localStorage.getItem("access") &&
          localStorage.getItem("access") !== "undefined" && (
            <Redirect from="/" exact to={routes.home} />
          )}
        <Route exact path={routes.login}>
          <LoginPage />
        </Route>
        <Route exact path={routes.newPassword}>
          <NewPasswordPage />
        </Route>
        <Route exact path={routes.emailSend}>
          <EmailSendPage />
        </Route>
        <Route exact path={routes.forgotPassword}>
          <ForgotPasswordPage />
        </Route>
        <div className="wrapper">
          <Sidebar isOpen={isSidebarOpen} isOverlap={isSidebarOverlap} />
          <div className="dashboard">
            <HeaderDashboard sidebarToggle={sidebarToggle} />
            {mainNavigation.map(({ to, component }) => (
              <Route
                path={to}
                exact
                component={() => <>{component}</>}
                key={to}
              ></Route>
            ))}
            {innerNavigation.map(({ to, component }) => (
              <Route
                path={`${to}/:id`}
                exact
                key={to}
                component={(props) => (
                  <div className={styles.inner}>
                    <InnerSidebar {...props} />
                    <div className={styles.wrapper}>
                      <InnerHead />
                      <div>{component}</div>
                    </div>
                  </div>
                )}
              ></Route>
            ))}
            {innerNavigationScripts.map(({ to, component }) => (
              <Route
                path={to}
                exact
                key={to}
                component={(props) => (
                  <div className={styles.inner}>
                    <InnerSidebar links={innerNavigationScripts}  {...props}/>
                    <div className={styles.wrapper}>{component}</div>
                  </div>
                )}
              ></Route>
            ))}
          </div>
        </div>
      </Switch>
      {(!localStorage.getItem("access") ||
        localStorage.getItem("access") === "undefined") && (
        <Redirect to={routes.login} />
      )}
      {/* ) : (
        <Redirect to={routes.home} />
    )} */}
    </>
  );
}
