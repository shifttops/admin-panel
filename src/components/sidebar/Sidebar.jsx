import { Link } from "react-router-dom";
import routes from "../../constants/routes";

export default function Sidebar(params) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={routes.home}>Home</Link>
        </li>
        <li>
          <Link to={routes.users}>Users</Link>
        </li>
        <li>
          <Link to={routes.setting}>Settings</Link>
        </li>
        <li>
          <Link to={routes.files}>Files</Link>
        </li>
        <li>
          <Link to={routes.logs}>Activity logs</Link>
        </li>
        <li>
          <Link to={routes.groups}>Store groups</Link>
        </li>
      </ul>
    </div>
  );
}
