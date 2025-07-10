import { useContext } from "react";
import "./ItemModal.css";
import UserContext from "../../contexts/UserContext";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  const { currentUser } = useContext(UserContext);

  const isOwner = currentUser ? card.owner === currentUser._id : false;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {currentUser && isOwner && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
