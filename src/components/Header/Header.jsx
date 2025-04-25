import "./Header.css";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import userAvatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isMobileMenuActive,
  setIsMobileMenuActive,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const handleMobileMenuClick = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <header className="header">
      <img
        className={`header__logo ${isMobileMenuActive ? "header__hidden" : ""}`}
        src={logo}
        alt="logo"
      ></img>
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
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__user-name">Terrance Tegegne</p>
        <img
          className="header__user-avatar"
          src={userAvatar}
          alt="Terrance Tegegne"
        ></img>
      </div>

      {isMobileMenuActive && (
        <div className="header__mobile-menu_active">
          <button
            onClick={handleMobileMenuClick}
            type="button"
            className="header__mobile-close-btn"
          ></button>
          <div className="header__mobile-user-container">
            <p className="header__mobile-user-name">Terrance Tegegne</p>
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
        </div>
      )}
    </header>
  );
}

export default Header;
