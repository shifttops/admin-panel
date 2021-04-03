import styles from "./store-info.module.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import innerNavigation from "constants/inner-navigation";
import InnerHead from "components/header/InnerHead";
import InnerSidebar from "components/InnerSidebar";

export default function StoreInfo() {
  return (
    <BrowserRouter>
      <div className={styles.inner}>
        <div>
          <InnerSidebar />
        </div>
        <div className={styles.wrapper}>
          <InnerHead />
          <div>
            <Switch>
              {innerNavigation.map(({ to, component }) => (
                <Route path={to} key={to} component={component} />
              ))}
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
