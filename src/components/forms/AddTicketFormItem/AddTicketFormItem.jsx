import cn from "classnames";
import styles from "./add-ticket-label.module.scss";
import Select from "../../Select";
import DatePicker from "react-datepicker";
import "./customDatePicker.scss";
import StoresSelect from "../../StoresSelect";

const AddTicketFormItem = ({
  label,
  field,
  error,
  type,
  onChange,
  value,
  onBlur,
  touched,
  values,
  setValues,
  mapper,
  isAssigneeListFetching,
}) => (
  <label
    key={`${field}`}
    className={cn(styles.label, {
      [styles.label__withError]: touched && error,
    })}
  >
    <span className={styles.label__title}>{label}</span>
    <div className={cn(styles.input, { [styles.error]: touched && error })}>
      {type === "textarea" ? (
        <textarea
          onBlur={onBlur}
          id={field}
          name={field}
          onChange={onChange}
          value={value}
        />
      ) : type === "input" ? (
        <input
          onBlur={onBlur}
          id={field}
          name={field}
          onChange={onChange}
          value={value}
        />
      ) : type === "select" ? (
        field !== "stores" ? (
          <Select
            mapper={mapper}
            value={value}
            values={values}
            setValues={setValues}
            field={field}
            isError={touched && error}
            isFetching={field === "assignee" && isAssigneeListFetching}
          />
        ) : (
          <StoresSelect
            values={values}
            setValues={setValues}
            isError={touched && error}
          />
        )
      ) : type === "date" ? (
        <div className={styles.datePicker}>
          <DatePicker
            selected={value}
            showTimeSelect
            onChange={(date) => {
              const newValues = { ...values };
              newValues[field] = date;
              setValues(newValues);
            }}
            dateFormat="dd.MM.yyyy, HH:mm"
          />
        </div>
      ) : null}
    </div>
    {error ? (
      <p className={styles.errorBlock}>{touched && error ? error : null}</p>
    ) : null}
  </label>
);

export default AddTicketFormItem;
