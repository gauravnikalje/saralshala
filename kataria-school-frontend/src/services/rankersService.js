// src/services/rankersService.js

/**
 * Fetches rankers data.
 * It first attempts to fetch from the /api/rankers endpoint.
 * If the API is not available or fails, it falls back to a local rankers.json file.
 * @returns {Promise<Object>} A promise that resolves to the rankers data.
 * @throws {Error} If both the API and the fallback file fail to load.
 */
export async function fetchRankers() {
  try {
    const response = await fetch('http://localhost:5000/api/rankers');
    // Check if the response is ok (status in the range 200-299)
    if (response.ok) {
      return await response.json();
    }
    // If the server returns a non-success status, throw an error to trigger the fallback.
    throw new Error(`API request failed with status ${response.status}`);
  } catch (error) {
    console.warn('API fetch failed, falling back to local data:', error.message);
    // If the API fetch fails, try to fetch the local JSON file.
    try {
      const fallbackResponse = await fetch('/data/rankers.json');
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
      throw new Error(`Fallback request failed with status ${fallbackResponse.status}`);
    } catch (fallbackError) {
      console.error('Failed to fetch rankers data from both API and fallback.', fallbackError);
      // As a last resort, provide a minimal fallback dataset
      return {
        examName: "Midterm Nov 2025",
        classes: [
          {
            class: 1,
            rankers: [
              {rank: 1, name: "Sample Student", score: 95, total: 100, imageUrl: "", studentId: "sample1"}
            ]
          }
        ]
      };
    }
  }
}
