import styles from "./group-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import {
  AddGroupIcon,
  ArrowDownIcon,
  DeleteIcon,
  MoreIcon,
  RatingIcon,
  ReturnGroupIcon,
} from "icons";
import Button from "components/buttons/Button";
import { Link } from "react-router-dom";
import Checkbox from "components/Checkbox";
import AccessButton from "components/buttons/AccessButton";

export default function GroupPage() {
  return (
    <div className="page">
      <Link className={styles.back} to="/">
        Back to Store groups
      </Link>
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>McD stores</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <ButtonIcon Icon={ReturnGroupIcon} className={styles.btnDisabled} />
          <ButtonIcon Icon={AddGroupIcon} className={styles.btnDisabled} />
          <ButtonIcon Icon={DeleteIcon} className={styles.btnDelete} />
          <Button text="Create group" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="rank" />
            </th>
            <th>Store name</th>
            <th>Region</th>
            <th>Location</th>
            <th>Added</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.firstRank} label="#1" />
            </td>
            <td>
              20209
              <div className={styles.ratingUp}>
                <RatingIcon /> 1
                <div className={styles.ratingDown}>
                  <RatingIcon /> 2
                </div>
              </div>
            </td>
            <td>Maria-Probst-Straße 1</td>
            <td>München</td>
            <td>21.03.21</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.firstRank} label="#2" />
            </td>
            <td>
              20209
              <div className={styles.ratingUp}>
                <RatingIcon /> 1
                <div className={styles.ratingDown}>
                  <RatingIcon /> 2
                </div>
              </div>
            </td>
            <td>Maria-Probst-Straße 1</td>
            <td>München</td>
            <td>21.03.21</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.firstRank} label="#3" />
            </td>
            <td>
              20209
              <div className={styles.ratingUp}>
                <RatingIcon /> 1
                <div className={styles.ratingDown}>
                  <RatingIcon /> 2
                </div>
              </div>
            </td>
            <td>Maria-Probst-Straße 1</td>
            <td>München</td>
            <td>21.03.21</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="#4" />
            </td>
            <td>
              20209
              <div className={styles.ratingUp}>
                <RatingIcon /> 1
                <div className={styles.ratingDown}>
                  <RatingIcon /> 2
                </div>
              </div>
            </td>
            <td>Maria-Probst-Straße 1</td>
            <td>München</td>
            <td>21.03.21</td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
