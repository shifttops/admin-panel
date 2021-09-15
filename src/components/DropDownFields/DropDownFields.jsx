import styles from "./dropdown_fields.module.scss";
import { ArrowDownIcon } from "icons";
import cn from "classnames";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import { useState } from "react";

const DropDownFields = observer ( ({field, serverIndex}) => {
  const {storeInfo} = StoresStore;
  const [isOpen , setOpen] = useState ( false );

  return (
      <div className={ styles.dropdownHead }>
        <button onClick={ (e) => {
          setOpen((prev) => !prev);

          e.preventDefault();
          e.stopPropagation();
        } }>
          <div className={ styles.item_row }>
            <p className={ cn ( styles.category , styles.categoryDropdown ) }>
              { field.visibleName }
              <ArrowDownIcon isOpen={isOpen}/>
            </p>
            <div className={ styles.temp_info }>
              { field.items
                  .filter ( (item) => item.icon )
                  .map ( (item) => (
                      <div className={ styles.resultInfo }>
                        <div
                            className={
                              item.keyName.includes ( "temp" ) ? styles.temp : styles.process
                            }
                            key={ item.keyName }
                        >
                          { item.icon }
                          <span>
                    { storeInfo[item.keyName] === 0 || storeInfo[item.keyName]
                        ? `${ Math.round ( storeInfo[item.keyName] ) } ${
                            item.keyName.includes ( "util" ) ? "%" : ""
                        }`
                        : "" }
                  </span>
                        </div>
                      </div>
                  ) ) }
            </div>
          </div>
        </button>
        <div className={ styles.dropdown }>
          { isOpen ? (
                field.items.map (
                    (item) => {
                      if (item.items) {
                        return <DropDownFields serverIndex={serverIndex} field={ item } key={ item.visibleName }/>
                      } else {
                        if (!item.icon) {
                          return (
                            <div className={styles.item}>
                              <p className={styles.category}>
                                {item.visibleName}
                              </p>
                              <span className={styles.result}>
                                {storeInfo.servers[serverIndex][item.keyName] ? storeInfo.servers[serverIndex][item.keyName].toString() : "N/A" }
                              </span>
                            </div>
                          );
                        }
                      }
                    }
                )
          ) : (
              ""
          )}
        </div>
      </div>
);
} );

export default DropDownFields;
