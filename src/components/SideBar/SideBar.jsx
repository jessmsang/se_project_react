import "./SideBar.css";
import userAvatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__user-avatar"
          src={userAvatar}
          alt="Terrance Tegegne"
        ></img>
        <p className="sidebar__user-name">Terrance Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;
