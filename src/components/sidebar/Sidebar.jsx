import { Link } from "react-router-dom";

export default function Sidebar(params) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/setting">Settings</Link>
        </li>
        <li>
          <Link to="/files">Files</Link>
        </li>
        <li>
          <Link to="/logs">Activity logs</Link>
        </li>
        <li>
          <Link to="/groups">Store groups</Link>
        </li>
      </ul>
    </div>
  );
}
