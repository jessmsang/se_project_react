import "./Header.css";
import logo from "../../assets/logo.svg";
import userAvatar from "../../assets/avatar.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo"></img>
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__user-name">Terrance Tegegne</p>
        <img
          className="header__user-avatar"
          src={userAvatar}
          alt="Terrance Tegegne"
        ></img>
      </div>
    </header>
  );
}

export default Header;
