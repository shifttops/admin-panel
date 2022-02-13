import { observer } from "mobx-react";
import styles from "./add-ticket-page.module.scss";
import BackLink from "../../components/BackLink";
import routes from "../../constants/routes";
import React, { useEffect, useState } from "react";
import {
  ticketPriorityMapper,
  ticketReasonMapper,
  ticketTypesMapper,
} from "../../helpers/mappers";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddTicketFormItem from "../../components/forms/AddTicketFormItem";
import { AttachIcon, CloseIcon, PinFileIcon } from "../../icons";
import ButtonIcon from "../../components/buttons/ButtonIcon";
import {
  getFileFormat,
  getFileName,
  getIconForFile,
  getTypeIconForFile,
} from "../../helpers/functions";
import cn from "classnames";
import { FileDrop } from "react-file-drop";
import "../../components/Chat/ChatInput/file-drop.scss";
import TicketsStore from "../../store/TicketsStore";
import { useHistory } from "react-router-dom";
import FileUploaded from "../../components/FileUploaded";

const AddTicketPage = observer(() => {
  const history = useHistory();

  const {
    addTicket,
    isTicketAddFetching,
    assigneeList,
    isAssigneeListFetching,
  } = TicketsStore;

  const [files, setFiles] = useState([]);
  const [isFileDropVisible, setIsFileDropVisible] = useState(false);
  const [addTicketFormMapper, setMapper] = useState([
    {
      label: "Choose type",
      field: "type",
      required: true,
      type: "select",
      mapper: ticketTypesMapper,
    },
    {
      label: "Choose assignee",
      field: "assignee",
      required: false,
      type: "select",
      mapper: assigneeList.get().length
        ? assigneeList.get().map((user) => ({
            name: user.pk,
            visibleName:
              user.first_name.length && user.last_name.length
                ? `${user.first_name} ${user.last_name}`
                : user.username,
          }))
        : [],
    },
    {
      label: "Choose stores",
      field: "stores",
      required: true,
      type: "select",
    },
    {
      label: "Choose priority",
      field: "priority",
      required: true,
      type: "select",
      mapper: ticketPriorityMapper,
    },
    {
      label: "Choose reason",
      field: "reason",
      required: true,
      type: "select",
      mapper: ticketReasonMapper,
    },
    {
      label: "Describe the problem",
      field: "description",
      required: true,
      type: "textarea",
    },
  ]);

  const handleDragFiles = (e) => {
    setFiles([...files, ...Array.from(e)]);
    setIsFileDropVisible(false);
  };

  const handleRemoveFile = (file) => {
    const newFiles = [...files];

    newFiles.splice(
      files.indexOf(files.find((item) => item.name === file.name)),
      1
    );

    setFiles(newFiles);
  };

  const handleChooseFiles = (e) =>
    setFiles([...files, ...Array.from(e.target.files)]);

  const createSchema = () => {
    return Yup.object(
      addTicketFormMapper
        .filter((item) => item.required === true)
        .reduce((result, { field }) => {
          if (field === "stores") result[field] = Yup.array().min(1).required();
          else result[field] = Yup.string().required("This field is required");
          return result;
        }, {})
    );
  };

  const onSubmit = async (values) => {
    const { status, id } = await addTicket({
      data: { ...values, files: [...files] },
    });
    if (status === 201) history.push(`/tickets/${id}`);
  };

  const formik = useFormik({
    initialValues: addTicketFormMapper.reduce((result, { field }) => {
      if (field === "stores") result[field] = [];
      else result[field] = "";
      return result;
    }, {}),
    validationSchema: createSchema(),
    onSubmit,
  });

  useEffect(() => {
    const newMapper = [...addTicketFormMapper];

    if (assigneeList.get().length)
      newMapper.splice(1, 1, {
        label: "Choose assignee",
        field: "assignee",
        required: false,
        type: "select",
        mapper: assigneeList.get().map((user) => ({
          name: user.pk,
          visibleName:
            user.first_name.length && user.last_name.length
              ? `${user.first_name} ${user.last_name}`
              : user.username,
        })),
      });

    if (
      formik.values["type"] === "OTHER_TYPE" &&
      !newMapper.filter((item) => item.field === "other_type").length
    )
      newMapper.push({
        label: "Other type",
        field: "other_type",
        required: true,
        type: "input",
      });

    if (
      formik.values["type"] !== "OTHER_TYPE" &&
      newMapper.filter((item) => item.field === "other_type").length
    )
      newMapper.splice(-1, 1);

    setMapper(newMapper);
  }, [assigneeList.get(), formik.values]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BackLink path={routes.tickets} text={"Back to tickets list"} />
        <div className={styles.header__info}>
          <h2 className={styles.title}>Add ticket</h2>
        </div>
      </div>
      <div className={styles.body}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {addTicketFormMapper.map(({ label, field, type, mapper }) => (
            <AddTicketFormItem
              label={label}
              field={field}
              values={formik.values}
              setValues={formik.setValues}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values ? formik.values[field] : null}
              type={type ? type : null}
              mapper={mapper ? mapper : null}
              touched={
                Object.keys(formik.touched).length &&
                Object.keys(formik.touched).find((touch) => touch === field)
                  ? formik.touched[field]
                  : null
              }
              error={
                Object.keys(formik.errors).length &&
                Object.keys(formik.errors).find((error) => error === field)
                  ? formik.errors[field]
                  : null
              }
              isAssigneeListFetching={isAssigneeListFetching}
            />
          ))}
          {files.length ? (
            <div className={styles.files}>
              {files.map((file) => (
                <FileUploaded
                  fileName={file.name}
                  onRemove={() => handleRemoveFile(file)}
                />
              ))}
            </div>
          ) : null}
          <label
            htmlFor="addTicketFiles"
            className={cn(styles.files__label, styles.fileDrop)}
          >
            <FileDrop
              className={cn("file-drop", { ["visible"]: isFileDropVisible })}
              onFrameDragEnter={() => setIsFileDropVisible(true)}
              onFrameDragLeave={() => setIsFileDropVisible(false)}
              onFrameDrop={() => setIsFileDropVisible(false)}
              onDrop={(e) => handleDragFiles(e)}
            >
              Drop files here!
            </FileDrop>
            <div className={styles.icon}>
              <PinFileIcon />
            </div>
            <span>Pin files or drag here</span>
          </label>
          <input
            className={styles.files__label__input}
            id="addTicketFiles"
            type="file"
            onChange={handleChooseFiles}
            multiple
          />
          <Button
            fetching={isTicketAddFetching}
            type="submit"
            text={"Add ticket"}
          />
        </form>
      </div>
    </div>
  );
});

export default AddTicketPage;
