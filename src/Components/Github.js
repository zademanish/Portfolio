import React, { useEffect, useState } from 'react';
import { fetchJSON, GITHUB_USER, PROFILE_URL, REPOS_URL } from '../lib/github';

// The marquee duplicates its children to loop seamlessly, so this is doubled
// on render. It used to spread the full repo list — up to 100 repos became
// 200 cards, a ~64,000px wide composited layer under a mask-image, each card
// pulling its own opengraph screenshot. That single section was the biggest
// source of scroll jank on the page.
const MARQUEE_LIMIT = 10;

const FALLBACK_LANGUAGES = [
  { name: 'JavaScript', percentage: 75 },
  { name: 'React', percentage: 65 },
  { name: 'Node.js', percentage: 55 },
  { name: 'HTML/CSS', percentage: 85 },
  { name: 'MongoDB', percentage: 45 },
];

const FALLBACK_USER = {
  name: 'Manish Zade',
  login: GITHUB_USER,
  avatar_url: `https://avatars.githubusercontent.com/u/94970052?v=4`,
  bio: 'Full Stack MERN Developer specializing in scalable web applications.',
  public_repos: 120,
  created_at: '2021-12-01T00:00:00Z',
  html_url: `https://github.com/${GITHUB_USER}`,
};

const FEATURED_NAMES = [
  'Ecommerce-App',
  'Vybe-Social-Media',
  '3D-Iphone-website',
  'Import-Export-website',
];

function buildLanguages(repos) {
  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (!total) return FALLBACK_LANGUAGES;

  return Object.entries(counts)
    .map(([name, count]) => ({ name, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}

function Github() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(FALLBACK_LANGUAGES);

  useEffect(() => {
    let active = true;

    Promise.all([fetchJSON(PROFILE_URL), fetchJSON(REPOS_URL)])
      .then(([userData, reposData]) => {
        if (!active) return;

        setUser(userData?.login ? userData : FALLBACK_USER);

        if (Array.isArray(reposData)) {
          setRepos(reposData);
          setLanguages(buildLanguages(reposData));
        }
        setLoading(false);
      })
      .catch((error) => {
        if (!active) return;
        console.error('Error fetching GitHub data:', error);
        setUser(FALLBACK_USER);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Render the shell while loading rather than returning null. Returning null
  // meant the whole section popped in later and shifted every ScrollTrigger
  // measurement below it by thousands of pixels.
  if (loading || !user) {
    return (
      <section className="github-section" id="github">
        <div className="max-width">
          <h2 className="title">GitHub Insights</h2>
          <div className="github-loading" aria-busy="true">Loading GitHub activity…</div>
        </div>
      </section>
    );
  }

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const topRepos = FEATURED_NAMES.map((name) =>
    repos.find((r) => r.name.toLowerCase() === name.toLowerCase())
  ).filter(Boolean);

  if (topRepos.length < 4) {
    const others = repos
      .filter((r) => !FEATURED_NAMES.some((name) => name.toLowerCase() === r.name.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    while (topRepos.length < 4 && others.length > 0) {
      topRepos.push(others.shift());
    }
  }

  const marqueeRepos = repos.slice(0, MARQUEE_LIMIT);

  return (
    <section className="github-section" id="github">
      <div className="max-width">
        <h2 className="title">GitHub Insights</h2>

        {/* Top Section: Profile + Top 4 Repos */}
        <div className="github-top">
          <div className="github-profile reveal-left">
            <div className="profile-header">
              <img
                src={user.avatar_url}
                alt={user.name}
                className="github-avatar"
                width="90"
                height="90"
                loading="lazy"
                decoding="async"
              />
              <div className="profile-info">
                <h3>{user.name}</h3>
                <p className="username">@{user.login}</p>
                <div className="location">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i> {user.location || 'Pune, India'}
                </div>
              </div>
            </div>
            <p className="bio">{user.bio || FALLBACK_USER.bio}</p>
            <div className="github-meta">
              <div className="meta-item">
                <span className="meta-value">{joinDate}</span>
                <span className="meta-label">Member Since</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">{user.public_repos}</span>
                <span className="meta-label">Total Repos</span>
              </div>
            </div>

            <div className="languages-distribution">
              <h4>Language Distribution</h4>
              {languages.map((lang) => (
                <div className="lang-bar-wrapper" key={lang.name}>
                  <div className="lang-info">
                    <span>{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  <div className="lang-bar">
                    <div className="lang-progress" style={{ width: `${lang.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <a href={user.html_url} target="_blank" rel="noreferrer" className="github-cta">
              <i className="fab fa-github" aria-hidden="true"></i> Follow on GitHub
            </a>
          </div>

          <div className="github-top-repos reveal-right">
            <div className="repos-grid">
              {topRepos.map((repo) => (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo.id}
                  className="repo-card static"
                >
                  <div className="repo-header">
                    <i className="far fa-folder" aria-hidden="true"></i>
                    <div className="repo-stats">
                      <span><i className="far fa-star" aria-hidden="true"></i> {repo.stargazers_count}</span>
                    </div>
                  </div>
                  <h4>{repo.name}</h4>
                  <p>{repo.description || 'A comprehensive full-stack project built with modern technologies.'}</p>
                  <div className="repo-lang">
                    <span className="dot"></span> {repo.language || 'JavaScript'}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Width Marquee */}
        {marqueeRepos.length > 0 && (
          <div className="github-bottom reveal-bottom">
            <div className="marquee-container">
              <div className="marquee-content">
                {[...marqueeRepos, ...marqueeRepos].map((repo, index) => (
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    key={`${repo.id}-${index}`}
                    className="repo-card marquee-item"
                    aria-hidden={index >= marqueeRepos.length}
                    tabIndex={index >= marqueeRepos.length ? -1 : undefined}
                  >
                    <div className="repo-img">
                      <img
                        src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`}
                        alt={repo.name}
                        width="320"
                        height="160"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="repo-header">
                      <i className="far fa-folder" aria-hidden="true"></i>
                      <div className="repo-stats">
                        <span><i className="far fa-star" aria-hidden="true"></i> {repo.stargazers_count}</span>
                        <span><i className="fas fa-code-branch" aria-hidden="true"></i> {repo.forks_count}</span>
                      </div>
                    </div>
                    <h4>{repo.name}</h4>
                    <p>{repo.description || 'No description available.'}</p>
                    <div className="repo-lang">
                      <span className="dot"></span> {repo.language || 'JavaScript'}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Github;
