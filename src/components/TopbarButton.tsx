import { MouseEventHandler } from "react";
import "./TopbarButton.css";

interface TopbarButtonProps {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  aria?: string;
}

export default function TopbarButton({
  name,
  onClick = (e) => {},
  aria = "",
}: TopbarButtonProps) {
  const icon = <i className={"bi-" + name} aria-hidden="true"></i>;
  if (aria === "") {
    return (
      <button className="topbar-button" onClick={onClick} aria-hidden="true">
        {icon}
      </button>
    );
  } else {
    return (
      <button className="topbar-button" onClick={onClick} aria-label={aria}>
        {icon}
      </button>
    );
  }
}
