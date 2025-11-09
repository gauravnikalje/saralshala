// src/components/rankers/ClassRankers.jsx
import RankerCard from './RankerCard';
import styles from './ClassRankers.module.css';

export default function ClassRankers({ classNumber, rankers }) {
  // Create a full array of 3 rankers, filling missing spots with null
  const fullRankersList = [];
  for (let i = 0; i < 3; i++) {
    // Find the ranker for the current position (1st, 2nd, 3rd)
    const ranker = rankers.find(r => r.rank === i + 1);
    fullRankersList.push(ranker || null);
  }

  return (
    <section className={styles.container} aria-labelledby={`class-${classNumber}-heading`}>
      <h2 id={`class-${classNumber}-heading`} className={styles.heading}>
        Class {classNumber}
      </h2>
      <div className={styles.grid}>
        {fullRankersList.map((ranker, index) => (
          <RankerCard key={ranker ? ranker.studentId : `vacant-${index}`} ranker={ranker} />
        ))}
      </div>
    </section>
  );
}
