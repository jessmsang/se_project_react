import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  const handleNameChange = (evt) => {
    const value = evt.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: value.trim() === "" ? "Name is required." : "",
    }));
  };

  const handleImageUrlChange = (evt) => {
    const value = evt.target.value;
    setImageUrl(value);
    setErrors((prev) => ({
      ...prev,
      imageUrl: value.trim() === "" ? "Image URL is required." : "",
    }));
  };

  const handleWeatherTypeChange = (evt) => {
    const value = evt.target.value;
    setWeatherType(value);
    setErrors((prev) => ({
      ...prev,
      weatherType: value.trim() === "" ? "Please select a weather type." : "",
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newErrors = {
      name: name.trim() === "" ? "Name is required." : "",
      imageUrl: imageUrl.trim() === "" ? "Image URL is required." : "",
      weatherType:
        weatherType.trim() === "" ? "Please select a weather type." : "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

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
