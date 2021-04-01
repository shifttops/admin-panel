import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import mainNavigation from "./../constants/main-navigation";
import HeaderDashboard from "../components/header/HeaderDashboard";

export default function CustomRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOverlap, setIsSidebarOverlap] = useState(false);

  const sidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
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
  );
}
