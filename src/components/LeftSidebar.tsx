import "./LeftSidebar.css";

interface LSidebarProps {
  width: number;
}

export default function LeftSidebar({ width }: LSidebarProps) {
  return (
    <div className="sidebar-left" style={{ width: width }}>
      <div className="ls-top-zone"></div>
    </div>
  );
}
