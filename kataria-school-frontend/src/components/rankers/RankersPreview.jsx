// src/components/rankers/RankersPreview.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRankers } from '../../services/rankersService';

const cardBaseStyles = "rounded-3xl border border-brand-secondary/20 bg-white/70 p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:backdrop-blur-lg";

function RankersPreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={cardBaseStyles}>
          <div className="mx-auto h-28 w-28 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="mt-4 h-6 w-3/4 mx-auto rounded-md bg-gray-200 animate-pulse"></div>
          <div className="mt-2 h-4 w-1/2 mx-auto rounded-md bg-gray-200 animate-pulse"></div>
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
    <section className="text-center" aria-labelledby="top-rankers-heading">
      <header>
        <h2 id="top-rankers-heading" className="mb-12 font-heading text-4xl font-bold text-brand-primary">
          Top Rankers
        </h2>
      </header>

      {loading && <RankersPreviewSkeleton />}
      {error && <p className="text-red-500">Could not load rankers preview.</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {previewData.map(({ classNumber, topRanker }) => (
            <div key={classNumber} className={cardBaseStyles}>
              {topRanker ? (
                <>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-primary/80">Class {classNumber}</p>
                  <img
                    src={topRanker.imageUrl || fallbackAvatar}
                    alt={`Top ranker: ${topRanker.name}`}
                    className="mx-auto h-28 w-28 rounded-full object-cover shadow-md border-2 border-brand-secondary/50"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
                  />
                  <p className="mt-4 font-semibold text-brand-primary">{topRanker.name}</p>
                </>
              ) : (
                <p>No ranker data</p>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className="mt-12">
        <Link 
          to="/rankers" 
          className="inline-block text-brand-primary font-semibold transition-transform hover:scale-105 hover:text-brand-secondary"
        >
          View All Rankers &rarr;
        </Link>
      </footer>
    </section>
  );
}
