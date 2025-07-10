import { useContext } from "react";
import "../ItemCard/ItemCard.css";
import UserContext from "../../contexts/UserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(UserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const itemLikeBtnClassName = isLiked
    ? "card__like-filled"
    : "card__like-empty";

  return (
    <li className="card">
      <div className="card__container">
        <div className="card__header">
          <h2 className="card__name">{item.name}</h2>
          {currentUser && isLoggedIn && (
            <button
              className={itemLikeBtnClassName}
              onClick={handleLike}
            ></button>
          )}
        </div>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
