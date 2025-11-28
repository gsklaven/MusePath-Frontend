
import './FavouritesPage.css';


const mockFavourites = [];
// Example: [{ exhibit: 'The Starry Night' }, ...]

const FavouritesPage = () => {
  const hasFavourites = mockFavourites.length > 0;
  return (
    <div className="settings-outer-container" style={{ fontFamily: 'Montserrat, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <div className="settings-profile">
        <div className="settings-avatar-circle">
          <img src={process.env.PUBLIC_URL + '/assets/icons/heart.png'} alt="Favourites" className="settings-avatar-img" />
        </div>
        <div className="settings-username" style={{ color: '#222', fontWeight: 600 }}>My Favourites</div>
      </div>
      <div className="settings-section" style={{ maxWidth: 400, width: '100%' }}>
        <div className="settings-section-header" style={{ background: '#e3ecd6', color: '#444', fontWeight: 500 }}>Favourites</div>
        <div className="settings-list" style={{ background: '#fff', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="settings-list-instruction" style={{ padding: 18, borderBottom: 'none', fontSize: 16, color: '#888', textAlign: 'left' }}>
            Add exhibits to favourites by clicking the heart icon on exhibit pages.
          </div>
          {!hasFavourites ? (
            <div className="favourites-empty-message">
              You have not added any favourite yet.
            </div>
          ) : (
            <div className="favourites-list">
              {mockFavourites.map((item, idx) => (
                <div className="favourites-list-item" key={idx}>
                  <img src={process.env.PUBLIC_URL + '/assets/icons/heart.png'} alt="Favourite" className="favourites-list-icon" />
                  <span className="favourites-list-exhibit">{item.exhibit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
