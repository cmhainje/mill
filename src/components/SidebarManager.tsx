import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import TopbarButton from "./TopbarButton";

import "./SidebarManager.css";

const MIN_WIDTH_L = 40;
const MIN_WIDTH_M = 40;
const MIN_WIDTH_R = 40;

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
      const maxWidth = window.innerWidth - widthL - MIN_WIDTH_M;
      setWidthR(clamp(newWidth, MIN_WIDTH_R, maxWidth));
    } else {
      const newWidth = x;
      const maxWidth = window.innerWidth - widthR - MIN_WIDTH_M;
      setWidthL(clamp(newWidth, MIN_WIDTH_L, maxWidth));
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

  function leftSidebarButtonContainerWidth(): number {
    return Math.max(visL ? widthL : 0, 24);
    // return Math.max(visL ? widthL : 0, 74 + 24);
  }

  function rightSidebarButtonContainerWidth(): number {
    return Math.max(visR ? widthR : 0, 24);
  }

  return (
    <>
      <div
        className="left-sidebar-button"
        style={{ width: leftSidebarButtonContainerWidth() }}
      >
        <TopbarButton
          name="layout-sidebar"
          aria="Toggle left sidebar"
          onClick={(e) => setVisL(!visL)}
        />
      </div>
      <div
        className="right-sidebar-button"
        style={{ width: rightSidebarButtonContainerWidth() }}
      >
        <TopbarButton
          name="layout-sidebar-reverse"
          aria="Toggle right sidebar"
          onClick={(e) => setVisR(!visR)}
        />
      </div>
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
    </>
  );
}
