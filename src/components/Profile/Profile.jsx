import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isMobile,
  isMobileMenuActive,
}) {
  return (
    <div className="profile">
      <section
        className={`profile__sidebar ${
          isMobileMenuActive ? "profile__sidebar-hidden" : ""
        }`}
      >
        <SideBar isMobile={isMobile} isMobileMenuActive={isMobileMenuActive} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
