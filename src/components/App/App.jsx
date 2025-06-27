import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import * as api from "../../utils/api";
import * as token from "../../utils/token";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    isDay: true,
    temp: { F: 999, C: 999 },
    type: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 725);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
    avatar: "",
    createdAt: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePage = location.pathname === "/profile";

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuActive(false);
  };

  const handleSignupClick = () => {
    setActiveModal("register-modal");
    setIsMobileMenuActive(false);
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
    setIsMobileMenuActive(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
    setIsMobileMenuActive(false);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = () => {
    api
      .deleteItem({ cardId: selectedCard._id })
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }, resetForm) => {
    api
      .addItem({ name, weather, imageUrl })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile-modal");
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    api
      .patchUser({ name, avatar })
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? api
          .addCardLike({ cardId: id })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ cardId: id })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegistration = (
    {
      registerEmail,
      registerPassword,
      confirmPassword,
      registerName,
      avatarUrl,
    },
    resetForm
  ) => {
    if (registerPassword === confirmPassword) {
      auth
        .register(registerEmail, registerPassword, registerName, avatarUrl)
        .then(() => {
          closeActiveModal();
          handleLogin(
            { loginEmail: registerEmail, loginPassword: registerPassword },
            resetForm
          );
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ loginEmail, loginPassword }, resetForm) => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    auth
      .login(loginEmail, loginPassword)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
          setCurrentUser(data);
          closeActiveModal();
          resetForm();
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    token.removeToken();
    navigate("/");
  };

  useEffect(() => {
    const jwt = token.getToken();

    if (!jwt) {
      setIsAuthenticating(false);
      setIsLoggedIn(false);
      return;
    }
    token
      .tokenValidation(jwt)
      .then(({ _id, email, name, avatar, createdAt }) => {
        setCurrentUser({ _id, email, name, avatar, createdAt });
        setIsLoggedIn(true);
        setIsAuthenticating(false);
        if (location.state?.from) {
          navigate(location.state?.from);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
        setIsAuthenticating(false);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (!isAuthenticating && location.state?.openLoginModal && !isLoggedIn) {
      setActiveModal("login-modal");
    }
  }, [location.state, isLoggedIn, isAuthenticating]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 725);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, isAuthenticating }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isMobileMenuActive={isMobileMenuActive}
              setIsMobileMenuActive={setIsMobileMenuActive}
              isMobile={isMobile}
              isProfilePage={isProfilePage}
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    isMobileMenuActive={isMobileMenuActive}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute setActiveModal={setActiveModal}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      isMobile={isMobile}
                      isMobileMenuActive={isMobileMenuActive}
                      currentUser={currentUser}
                      handleLogout={handleLogout}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <RegisterModal
              onClose={closeActiveModal}
              isOpen={activeModal === "register-modal"}
              activeModal={activeModal}
              handleRegistration={handleRegistration}
              setActiveModal={setActiveModal}
            ></RegisterModal>
            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login-modal"}
              activeModal={activeModal}
              handleLogin={handleLogin}
              setActiveModal={setActiveModal}
            ></LoginModal>
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              activeModal={activeModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              isOpen={activeModal === "edit-profile-modal"}
              onEditProfileModalSubmit={handleEditProfileModalSubmit}
              currentUser={currentUser}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />
            <DeleteConfirmationModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteCard}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
