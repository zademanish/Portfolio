// Deduplicated GitHub fetches.
//
// <About /> and <Github /> both read the same profile endpoint, and React's
// StrictMode mounts every component twice in development. Without this cache
// that is four requests against an API that allows 60 per hour unauthenticated.

const inFlight = new Map();

export function fetchJSON(url) {
  if (!inFlight.has(url)) {
    inFlight.set(
      url,
      fetch(url)
        .then((res) => res.json())
        .catch((err) => {
          // Let the next caller retry instead of caching a failure forever.
          inFlight.delete(url);
          throw err;
        })
    );
  }
  return inFlight.get(url);
}

export const GITHUB_USER = 'zademanish';
export const PROFILE_URL = `https://api.github.com/users/${GITHUB_USER}`;
export const REPOS_URL = `${PROFILE_URL}/repos?sort=updated&per_page=100`;
