// src/components/rankers/RankersPreview.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRankers } from '../../services/rankersService';

const cardBaseStyles = "rounded-2xl sm:rounded-3xl border border-brand-secondary/20 bg-white/70 p-3 sm:p-4 md:p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:backdrop-blur-lg";

function RankersPreviewSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={cardBaseStyles}>
          <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="mt-2 sm:mt-3 md:mt-4 h-4 sm:h-5 md:h-6 w-3/4 mx-auto rounded-md bg-gray-200 animate-pulse"></div>
          <div className="mt-1 sm:mt-2 h-3 sm:h-4 w-1/2 mx-auto rounded-md bg-gray-200 animate-pulse"></div>
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
        // Check if we got the minimal fallback data (indicating both API and file failed)
        const isFallbackData = data.classes && data.classes.length === 1 &&
          data.classes[0].rankers &&
          data.classes[0].rankers.length === 1 &&
          data.classes[0].rankers[0].name === "Sample Student";

        if (isFallbackData) {
          setError("Using fallback data - server unavailable");
        }

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
      {error && (
        <div className="mb-6">
          <p className="text-yellow-600 bg-yellow-50 p-3 rounded-lg text-sm">
            {error.includes("fallback") ? "⚠️ Using sample data (server unavailable)" : "Could not load rankers preview."}
          </p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {previewData.map(({ classNumber, topRanker }) => (
            <Link
              key={classNumber}
              to="/rankers"
              className={`${cardBaseStyles} cursor-pointer hover:scale-105 transition-transform duration-200`}
              aria-label={`View rankers for Class ${classNumber}`}
            >
              {topRanker ? (
                <>
                  <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-primary/80">Class {classNumber}</p>
                  <img
                    src={topRanker.imageUrl || fallbackAvatar}
                    alt={`Top ranker: ${topRanker.name}`}
                    className="mx-auto h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full object-cover shadow-md border-2 border-brand-secondary/50"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
                  />
                  <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base font-semibold text-brand-primary">{topRanker.name}</p>
                </>
              ) : (
                <p className="text-xs sm:text-sm">No ranker data</p>
              )}
            </Link>
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
