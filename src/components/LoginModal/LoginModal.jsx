import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ onClose, isOpen, handleLogin, setActiveModal }) {
  const { values, handleChange, setValues } = useForm({
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
      btnText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onNavButtonClick={() => setActiveModal("register-modal")}
      navButtonText="or Sign Up"
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
        <span className="modal__error" id="email-input-error"></span>
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
        <span className="modal__error" id="password-input-error"></span>
      </label>
    </ModalWithForm>
  );
}
export default LoginModal;
