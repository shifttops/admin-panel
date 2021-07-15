import { useHistory } from "react-router-dom";
import routes from "../constants/routes";

export const refreshToken = async () => {
  // const history = useHistory();
  console.log(1231233123);

  console.log(+localStorage.getItem("date") < +new Date(), +localStorage.getItem("refresh_date") , +new Date());
  try {
    if (+localStorage.getItem("date") < +new Date()) {
      if (+localStorage.getItem("refresh_date") < +new Date()) {
        // history.push(routes.login);
        window.location.href = routes.login;
      } else {
        const resp = await fetch(
          "https://staptest.mcd-cctv.com/token_refresh/",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              refresh: localStorage.getItem("refresh"),
            }),
          }
        );
        const res = await resp.json();
        console.log(123123131231);
        localStorage.setItem("access", res.access);
        localStorage.setItem("date", +new Date() + 300 * 1000 - 1000);
        return res;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
