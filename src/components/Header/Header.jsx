import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";

import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import UserContext from "../../contexts/UserContext";

function Header({
  handleAddClick,
  weatherData,
  isMobileMenuActive,
  setIsMobileMenuActive,
  isMobile,
  isProfilePage,
  handleSignupClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(UserContext);

  const handleMobileMenuClick = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <header className={`header ${isProfilePage ? "header__profile" : ""}`}>
      <Link to="/">
        <img
          className={`header__logo ${
            isMobileMenuActive ? "header__hidden" : ""
          }`}
          src={logo}
          alt="logo"
        />
      </Link>
      <button
        onClick={handleMobileMenuClick}
        type="button"
        className={`header__mobile-menu-btn ${
          isMobileMenuActive ? "header__hidden" : ""
        }`}
      ></button>
      <p
        className={`header__date-and-location ${
          isMobileMenuActive ? "header__hidden" : ""
        }`}
      >
        {currentDate}, {weatherData.city}
      </p>
      {!isMobileMenuActive && !isMobile && (
        <ToggleSwitch className="header__toggle-switch" />
      )}
      {isLoggedIn && (
        <div className="header__authorized-view">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__user-name">{currentUser.name}</p>
              {currentUser.avatar && (
                <img
                  className="header__user-avatar"
                  src={currentUser.avatar}
                  alt="User Avatar"
                ></img>
              )}
              {!currentUser.avatar && (
                <p className="header__user-avatar-placeholder">
                  {currentUser.name[0]}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}

      {!isLoggedIn && (
        <ul className="header__unauthorized-view">
          <li className="header__unauthorized-item">
            <button
              onClick={handleSignupClick}
              className="header__unauthorized-btn"
            >
              Sign Up
            </button>
          </li>
          <li className="header__unauthorized-item">
            <button
              onClick={handleLoginClick}
              className="header__unauthorized-btn"
            >
              Log In
            </button>
          </li>
        </ul>
      )}
      {isMobileMenuActive && isLoggedIn && (
        <div className="header__mobile-menu_active">
          <button
            onClick={handleMobileMenuClick}
            type="button"
            className="header__mobile-close-btn"
          ></button>
          <div className="header__mobile-user-container">
            <Link to="/profile" className="header__mobile-link">
              <p className="header__mobile-user-name">{currentUser.name}</p>
            </Link>
            {currentUser.avatar && (
              <img
                className="header__mobile-user-avatar"
                src={currentUser.avatar}
                alt="User Avatar"
              ></img>
            )}
            {!currentUser.avatar && (
              <p className="header__mobile-user-avatar-placeholder">
                {currentUser.name[0]}
              </p>
            )}
          </div>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__mobile-add-clothes-btn"
          >
            + Add Clothes
          </button>
          <ToggleSwitch className="header__mobile-toggle-switch" />
        </div>
      )}
    </header>
  );
}

export default Header;
