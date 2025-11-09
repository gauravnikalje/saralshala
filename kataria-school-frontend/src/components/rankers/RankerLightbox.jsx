// src/components/rankers/RankerLightbox.jsx
import { useEffect, useRef } from 'react';
import styles from '../../styles/RankerLightbox.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';

function getOrdinalSuffix(rank) {
  if (rank === 1) return 'st';
  if (rank === 2) return 'nd';
  if (rank === 3) return 'rd';
  return 'th';
}

export default function RankerLightbox({ open, onClose, cardData }) {
  const { name, rank, score, total, imageUrl, classNumber } = cardData;
  const imageSrc = imageUrl || '/images/avatar-fallback.png';
  const lightboxRef = useRef(null);

  useFocusTrap(lightboxRef, open);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={lightboxRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          &times;
        </button>

        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={`${name}'s profile photo`} className={styles.image} />
          <div className={styles.badge}>
            {rank}{getOrdinalSuffix(rank)}
          </div>
        </div>

        <div className={styles.details}>
          <h2 id="lightbox-title" className={styles.name}>{name}</h2>
          <p className={styles.class}>Class {classNumber}</p>
          <p className={styles.score}>
            Score: <strong>{score}</strong> / {total}
          </p>
        </div>
      </div>
    </div>
  );
}
