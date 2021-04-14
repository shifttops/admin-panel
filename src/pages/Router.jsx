import { Redirect, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import Sidebar from "components/sidebar";
import HeaderDashboard from "components/header/HeaderDashboard";
import mainNavigation from "constants/main-navigation";
import LoginPage from "pages/LoginPage/LoginPage";
import routes from "constants/routes";
import NewPasswordPage from "pages/NewPasswordPage";
import EmailSendPage from "pages/EmailSendPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";

export default function CustomRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOverlap, setIsSidebarOverlap] = useState(false);

  const [cookies, setCookie] = useCookies(['token']);

  const sidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
    <Switch>
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
      <Route>
        <div className="wrapper">
          <Sidebar isOpen={isSidebarOpen} isOverlap={isSidebarOverlap} />
          <div className="dashboard">
            <HeaderDashboard sidebarToggle={sidebarToggle} />
            <Switch>
              {mainNavigation.map(({ to, component }) => (
                <Route path={to} component={component} key={to} />
              ))}
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
    {!cookies.token ? <Redirect to={routes.login}/> : <Redirect to={routes.home}/>}
    </>
  );
}
