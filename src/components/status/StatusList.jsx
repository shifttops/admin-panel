export default function StatusList() {
  return (
    <ul className="status-change">
      <li className="status-change__item status-change__item--green">
        Deployed
      </li>
      <li className="status-change__item status-change__item--green">
        Deployment
      </li>
      <li className="status-change__item status-change__item--green">
        Ready for deployment
      </li>
      <li className="status-change__item status-change__item--yellow">
        Algorithm Configuration
      </li>
      <li className="status-change__item status-change__item--yellow">Test</li>
      <li className="status-change__item status-change__item--error">
        Under Maintenance
      </li>
    </ul>
  );
}
