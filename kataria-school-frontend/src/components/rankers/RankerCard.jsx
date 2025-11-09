import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './RankerCard.module.css';
import RankerLightbox from './RankerLightbox'; // Import the lightbox

// Helper to get ordinal suffix (1st, 2nd, 3rd)
function getOrdinalSuffix(rank) {
  if (rank === 1) return 'st';
  if (rank === 2) return 'nd';
  if (rank === 3) return 'rd';
  return 'th';
}

// Helper to get initials from name (for fallback)
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function RankerCard({ ranker, classNumber }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const cardRef = useRef(null);

  // If no ranker data, render a placeholder card
  if (!ranker) {
    return (
      <div className={styles.card} tabIndex="0" role="listitem">
        <div className={styles.imageFrame}>
          <div className={styles.vacant} />
        </div>
      </div>
    );
  }

  const { rank, name, score, total, imageUrl, studentId } = ranker;

  const handleOpen = (e) => {
    // If it's a link, prevent navigation when opening the lightbox
    if (studentId) {
      e.preventDefault();
    }
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
    // Restore focus to the card after closing the modal
    if (cardRef.current) {
      cardRef.current.focus();
    }
  };

  const imageSrc = imageUrl || '/images/avatar-fallback.png';
  const initials = getInitials(name);

  const cardInnerContent = (
    <>
      <div className={styles.imageFrame} onClick={handleOpen}>
        {imageUrl ? (
          <img
            src={imageSrc}
            alt={`${name} - Rank ${rank}, Class ${classNumber}`}
            className={styles.photo}
            loading="lazy"
          />
        ) : (
          <div className={styles.fallback}>
            <span className={styles.fallbackInitials}>{initials}</span>
          </div>
        )}
        <div className={styles.badge}>
          {rank}{getOrdinalSuffix(rank)}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.score}>
          Score: {score}/{total}
        </p>
      </div>
    </>
  );

  return (
    <>
      {studentId ? (
        <Link
          ref={cardRef}
          to={`/student/${studentId}`}
          className={styles.card}
          aria-label={`View details for ${name}, rank ${rank}`}
          tabIndex="0"
          onClick={handleOpen} // Add onClick handler here
        >
          {cardInnerContent}
        </Link>
      ) : (
        <div
          ref={cardRef}
          className={styles.card}
          aria-label={`${name}, rank ${rank}`}
          tabIndex="0"
          role="listitem"
          onClick={handleOpen}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
        >
          {cardInnerContent}
        </div>
      )}
      <RankerLightbox
        open={lightboxOpen}
        onClose={handleClose}
        cardData={{ ...ranker, classNumber }}
      />
    </>
  );
}