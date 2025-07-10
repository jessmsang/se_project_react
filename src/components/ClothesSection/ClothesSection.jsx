import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(UserContext);

  const currentUserItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__title">Your Items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-btn"
        >
          + Add new
        </button>
      </div>
      {currentUser && (
        <ul className="clothes-section__clothes-list">
          {currentUserItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      )}
      {currentUser && (
        <p className="clothes-section__empty-list-text">
          {currentUserItems.length === 0 ? "No Items Added Yet" : ""}
        </p>
      )}
    </div>
  );
}

export default ClothesSection;
