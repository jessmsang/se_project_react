import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import userAvatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isMobileMenuActive,
  setIsMobileMenuActive,
  isMobile,
  isProfilePage,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">Terrance Tegegne</p>
          <img
            className="header__user-avatar"
            src={userAvatar}
            alt="Terrance Tegegne"
          ></img>
        </div>
      </Link>

      {isMobileMenuActive && (
        <div className="header__mobile-menu_active">
          <button
            onClick={handleMobileMenuClick}
            type="button"
            className="header__mobile-close-btn"
          ></button>
          <div className="header__mobile-user-container">
            <Link to="/profile" className="header__mobile-link">
              <p className="header__mobile-user-name">Terrance Tegegne</p>
            </Link>
            <img
              className="header__mobile-user-avatar"
              src={userAvatar}
              alt="Terrance Tegegne"
            ></img>
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
