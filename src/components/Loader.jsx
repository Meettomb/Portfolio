
import React from 'react';
// import './Loader.css';

export default function Loader() {
  return (
    <div className="coder-loader">
      <div className="loader-content">

        {/* Logo / Developer Icon */}
        <div className="loader-icon">
          <span>{'<'}<span className="orange">/</span>{'>'}</span>
        </div>

        {/* Terminal */}
        <div className="loader-terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal-title">
              meet@portfolio: ~
            </span>
            <span className="terminal-menu">•••</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="terminal-green">➜</span>
              <span className="terminal-path"> ~/portfolio</span>
            </p>

            <p className="terminal-command">
              $ initializing_portfolio<span className="cursor">_</span>
            </p>

            <div className="terminal-logs">
              <p><span>[OK]</span> Loading components...</p>
              <p><span>[OK]</span> Initializing animations...</p>
              <p><span>[OK]</span> Compiling styles...</p>
              <p><span>[OK]</span> Preparing experience...</p>
            </div>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="loader-progress-section">
          <div className="loader-progress-info">
            <span>BUILDING EXPERIENCE</span>
            <span className="loader-percentage">LOADING...</span>
          </div>

          <div className="loader-progress-track">
            <div className="loader-progress-fill" />
          </div>
        </div>

        {/* Footer */}
        <div className="loader-footer">
          <span>CRAFTED WITH CODE</span>
          <span> <span className="orange">●</span> SYSTEM ONLINE</span>
        </div>

      </div>
    </div>
  );
}
