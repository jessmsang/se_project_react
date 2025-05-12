import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit(values, () => {
      setValues({
        name: "",
        imageUrl: "",
        weatherType: "",
      });
    });
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
          onChange={handleChange}
          value={values.name}
        />
        <span className="modal__error" id="name-input-error"></span>
      </label>
      <label htmlFor="image-input" className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          id="image-input"
          className="modal__input"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
            value="hot"
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
            value="warm"
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
            value="cold"
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
