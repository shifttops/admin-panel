import { Route, Switch, BrowserRouter } from "react-router-dom";
import styles from "./store-list-page.module.scss";
import routes from "constants/routes";
import TableHead from "components/tables/TableHead";
import TableRow from "components/tables/TableRow";
import DashboardHead from "components/header/DashboardHead";
import StoreInfo from "pages/StoreListPage/innerPages/StoreInfo/StoreInfo";
import { ConfigIcon } from "icons";
import statusButtonTypes from "types/statusButtonTypes";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

export default function StoreListPage(params) {
  const [restaurants, setRestaurants] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const resp = await fetch('https://mcd.avaich.com/api/get_storelist', {
          method: 'GET',
          headers: {
            'Authorization': `jwt ${cookies.token}`
          }
        });
        const res = await resp.json();
        setRestaurants(res);
        setError('');
      }
      catch(e){
        setError(e.message);
      }
    }
    fetchData();
  }, [])

  return (
    <BrowserRouter>
      <div className={styles.dashboard__wrapper}>
        <Switch>
          <Route path={routes.storeInfo} component={StoreInfo} />
          {/* <StoreInfo /> */}
          <Route path={routes.home}>
            <DashboardHead />
            <table className={styles.table}>
              <TableHead th="Region" />
              <tbody>
                {
                  restaurants.map(restaurant => (
                    <TableRow status="Algorithm Configuration"
                      key={restaurant.store_id}
                      id={restaurant.store_id}
                      address={restaurant.address}
                      region={restaurant.location}
                      type={restaurant.type}
                      date_deployed={restaurant.date_of_deployment}
                      date_ready_deployed={restaurant.ready_for_deployment}
                      status={restaurant.deployed ? "Deployed" : restaurant.under_maintance ? 'Under Maintance' : 'Test'} />
                  ))
                }
                <TableRow status="Deployed" />
                <TableRow status="Test" />
                <TableRow status="Deployment" />
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
