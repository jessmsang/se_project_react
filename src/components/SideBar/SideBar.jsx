import "./SideBar.css";
import userAvatar from "../../assets/avatar.svg";

function SideBar({ isMobile, isMobileMenuActive }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__user-avatar"
          src={userAvatar}
          alt="Terrance Tegegne"
        ></img>
        <div className="sidebar__text-container">
          <p className="sidebar__user-name">Terrance Tegegne</p>
          {isMobile && (
            <div
              className={`sidebar__mobile ${
                isMobileMenuActive ? "sidebar__hidden" : ""
              }`}
            >
              <button type="button" className="sidebar__mobile-btns">
                Change profile data
              </button>
              <button type="button" className="sidebar__mobile-btns">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
