import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__container modal__container_type_delete_confirmation">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <h2 className="modal__title_type_delete-confirmation">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          className="modal__delete-btn modal__delete-btn_type_confirmation"
          type="button"
          onClick={() => onDelete(card)}
        >
          Yes, delete item
        </button>
        <button className="modal__cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
