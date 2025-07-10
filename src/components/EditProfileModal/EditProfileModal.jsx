import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import UserContext from "../../contexts/UserContext";

export default function EditProfileModal({
  onClose,
  isOpen,
  onEditProfileModalSubmit,
  isLoading,
}) {
  const { currentUser } = useContext(UserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser?.name,
    avatar: currentUser?.avatar,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEditProfileModalSubmit(values);
  };

  useEffect(() => {
    setValues({
      name: currentUser?.name,
      avatar: currentUser?.avatar,
    });
  }, [currentUser]);

  return (
    <ModalWithForm
      titleText="Change profile data"
      name="edit-profile-modal"
      btnText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name-input" className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          id="edit-name-input"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
        <span className="modal__error" id="name-input-error"></span>
      </label>
      <label htmlFor="edit-avatar-input" className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          id="edit-avatar-input"
          className="modal__input"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
        <span className="modal__error" id="avatar-input-error"></span>
      </label>
    </ModalWithForm>
  );
}
