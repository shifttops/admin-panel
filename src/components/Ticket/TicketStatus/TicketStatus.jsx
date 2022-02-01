import React, { useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./ticket-status.module.scss";
import { ticketStatusMapper } from "../../../helpers/mappers";
import { useState } from "react";
import { ArrowDownIcon } from "../../../icons";

const TicketStatus = ({
  className,
  haveDropDown,
  centered = false,
  currentStatus,
  setCurrentStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className={cn(styles.body, { [styles.centered]: centered })}>
      <div
        className={cn(
          styles.status,
          {
            [styles.dropdown]: haveDropDown,
          },
          className,
          currentStatus.className
        )}
        onClick={
          haveDropDown ? () => setIsOpen((prevState) => !prevState) : null
        }
      >
        {currentStatus.visibleName}
        <span>
          {haveDropDown ? (
            <ArrowDownIcon isOpen={isOpen} color={"#f9f9f9"} />
          ) : null}
        </span>
      </div>
      <div
        className={cn(styles.dropdown__body, {
          [styles.dropdown__body__visible]: isOpen,
        })}
      >
        {ticketStatusMapper.map((ticketStatus) => (
          <div
            key={ticketStatus.name}
            onClick={() => {
              if (isOpen) {
                setCurrentStatus(ticketStatus);
                setIsOpen(false);
              }
            }}
            className={cn(styles.item, {
              [styles.item__current]: currentStatus.name === ticketStatus.name,
            })}
          >
            {ticketStatus.visibleName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStatus;
