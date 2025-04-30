import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleImageUrlChange = (evt) => setImageUrl(evt.target.value);
  const handleWeatherTypeChange = (evt) => setWeatherType(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weatherType });
    setName("");
    setImageUrl("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      titleText="New garment"
      name="new-card"
      btnText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name-input" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name-input"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        <span className="modal__error" id="name-input-error"></span>
      </label>
      <label htmlFor="image-input" className="modal__label">
        Image
        <input
          type="url"
          name="image-url"
          id="image-input"
          className="modal__input"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather-type"
            onChange={handleWeatherTypeChange}
            value="hot"
            checked={weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather-type"
            onChange={handleWeatherTypeChange}
            value="warm"
            checked={weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather-type"
            onChange={handleWeatherTypeChange}
            value="cold"
            checked={weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
