import React, { useEffect, useState } from 'react';
import resume from '../Assets/Resume.pdf';
import TypingText from './TypingText';
import { fetchJSON, PROFILE_URL } from '../lib/github';

function About() {
  const [stats, setStats] = useState({ repos: 25, followers: 10, following: 5, gists: 0 });

  useEffect(() => {
    let active = true;

    // Shares one request with <Github />, which reads the same endpoint.
    fetchJSON(PROFILE_URL)
      .then((data) => {
        if (!active) return;
        setStats({
          repos: data.public_repos || 25,
          followers: data.followers || 10,
          following: data.following || 5,
          gists: data.public_gists || 0,
        });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="about" id="about">
        <div className="max-width">
          <h2 className="title">About Me</h2>
          <div className="about-content">
            <div className="column left reveal-left">
              <img
                src="https://avatars.githubusercontent.com/u/94970052?v=4"
                alt="Manish Zade"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
              />

              <div className="github-stats">
                <div className="stat-card">
                  <span className="stat-value">{stats.repos}</span>
                  <span className="stat-label">Repositories</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{stats.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{stats.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{stats.gists}</span>
                  <span className="stat-label">Gists</span>
                </div>
              </div>
              <a href="https://github.com/zademanish" target="_blank" rel="noreferrer" className="github-profile-btn">
                <i className="fab fa-github"></i> View GitHub Profile
              </a>
            </div>
            <div className="column right reveal-right">
              <div className="text">I'm Manish Zade and I'm a <TypingText className="typing-2" /></div>
              <p>Full Stack MERN Developer with expertise in building scalable web apps, optimizing performance (40% faster response times using Redis + MongoDB), and delivering end-to-end solutions. Experienced in real-time systems, eCommerce, and social platforms.</p>
              <br />
              <div className="text">Education</div>
              <p><strong>Master of Computer Applications (MCA)</strong> - CGPA: 7.40</p>
              <p>Suryadatta Institute of Business Management & Technology, Pune | 2022 – 2024</p>
              <br />
              <div className="text">Why Work With Me</div>
              <p>I'm a great communicator & love to invest the necessary time to understand the customer's problem very well, focusing on performance optimization and scalable architecture.</p>

              <a href={resume} download='resume' className="magnetic">Download CV</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
