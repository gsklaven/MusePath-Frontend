
import './RatingsPage.css';


const mockRatings = [];
// Example: [{ exhibit: 'The Starry Night', rating: 5 }, ...]

const RatingsPage = () => {
  const hasRatings = mockRatings.length > 0;
  return (
    <div className="settings-outer-container" style={{ fontFamily: 'Montserrat, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <div className="settings-profile">
        <div className="settings-avatar-circle">
          <img src={process.env.PUBLIC_URL + '/assets/icons/thumbs.png'} alt="Ratings" className="settings-avatar-img" style={{ width: 42, height: 42 }}/>
        </div>
        <div className="settings-username" style={{ color: '#222', fontWeight: 600 }}>My Ratings</div>
      </div>
      <div className="settings-section" style={{ maxWidth: 400, width: '100%' }}>
        <div className="settings-section-header" style={{ background: '#e3ecd6', color: '#444', fontWeight: 500 }}>Ratings</div>
        <div className="settings-list" style={{ background: '#fff', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="settings-list-instruction" style={{ padding: 18, borderBottom: 'none', fontSize: 16, color: '#888', textAlign: 'left' }}>
            Rate exhibits by clicking the stars on exhibit pages.
          </div>
          {!hasRatings ? (
            <div className="ratings-empty-message">
              You have not made any rating yet.
            </div>
          ) : (
            <div className="ratings-list">
              {mockRatings.map((item, idx) => (
                <div className="ratings-list-item" key={idx}>
                  <img src={process.env.PUBLIC_URL + '/assets/icons/star.png'} alt="Rated" className="ratings-list-icon" />
                  <span className="ratings-list-exhibit">{item.exhibit}</span>
                  <span className="ratings-list-stars">{'★'.repeat(item.rating)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;
