import React, { useEffect, useState } from 'react';

function Github() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/zademanish'),
          fetch('https://api.github.com/users/zademanish/repos?sort=updated&per_page=100')
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (userData && userData.login) {
          setUser(userData);
        } else {
          setUser({
            name: 'Manish Zade',
            login: 'zademanish',
            avatar_url: 'https://avatars.githubusercontent.com/u/94970052?v=4',
            bio: 'Full Stack MERN Developer specializing in scalable web applications.',
            public_repos: 120,
            created_at: '2021-12-01T00:00:00Z',
            html_url: 'https://github.com/zademanish'
          });
        }

        if (Array.isArray(reposData)) {
          setRepos(reposData);

          // Calculate Language Distribution
          const langCounts = {};
          reposData.forEach(repo => {
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
          });

          const totalWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0);

          if (totalWithLang > 0) {
            const sortedLangs = Object.entries(langCounts)
              .map(([name, count]) => ({
                name,
                percentage: Math.round((count / totalWithLang) * 100)
              }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 5);

            setLanguages(sortedLangs);
          }
        } else {
          // Fallback if rate limited or error
          setLanguages([
            { name: 'JavaScript', percentage: 75 },
            { name: 'React', percentage: 65 },
            { name: 'Node.js', percentage: 55 },
            { name: 'HTML/CSS', percentage: 85 },
            { name: 'MongoDB', percentage: 45 }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // Fallback data
        setLanguages([
          { name: 'JavaScript', percentage: 75 },
          { name: 'React', percentage: 65 },
          { name: 'Node.js', percentage: 55 },
          { name: 'HTML/CSS', percentage: 85 },
          { name: 'MongoDB', percentage: 45 }
        ]);
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading || !user) return null;

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const featuredNames = [
    'Ecommerce-App',
    'Vybe-Social-Media',
    '3D-Iphone-website',
    'Import-Export-website'
  ];

  // Find featured repos and maintain requested order
  const topRepos = featuredNames
    .map(name => repos.find(r => r.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);

  // If we don't have enough featured repos, fill with other starred ones
  if (topRepos.length < 4) {
    const otherRepos = repos
      .filter(r => !featuredNames.some(name => name.toLowerCase() === r.name.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    while (topRepos.length < 4 && otherRepos.length > 0) {
      topRepos.push(otherRepos.shift());
    }
  }

  return (
    <section className="github-section" id="github">
      <div className="max-width">
        <h2 className="title">GitHub Insights</h2>

        {/* Top Section: Profile + Top 4 Repos */}
        <div className="github-top">
          <div className="github-profile reveal-left">
            <div className="profile-header">
              <img src={user.avatar_url} alt={user.name} className="github-avatar" />
              <div className="profile-info">
                <h3>{user.name}</h3>
                <p className="username">@{user.login}</p>
                <div className="location">
                  <i className="fas fa-map-marker-alt"></i> {user.location || 'Pune, India'}
                </div>
              </div>
            </div>
            <p className="bio">{user.bio || 'Full Stack MERN Developer specializing in scalable web applications.'}</p>
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
              {languages.map(lang => (
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
              <i className="fab fa-github"></i> Follow on GitHub
            </a>
          </div>

          <div className="github-top-repos reveal-right">
            <div className="repos-grid">
              {topRepos.map(repo => (
                <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id} className="repo-card static">
                  <div className="repo-header">
                    <i className="far fa-folder"></i>
                    <div className="repo-stats">
                      <span><i className="far fa-star"></i> {repo.stargazers_count}</span>
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
        <div className="github-bottom reveal-bottom">
          <div className="marquee-container">
            <div className="marquee-content">
              {[...repos, ...repos].map((repo, index) => (
                <a href={repo.html_url} target="_blank" rel="noreferrer" key={`${repo.id}-${index}`} className="repo-card marquee-item">
                  <div className="repo-img">
                    <img src={`https://opengraph.githubassets.com/1/zademanish/${repo.name}`} alt={repo.name} loading="lazy" />
                  </div>
                  <div className="repo-header">
                    <i className="far fa-folder"></i>
                    <div className="repo-stats">
                      <span><i className="far fa-star"></i> {repo.stargazers_count}</span>
                      <span><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
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
      </div>
    </section>
  );
}

export default Github;
