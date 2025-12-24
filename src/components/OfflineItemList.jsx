import React from 'react';

/**
 * OfflineItemList Component
 * Renders a collapsible list of downloaded offline items (maps or exhibits).
 *
 * @param {Object} props
 * @param {string} props.title - Section title.
 * @param {number} props.count - Number of items.
 * @param {string} props.icon - Path to icon image.
 * @param {boolean} props.isExpanded - Whether list is expanded.
 * @param {function} props.onToggle - Handler to toggle expansion.
 * @param {Array} props.items - Array of items to display.
 * @param {string} props.emptyMessage - Message to show if list is empty.
 * @param {function} props.onDelete - Handler to delete an item.
 * @param {function} props.renderItemLabel - Function to render item text.
 * @param {function} props.getId - Function to get unique ID from item.
 */
const OfflineItemList = ({ 
  title, 
  count, 
  icon, 
  isExpanded, 
  onToggle, 
  items, 
  emptyMessage, 
  onDelete, 
  renderItemLabel,
  getId 
}) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #e3ecd6', cursor: 'pointer' }} onClick={onToggle}>
        <img src={process.env.PUBLIC_URL + icon} alt={title} style={{ width: 32, height: 32, marginRight: 18 }} />
        <span style={{ fontSize: 17, color: '#222', flex: 1 }}>{title} ({count})</span>
        <img src={process.env.PUBLIC_URL + '/assets/icons/down-chevron.png'} alt="Expand" style={{ width: 22, height: 22, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </div>
      {isExpanded && (
        <div style={{ padding: '12px 32px 12px 70px', color: '#555', fontSize: 15 }}>
          {items.length === 0 ? (
            <div style={{ fontStyle: 'italic', color: '#aaa' }}>{emptyMessage}</div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {/* Map through items and render with delete button */}
              {items.map((item) => {
                const id = getId(item);
                return (
                  <li key={id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '8px 0', borderBottom: '1px solid #eee'}}>
                    <span>{renderItemLabel(item)}</span>
                    <button
                      style={{background: '#ff6b6b', color: '#fff', border: 'none', cursor: 'pointer', padding: '4px 12px', borderRadius: 8, fontWeight: 600}}
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default OfflineItemList;