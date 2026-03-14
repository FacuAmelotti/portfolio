import "./styles/contact.css"

export default function Contact() {
  return (
    <section id="contact" className="contact-root">
      <div className="contact-scan" />
      <div className="contact-grid-bg" />

      <div className="contact-wrap">




        {/* Main Grid */}
        <div className="contact-main">

          {/* Left Column */}
          <div className="contact-left">

            {/* Developer Info Panel */}
            <div className="contact-panel">
              <div className="contact-ph">
                          <span className="contact-tb-dot" />
                <span className="contact-ph-tag">developer.json</span>
                <span className="contact-ph-line" />
                <span className="contact-ph-n">001</span>
              </div>

              <div className="contact-profile-row">
                  <div className="contact-avatar">
                    <img
                      src="./assets/images/facu.png"
                      alt="Facundo Amelotti"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                    <span className="contact-avatar-fallback">FA</span>
                  </div>
                <div className="contact-profile-meta">
                  <div className="contact-profile-name">Facundo Amelotti</div>
                  <div className="contact-profile-tags">
                    <span className="contact-ptag contact-ptag-hi">Backend Dev</span>

                  </div>
                </div>
              </div>

              <div className="contact-info-grid">
                <div className="contact-icard">
                  <div className="contact-icard-k">email</div>
                  <div className="contact-icard-v">
                    <a href="mailto:facuezequielamelotti@gmail.com">
                      facuezequielamelotti@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-icard">
                  <div className="contact-icard-k">ubicación</div>
                  <div className="contact-icard-v">
                    Necochea, Buenos Aires, AR
                  </div>
                </div>

              </div>
            </div>

            {/* Form Panel */}
            <div className="contact-panel">
              <div className="contact-ph">
                <span className="contact-ph-tag">send_message.sh</span>
                <span className="contact-ph-line" />
                <span className="contact-ph-n">002</span>
              </div>

              <div className="contact-form-body">
                <div className="contact-field">
                  <div className="contact-field-label">nombre</div>
                  <input
                    className="contact-field-input"
                    type="text"
                    placeholder="Tu nombre..."
                  />
                </div>
                <div className="contact-field">
                  <div className="contact-field-label">email</div>
                  <input
                    className="contact-field-input"
                    type="email"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="contact-field">
                  <div className="contact-field-label">mensaje</div>
                  <textarea
                    className="contact-field-input"
                    rows={3}
                    placeholder="Contame tu proyecto o propuesta..."
                  />
                </div>

                <div className="contact-form-actions">
                  <a
                    href="mailto:facuezequielamelotti@gmail.com"
                    className="contact-btn-primary"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    ./send_email.sh
                  </a>

                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="contact-right">

            <a
              href="https://github.com/FacuAmelotti"
              target="_blank"
              rel="noreferrer"
              className="contact-lcard"
            >
              <div className="contact-lcard-top">
                <div className="contact-lcard-icon">
                  <svg viewBox="0 0 24 24" fill="rgba(0,255,80,0.6)">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
                <span className="contact-lcard-arr">↗</span>
              </div>
              <div className="contact-lcard-info">
                <div className="contact-lcard-title">GitHub</div>
                <div className="contact-lcard-desc">Repos, proyectos y experimentos</div>
              </div>
              <span className="contact-lcard-cmd">git remote -v</span>
            </a>

            <a
              href="https://gitlab.com/"
              target="_blank"
              rel="noreferrer"
              className="contact-lcard"
            >
              <div className="contact-lcard-top">
                <div className="contact-lcard-icon">
                  <svg viewBox="0 0 24 24" fill="rgba(0,255,80,0.6)">
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" />
                  </svg>
                </div>
                <span className="contact-lcard-arr">↗</span>
              </div>
              <div className="contact-lcard-info">
                <div className="contact-lcard-title">GitLab</div>
                <div className="contact-lcard-desc">Pipelines e integración continua</div>
              </div>
              <span className="contact-lcard-cmd">CI/CD · DevOps</span>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="contact-lcard"
            >
              <div className="contact-lcard-top">
                <div className="contact-lcard-icon">
                  <svg viewBox="0 0 24 24" fill="rgba(0,255,80,0.6)">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span className="contact-lcard-arr">↗</span>
              </div>
              <div className="contact-lcard-info">
                <div className="contact-lcard-title">LinkedIn</div>
                <div className="contact-lcard-desc">Experiencia y networking</div>
              </div>
              <span className="contact-lcard-cmd">./profile.md</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}