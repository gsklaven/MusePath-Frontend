/**
 * StarRating Component - Renders a row of interactive stars.
 */
const StarRating = ({ rating, max = 5, onRate, size = '1.2rem' }) => (
  <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
    {/* Create an array of length 'max' to render stars */}
    {[...Array(max)].map((_, i) => {
      const star = i + 1;
      return (
        <span
          key={star}
          onClick={onRate ? () => onRate(star) : undefined}
          style={{
            fontSize: size,
            cursor: onRate ? 'pointer' : 'default',
            color: star <= rating ? '#FFD700' : '#ddd',
          }}
        >
          ★
        </span>
      );
    })}
  </div>
);

/**
 * RatingItem Component
 * Displays a single exhibit rating with options to edit or delete.
 *
 * @param {Object} props
 * @param {Object} props.item - The rating object {exhibit_id, rating, title}.
 * @param {boolean} props.isEditing - Whether this item is currently in edit mode.
 * @param {number} props.newRating - The temporary rating value during editing.
 * @param {function} props.onEdit - Handler to enter edit mode.
 * @param {function} props.onCancel - Handler to cancel editing.
 * @param {function} props.onSave - Handler to save changes.
 * @param {function} props.onDelete - Handler to delete the rating.
 * @param {function} props.onRatingChange - Handler to update temporary rating.
 */
const RatingItem = ({ item, isEditing, newRating, onEdit, onCancel, onSave, onDelete, onRatingChange }) => {
  const buttonStyle = (bgColor, color = '#222') => ({
    background: bgColor,
    color,
    border: 'none',
    borderRadius: 8,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  });

  return (
    <div className="ratings-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '1rem', color: '#222', fontWeight: 600 }}>{item.title || `Exhibit ${item.exhibit_id}`}</span>
        {isEditing ? (
          <StarRating rating={newRating} onRate={onRatingChange} size="1.5rem" />
        ) : (
          <StarRating rating={item.rating} />
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {isEditing ? (
          <>
            <button onClick={() => onSave(item.exhibit_id, newRating)} style={buttonStyle('#BBD689')}>Save</button>
            <button onClick={onCancel} style={buttonStyle('#ddd')}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={onEdit} style={buttonStyle('#BBD689')}>Edit</button>
            <button onClick={() => onDelete(item.exhibit_id)} style={buttonStyle('#ff6b6b', '#fff')}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RatingItem;