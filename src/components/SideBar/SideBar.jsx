import { useContext } from "react";
import "./SideBar.css";
import UserContext from "../../contexts/UserContext";

function SideBar({ isMobile, isMobileMenuActive, handleEditProfileClick }) {
  const { currentUser, handleLogout } = useContext(UserContext);

  return (
    <div className="sidebar">
      {!isMobile && (
        <div className="sidebar__user-container">
          {currentUser.avatar && (
            <img
              className="sidebar__user-avatar"
              src={currentUser.avatar}
              alt="User Avatar"
            ></img>
          )}
          {!currentUser.avatar && (
            <p className="sidebar__user-avatar-placeholder">
              {currentUser.name[0]}
            </p>
          )}
          <p className="sidebar__user-name">{currentUser.name}</p>
        </div>
      )}
      {isMobile && (
        <div className="sidebar__avatar-container">
          {currentUser.avatar && (
            <img
              className="sidebar__user-avatar"
              src={currentUser.avatar}
              alt="User Avatar"
            ></img>
          )}
          {!currentUser.avatar && (
            <p className="sidebar__user-avatar-placeholder">
              {currentUser.name[0]}
            </p>
          )}
        </div>
      )}
      <ul className="sidebar__text-container">
        {isMobile && (
          <li>
            <p className="sidebar__user-name">{currentUser.name}</p>
          </li>
        )}
        <li className="sidebar__item">
          <button
            type="button"
            className="sidebar__btn"
            onClick={handleEditProfileClick}
          >
            Change profile data
          </button>
        </li>
        <li className="sidebar__item">
          <button type="button" className="sidebar__btn" onClick={handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
