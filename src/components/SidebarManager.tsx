import { useState } from "react";
import "./SidebarManager.css";
import LeftSidebar from "./LeftSidebar";

const MIN_SIDEBAR_WIDTH = 40;
const MIN_MAIN_WIDTH = 20;

function clamp(x: number, lo: number, hi: number) {
  if (lo > hi) {
    const temp = hi;
    hi = lo;
    lo = temp;
  }
  return Math.max(lo, Math.min(x, hi));
}

export default function SidebarManager() {
  const [visL, setVisL] = useState(true);
  const [visR, setVisR] = useState(true);
  const [widthL, setWidthL] = useState(200);
  const [widthR, setWidthR] = useState(200);

  function resize(right: boolean, event: MouseEvent) {
    const x = Math.max(0, Math.min(event.x, window.innerWidth));

    if (right) {
      const newWidth = window.innerWidth - x;
      const maxWidth = window.innerWidth - widthL - MIN_MAIN_WIDTH;
      setWidthR(clamp(newWidth, MIN_SIDEBAR_WIDTH, maxWidth));
    } else {
      const newWidth = x;
      const maxWidth = window.innerWidth - widthR - MIN_MAIN_WIDTH;
      setWidthL(clamp(newWidth, MIN_SIDEBAR_WIDTH, maxWidth));
    }
  }

  function startResize(right: boolean) {
    console.log(`started resizing on ${right ? "right" : "left"}`);

    const res = (event: MouseEvent) => resize(right, event);
    const end = () => endResize();

    document.addEventListener("mousemove", res, false);
    document.addEventListener("mouseup", end, false);
    document.addEventListener("selectstart", disableSelect, false);
    document.body.style.cursor = "ew-resize";

    function disableSelect(selectEvent: Event) {
      selectEvent.preventDefault();
    }

    function endResize() {
      document.removeEventListener("mousemove", res, false);
      document.removeEventListener("mouseup", end, false);
      document.removeEventListener("selectstart", disableSelect, false);
      document.body.style.cursor = "default";
    }
  }

  return (
    <div className="sidebar-manager">
      {visL && (
        <>
          <LeftSidebar width={widthL} />

          <div
            className="sidebar-handle"
            onMouseDown={(e) => startResize(false)}
          ></div>
        </>
      )}
      <div className="main"></div>
      {visR && (
        <>
          <div
            className="sidebar-handle"
            onMouseDown={(e) => startResize(true)}
          ></div>
          <div className="sidebar-right" style={{ width: widthR }}></div>
        </>
      )}
    </div>
  );
}
