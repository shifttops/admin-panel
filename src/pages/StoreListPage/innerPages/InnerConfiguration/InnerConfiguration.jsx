import styles from "./inner-configuration.module.scss";
import SearchQuick from "components/search/SearchQuick";
import Button from "components/buttons/Button";
import ConfItem from "../../../../components/ConfItem";
import { observer } from "mobx-react";
import StoresStore from "../../../../store/StoresStore";
import { useEffect, useState } from "react";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import Loader from "../../../../components/Loader";
import { getFileName } from "../../../../helpers/functions";
import { PinFileIcon } from "../../../../icons";
import FileUploaded from "../../../../components/FileUploaded";

const InnerConfiguration = observer((props) => {
  const {
    storeInfo,
    configurationFiles,
    isConfigurationFilesFetching: isLoading,
    downloadMinioFile,
  } = StoresStore;

  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (storeInfo.store_id === +props.match.params.id) {
      configurationFiles.set(null);
    }

    return () => configurationFiles.set([]);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headSearch}>
          <h2 className={styles.title}>Configuration</h2>
          <SearchQuick setSearch={setSearch} />
        </div>
        <div className={styles.buttons}>
          {file ? (
            <div className={styles.upload__file}>
              <FileUploaded
                onRemove={() => setFile(null)}
                fileName={file.name}
              />
            </div>
          ) : null}
          <label className={styles.upload__label}>
            <div className={styles.upload__icon}>
              <PinFileIcon />
            </div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <Button type={"button"} text="Upload file" />
        </div>
      </div>
      {!isLoading &&
      configurationFiles &&
      configurationFiles.get() &&
      configurationFiles.get().length &&
      configurationFiles
        .get()
        .filter(({ filename }) => getFileName(filename, "/").includes(search))
        .length ? (
        <table className={styles.table}>
          <tr>
            <th />
            <th>Name</th>
            {/*<th>Last update</th>*/}
            <th>Added</th>
            {/*<th />*/}
          </tr>
          <tbody>
            {/*<ConfItem Icon={PauseIcon} iconColor={iconButtonTypes.red} />
            <ConfItem Icon={PlayIcon} iconColor={iconButtonTypes.green} />*/}
            {configurationFiles
              .get()
              .filter(({ filename }) =>
                getFileName(filename, "/").includes(search)
              )
              .map((file) => (
                <ConfItem file={file} download={downloadMinioFile} />
              ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.loader}>
          {isLoading ? (
            <Loader types={["medium"]} />
          ) : configurationFiles.get() &&
            !configurationFiles
              .get()
              .filter(({ filename }) =>
                getFileName(filename, "/").includes(search)
              ).length ? (
            "No files founded"
          ) : (
            "No configuration files on this store"
          )}
        </div>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default InnerConfiguration;
