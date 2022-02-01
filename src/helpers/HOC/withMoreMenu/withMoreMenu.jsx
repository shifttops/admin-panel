import { useState } from "react";
import ButtonIcon from "../../../components/buttons/ButtonIcon";
import { MoreIcon } from "../../../icons";
import MoreMenu from "../../../components/MoreMenu";

export default function withMoreMenu({ Component, ...props }) {
  const ComponentWithMenu = () => {
    const [isMoreShown, setIsMoreShown] = useState(false);

    const { componentProps, ...menuProps } = props;

    return (
      <>
        <Component {...componentProps} />
        <ButtonIcon
          Icon={MoreIcon}
          onClick={() => setIsMoreShown((prevState) => !prevState)}
        />
        <MoreMenu
          setIsMoreShown={setIsMoreShown}
          isVisible={isMoreShown}
          {...menuProps}
        />
      </>
    );
  };

  return <ComponentWithMenu />;
}
