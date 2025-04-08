import "./ModalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  btnText,
  activeModal,
  handleCloseModalClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal_opened"}`}
      id="modal-with-form"
    >
      <div className="modal__container">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={handleCloseModalClick}
          type="button"
          className="modal__close-button"
        ></button>
        <form className="modal__form" id="add-item-form" noValidate>
          {children}
          <button className="modal__submit-btn">{btnText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
