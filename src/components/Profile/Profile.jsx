import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isMobile,
  isMobileMenuActive,
  handleEditProfileClick,
  onCardLike,
  isLoading,
}) {
  return (
    <div className="profile">
      <section
        className={`profile__sidebar ${
          isMobileMenuActive ? "profile__sidebar-hidden" : ""
        }`}
      >
        <SideBar
          isMobile={isMobile}
          isMobileMenuActive={isMobileMenuActive}
          handleEditProfileClick={handleEditProfileClick}
          isLoading={isLoading}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
