import "./ModalWithForm.css";

function ModalWithForm({ children, titleText, btnText }) {
  return (
    <div className="modal modal_opened" id="modal-with-form">
      <div className="modal__container">
        <h2 className="modal__title">{titleText}</h2>
        <button type="button" className="modal__close-button"></button>
        <form className="modal__form" id="add-item-form" noValidate>
          {children}
          <button className="modal__submit-btn">{btnText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
