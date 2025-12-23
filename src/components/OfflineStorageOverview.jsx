import React from 'react';

/**
 * OfflineStorageOverview Component
 * Displays a summary of total storage used by offline content.
 *
 * @param {Object} props
 * @param {number} props.totalStorage - Total storage used in MB.
 */
const OfflineStorageOverview = ({ totalStorage }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6' }}>
      <img src={process.env.PUBLIC_URL + '/assets/icons/storage.png'} alt="Storage" style={{ width: 32, height: 32, marginRight: 18 }} />
      <span style={{ fontSize: 17, color: '#222', flex: 1 }}>Total Storage Used</span>
      <span style={{ fontWeight: 600, color: '#7fa650', fontSize: 16 }}>~{totalStorage}MB</span>
    </div>
  );
};

export default OfflineStorageOverview;