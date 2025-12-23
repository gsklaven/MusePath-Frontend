import React from 'react';

const ExhibitActionButtons = ({ isCreatingRoute, onCreateRoute, pages, page, setPage }) => {
  return (
    <div style={{
      position: 'fixed',
      left: '50%',
      bottom: 24,
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 16,
      zIndex: 1200,
      width: '100%',
      maxWidth: 720,
      justifyContent: 'center',
      padding: '0 24px',
      pointerEvents: 'none',
    }}>
      {/* Navigate / Create Route Button */}
      <button
        onClick={onCreateRoute}
        disabled={isCreatingRoute}
        style={{
          background: isCreatingRoute ? '#ccc' : '#BBD689',
          color: '#2C3343',
          border: 'none',
          borderRadius: 16,
          padding: '12px 32px',
          fontWeight: 700,
          fontSize: '1.08rem',
          cursor: isCreatingRoute ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: 0.2,
          minWidth: 120,
          pointerEvents: 'auto',
          opacity: isCreatingRoute ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {isCreatingRoute ? (
          <>
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/route.png'}
              alt="Creating route"
              style={{ width: 22, height: 22, verticalAlign: 'middle', filter: 'brightness(0) saturate(100%) invert(18%) sepia(12%) saturate(1162%) hue-rotate(181deg) brightness(97%) contrast(92%)' }}
            />
            <span style={{ color: '#2C3343', fontWeight: 700, fontSize: '1.08rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Creating...</span>
          </>
        ) : (
          <>
            <img
              src={process.env.PUBLIC_URL + '/assets/icons/route.png'}
              alt="Navigate icon"
              style={{ width: 22, height: 22, verticalAlign: 'middle', filter: 'brightness(0) saturate(100%) invert(18%) sepia(12%) saturate(1162%) hue-rotate(181deg) brightness(97%) contrast(92%)' }}
            />
            <span style={{ color: '#2C3343', fontWeight: 700, fontSize: '1.08rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Navigate</span>
          </>
        )}
      </button>
      {/* More Details / Pagination Button */}
      <button
        style={{
          background: '#BBD689',
          color: '#2C3343',
          border: 'none',
          borderRadius: 16,
          padding: '12px 32px',
          fontWeight: 700,
          fontSize: '1.08rem',
          cursor: pages.length > 1 ? 'pointer' : 'not-allowed',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: 0.2,
          minWidth: 120,
          pointerEvents: 'auto',
          opacity: pages.length > 1 ? 1 : 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (pages.length > 1) {
            const nextPage = (page + 1) % pages.length;
            setPage(nextPage);
          }
        }}
      >
        More Details {pages.length > 1 ? `(${page + 1}/${pages.length})` : ''}
      </button>
    </div>
  );
};

export default ExhibitActionButtons;