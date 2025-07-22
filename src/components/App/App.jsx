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
import UserContext from "../../contexts/UserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile-modal");
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

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? api
          .addCardLike({ cardId: id })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike({ cardId: id })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }, resetForm) => {
    const makeRequest = () => {
      return api.addItem({ name, weather, imageUrl }).then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        resetForm();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    const makeRequest = () => {
      return api.patchUser({ name, avatar }).then((data) => {
        setCurrentUser(data);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleRegistration = ({
    registerEmail,
    registerPassword,
    confirmPassword,
    registerName,
    avatarUrl,
  }) => {
    if (registerPassword === confirmPassword) {
      const makeRequest = () => {
        return auth
          .register(registerEmail, registerPassword, registerName, avatarUrl)
          .then(() => {
            closeActiveModal();
            handleLogin(
              { loginEmail: registerEmail, loginPassword: registerPassword },
              resetForm
            );
            resetForm();
          });
      };
      handleSubmit(makeRequest);
    }
  };

  const handleLogin = ({ loginEmail, loginPassword }, resetForm) => {
    if (!loginEmail || !loginPassword) {
      return;
    }

    const makeRequest = () => {
      return auth.login(loginEmail, loginPassword).then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
          setCurrentUser(data);
          closeActiveModal();
          resetForm();
        }
      });
    };
    handleSubmit(makeRequest);
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

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isAuthenticating,
        handleLogout,
        handleLogin,
      }}
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
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      isLoading={isLoading}
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
              isLoading={isLoading}
            ></RegisterModal>
            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login-modal"}
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              isLoading={isLoading}
            ></LoginModal>
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              activeModal={activeModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
              isLoading={isLoading}
            />
            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              isOpen={activeModal === "edit-profile-modal"}
              onEditProfileModalSubmit={handleEditProfileModalSubmit}
              isLoading={isLoading}
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
    </UserContext.Provider>
  );
}

export default App;
