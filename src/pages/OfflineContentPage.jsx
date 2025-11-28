

const OfflineContentPage = () => {

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }}>
        <img src={process.env.PUBLIC_URL + '/assets/icons/download.png'} alt="Download" style={{ width: 64, height: 64, marginBottom: 24 }} />
        <h2 style={{ fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 16, textAlign: 'center' }}>Download Content for Offline Use</h2>
        <div style={{ fontSize: 17, color: '#222', marginBottom: 36, textAlign: 'center' }}>
          Select content to download and access when you're offline.
        </div>
        <div style={{ width: '100%', maxWidth: 420, background: '#f7f7f7', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 0, margin: '0 auto' }}>
          {/* Maps Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/maps.png'} alt="Maps" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Maps</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 18, height: 18, opacity: 0.6 }} />
          </div>
          {/* Exhibit Information Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Exhibit Info" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Exhibit Information</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 18, height: 18, opacity: 0.6 }} />
          </div>
          {/* Routes Section */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px' }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/distance.png'} alt="Routes" style={{ width: 32, height: 32, marginRight: 18 }} />
            <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Routes</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 18, height: 18, opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineContentPage;
