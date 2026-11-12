import React from 'react';

export default function Loader() {
  return (
    <div className="coder-loader">
      <div className="loader-content">

        {/* Developer Logo */}
        <div className="loader-icon">
          <span>{'<'}<span className="orange">/</span>{'>'}</span>
        </div>

        {/* Developer Terminal */}
        <div className="loader-terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>

            <span className="terminal-title">
              meet@developer: ~
            </span>

            <span className="terminal-menu">•••</span>
          </div>

          <div className="terminal-body">
            <p>
              <span className="terminal-green">➜</span>
              <span className="terminal-path"> ~/developer-life</span>
            </p>

            <p className="terminal-command">
              $ npm run make-it-happen<span className="cursor">_</span>
            </p>

            <div className="terminal-logs">
              <p><span>[COFFEE]</span> Turning caffeine into code...</p>
              <p><span>[DEBUG]</span> Why is it working on my machine?</p>
              <p><span>[FIXED]</span> Broke two things. Fixed three.</p>
              <p><span>[SUCCESS]</span> It works! Nobody touch anything.</p>
            </div>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="loader-progress-section">
          <div className="loader-progress-info">
            <span>ASSEMBLING PIXELS & POSSIBILITIES</span>
            <span className="loader-percentage">ALMOST THERE...</span>
          </div>

          <div className="loader-progress-track">
            <div className="loader-progress-fill" />
          </div>
        </div>

        {/* Footer */}
        <div className="loader-footer">
          <span>BUILT WITH CURIOSITY & COFFEE</span>
          <span><span className="orange">●</span> BUGS UNDER CONTROL*</span>
        </div>

      </div>
    </div>
  );
}