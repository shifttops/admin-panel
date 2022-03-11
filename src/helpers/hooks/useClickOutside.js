import React, { useEffect } from "react";

const useClickOutside = ({ ref, onClickOutside }) => {
  useEffect(() => {
    const onClick = (e) => {
      if (ref && !ref.current.contains(e.target)) onClickOutside();
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);
};

export default useClickOutside;
