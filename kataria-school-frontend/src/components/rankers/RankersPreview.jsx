// src/components/rankers/RankersPreview.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRankers } from '../../services/rankersService';
import styles from './RankersPreview.module.css';

function RankersPreviewSkeleton() {
  return (
    <div className={styles.previewGrid}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.classPreview}>
          <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
        </div>
      ))}
    </div>
  );
}

export default function RankersPreview() {
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRankers()
      .then(data => {
        // Get top ranker from first 3 classes that have rankers
        const topRankers = data.classes
          .filter(c => c.rankers && c.rankers.length > 0)
          .slice(0, 3)
          .map(c => ({
            classNumber: c.class,
            topRanker: c.rankers.find(r => r.rank === 1)
          }));
        setPreviewData(topRankers);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fallbackAvatar = '/images/avatar-fallback.png';

  return (
    <section className={styles.card} aria-labelledby="top-rankers-heading">
      <header className={styles.header}>
        <h2 id="top-rankers-heading" className={styles.title}>Top Rankers</h2>
      </header>

      {loading && <RankersPreviewSkeleton />}
      {error && <p className={styles.error}>Could not load rankers preview.</p>}
      
      {!loading && !error && (
        <div className={styles.previewGrid}>
          {previewData.map(({ classNumber, topRanker }) => (
            <div key={classNumber} className={styles.classPreview}>
              <p className={styles.classLabel}>Class {classNumber}</p>
              {topRanker ? (
                <>
                  <img
                    src={topRanker.imageUrl || fallbackAvatar}
                    alt={`Top ranker: ${topRanker.name}`}
                    className={styles.image}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
                  />
                  <p className={styles.name}>{topRanker.name}</p>
                </>
              ) : (
                <p>No ranker data</p>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className={styles.footer}>
        <Link to="/rankers" className={styles.link}>
          View All Rankers &rarr;
        </Link>
      </footer>
    </section>
  );
}
