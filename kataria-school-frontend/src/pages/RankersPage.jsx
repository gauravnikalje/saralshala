// src/pages/RankersPage.jsx
import { useState, useEffect } from 'react';
import { fetchRankers } from '../services/rankersService';
import ClassRankers from '../components/rankers/ClassRankers';
import styles from './RankersPage.module.css';
import classRankerStyles from '../components/rankers/ClassRankers.module.css';

function RankersPageSkeleton() {
  const classSkeletons = Array.from({ length: 5 }, (_, i) => i + 1);
  const cardSkeletons = Array.from({ length: 3 }, (_, i) => i);
  return (
    <div>
      {classSkeletons.map(classNum => (
        <div key={classNum}>
          <div className={classRankerStyles.heading} style={{ backgroundColor: '#f3f4f6', height: '2rem', marginBottom: '1rem', width: '150px' }}></div>
          <div className={classRankerStyles.grid}>
            {cardSkeletons.map(cardNum => <div key={cardNum} className={styles.skeletonCard}></div>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RankersPage() {
  const [rankersData, setRankersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = () => {
    setLoading(true);
    setError(null);
    fetchRankers()
      .then(data => {
        setRankersData(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Exam Rankers</h1>
        {rankersData && <p className={styles.examName}>{rankersData.examName}</p>}
      </header>

      <main>
        {loading && <RankersPageSkeleton />}
        {error && (
          <div className={styles.error}>
            <p>Could not load rankers data.</p>
            <p>{error}</p>
            <button onClick={loadData} className={styles.retryButton}>
              Retry
            </button>
          </div>
        )}
        {rankersData && (
          <div>
            {rankersData.classes.map(({ class: classNumber, rankers }) => (
              <ClassRankers
                key={classNumber}
                classNumber={classNumber}
                rankers={rankers}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
