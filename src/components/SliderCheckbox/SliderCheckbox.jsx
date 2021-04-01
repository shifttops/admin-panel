import "./slider-checkbox.scss";

export default function SliderCheckbox() {
  return (
    <div className={"wrapperCheckbox"}>
      <div className={"switcher"}>
        <label>
          <small className={"label"}>Cameras #53</small>
          <input type="checkbox" value="" />
          <span>
            <small></small>
          </span>
        </label>
      </div>
    </div>
  );
}
