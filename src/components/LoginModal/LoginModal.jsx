import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function LoginModal({ onClose, isOpen, setActiveModal, isLoading }) {
  const { handleLogin } = useContext(UserContext);

  const { values, handleChange, setValues, errorMessage } = useForm({
    loginEmail: "",
    loginPassword: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values, () => {
      setValues({
        loginEmail: "",
        loginPassword: "",
      });
    });
  };

  return (
    <ModalWithForm
      titleText="Log In"
      name="Login-modal"
      btnText={isLoading ? "Logging In..." : "Log In"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onNavBtnClick={() => setActiveModal("register-modal")}
      navBtnText="or Sign Up"
    >
      <label htmlFor="login-email-input" className="modal__label">
        Email*
        <input
          type="email"
          name="loginEmail"
          id="login-email-input"
          className="modal__input"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.loginEmail}
        />
        <span className="modal__error" id="login-email-input-error">
          {errorMessage.loginEmail}
        </span>
      </label>
      <label htmlFor="login-password-input" className="modal__label">
        Password*
        <input
          type="password"
          name="loginPassword"
          id="login-password-input"
          className="modal__input"
          placeholder="Password"
          required
          minLength="8"
          maxLength="50"
          onChange={handleChange}
          value={values.loginPassword}
        />
        <span className="modal__error" id="login-password-input-error">
          {errorMessage.loginPassword}
        </span>
      </label>
    </ModalWithForm>
  );
}
export default LoginModal;
