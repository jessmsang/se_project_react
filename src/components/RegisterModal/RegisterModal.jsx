import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  setActiveModal,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const { values, handleChange, setValues } = useForm({
    registerEmail: "",
    registerPassword: "",
    confirmPassword: "",
    registerName: "",
    avatarUrl: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (values.registerPassword !== values.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else {
      handleRegistration(values, () => {
        setValues({
          registerEmail: "",
          registerPassword: "",
          confirmPassword: "",
          registerName: "",
          avatarUrl: "",
        });
      });
    }
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      name="register-modal"
      btnText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onNavButtonClick={() => setActiveModal("login-modal")}
      navButtonText="or Log In"
    >
      <label htmlFor="register-email-input" className="modal__label">
        Email*
        <input
          type="email"
          name="registerEmail"
          id="register-email-input"
          className="modal__input"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.registerEmail}
        />
        <span className="modal__error" id="email-input-error"></span>
      </label>
      <label htmlFor="register-password-input" className="modal__label">
        Password*
        <input
          type="password"
          name="registerPassword"
          id="register-password-input"
          className="modal__input"
          placeholder="Password"
          required
          pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*_+-=?]).{8,50}$"
          onChange={handleChange}
          value={values.registerPassword}
        />
        <span className="modal__error" id="password-input-error"></span>
      </label>
      <label htmlFor="confirm-password-input" className="modal__label">
        Confirm Password*
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password-input"
          className="modal__input"
          placeholder="Confirm Password"
          required
          minLength="8"
          maxLength="50"
          onChange={handleChange}
          value={values.confirmPassword}
        />
        <span className="modal__error" id="confirm-password-input-error">
          {errorMessage}
        </span>
      </label>
      <label htmlFor="register-name-input" className="modal__label">
        Name*
        <input
          type="text"
          name="registerName"
          id="register-name-input"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.registerName}
        />
        <span className="modal__error" id="name-input-error"></span>
      </label>
      <label htmlFor="avatar-input" className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatarUrl"
          id="avatar-input"
          className="modal__input"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatarUrl}
        />
        <span className="modal__error" id="avatar-input-error"></span>
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
