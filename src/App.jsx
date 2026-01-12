import React, { useEffect, useRef, useState } from 'react'
import { AiFillTikTok, AiOutlineHeart, AiFillInstagram } from 'react-icons/ai'
import './App.css'

function App() {
  const videos = [
    '/video1.mp4',
    '/video2.mp4',
    '/video3.mp4',
  ]

  const heroVideos = videos.map((src, idx) => {
    const meta = [
      { videos: '/video1.mp4', title: 'Fade detailing' },
      { videos: '/video2.mp4', title: 'Studio cut' },
      { videos: '/video3.mp4', title: 'Curl taper' },
    ]
    return { src, ...meta[idx] }
  })

  return (
    <>
      <nav className='sidebar'>
        <div className="sidebar-logo">
          <a
            href="https://www.tiktok.com/search?q=sharp.soc1ety&t=1767707103942"
            target="_blank"
            rel="noreferrer"
            aria-label="Följ oss på TikTok"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent-color)', marginTop: 12 }}
          >
            <AiFillTikTok size={26} />
            <span style={{ fontSize: 14 }}>TikTok</span>
          </a>
          <a
            href="https://www.instagram.com/sharp.soc1ety/"
            target="_blank"
            rel="noreferrer"
            aria-label="Följ oss på Instagram"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent-color)', marginTop: 8 }}
          >
            <AiFillInstagram size={26} />
            <span style={{ fontSize: 14 }}>Instagram</span>
          </a>
        </div>
        <ul className="nav-links">
          <li><a href="#products">PRODUKTER</a></li>
          <li><a href="#team">VÅRT TEAM</a></li>
          <li><a href="#booking">BOKA TID</a></li>
          <li><a href="#reviews">OM OSS</a></li>
        </ul>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-media" style={{ flex: 1 }}>
            <div className="video-row">
              {heroVideos.map((video) => (
                <VideoCard
                  key={video.src}
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  likes={video.likes}
                />
              ))}
            </div>
          </div>

          <div className="hero-text">
            <h1>SHARP SOCIETY</h1>
            <p className="tagline">Frisör</p>
            <p className="subtitle"></p>
            <a href="#booking" className="btn btn-primary">Boka tid</a>
          </div>
        </div>
      </section>

      <section id="products" className="services">
        <div className="container">
          <h2>PRODUKTER</h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-color)',
            margin: '40px 0',
          }}>
            Besök vår salong för information om våra produkter
          </p>
        </div>
      </section>

      <section id="team" className="team">
        <div className="container">
          <h2>VÅRT TEAM</h2>
          <div className="team-grid">
            <div className="staff-card">
              <div className="staff-image">
                <img src="/team/alex.JPG" alt="Alex Dakermanji - Frisör" />
              </div>
              <h3>Alex Dakermandji</h3>
              <p className="staff-role">Frisör</p>
              <div style={{ maxWidth: 360, margin: '18px auto 0' }}>
                <PinkAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="booking">
        <div className="container">
          <h2>BOKA TID</h2>
          <div className="setmore-embed">
            <iframe
              src="https://sharpsocietyuf.setmore.com/book"
              style={{
                width: '100%',
                minHeight: '700px',
                border: 'none',
                borderRadius: '8px',
              }}
              allow="payment"
              title="Sharp Society Bokningssystem">
            </iframe>
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews">
        <div className="container">
          <h2>OM OSS</h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-color)',
            marginBottom: '40px',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}>
            Sharp Society föddes ur en frustration: för många barbershops nöjer sig med snabba klipp och halvdana resultat. För mig handlade det alltid om mer än så.<br />
            Jag ville skapa en plats där hantverket står i centrum, där varje detalj räknas och där kvalitet aldrig kompromissas. Jag började smått, med vänner, familj och bekanta i stolen. Där växte förståelsen för hur mycket en riktigt bra klippning kan betyda, inte bara för utseendet, utan för självförtroendet. Med tiden formades Sharp Society till det det är idag: en barbershop byggd på passion, precision och respekt för yrket.<br />
            Här kombineras klassisk barberartradition med modern stil och teknik. Varje kund, oavsett stil eller behov, behandlas med samma fokus och noggrannhet. Målet är alltid detsamma: att leverera skarpa resultat, bygga långsiktiga relationer och skapa en upplevelse du kan lita på, varje gång du sätter dig i stolen.
          </p>
          <div className="review-list" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '24px',
          }}>
            <div className="review-card" style={{
              background: '#fdfcfc',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              padding: '18px 22px',
              maxWidth: '320px',
              minWidth: '220px',
            }}>
              <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '6px' }}></div>
              <div style={{ fontStyle: 'italic', color: '#4a4545ff' }}>Bästa klippningen jag fått! Supernöjd med resultatet och bemötandet.</div>
              <div style={{ marginTop: '8px', color: '#888', fontSize: '0.95em' }}> Erik S.</div>
            </div>
            <div className="review-card" style={{
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              padding: '18px 22px',
              maxWidth: '320px',
              minWidth: '220px',
            }}>
              <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '6px' }}></div>
              <div style={{ fontStyle: 'italic', color: '#333' }}>Grym service och faden var 10/10</div>
              <div style={{ marginTop: '8px', color: '#888', fontSize: '0.95em' }}> Poul D.</div>
            </div>
            <div className="review-card" style={{
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              padding: '18px 22px',
              maxWidth: '320px',
              minWidth: '220px',
            }}>
              <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '6px' }}></div>
              <div style={{ fontStyle: 'italic', color: '#333' }}>Blev positivt överraskad! Jag gick in med ganska låga förväntningar, men frisören visade sig vara riktigt duktig (speciellt på att klippa afrohår). Resultatet blev snyggt och välgjort. Rekommenderas!.</div>
              <div style={{ marginTop: '8px', color: '#888', fontSize: '0.95em' }}> Dioncounda S.</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', background: '#070707', padding: '40px 0' }}>
        <iframe
          src="https://www.google.com/maps?q=Vnsterkroken+5,+Motala,+Östergötlands+län&output=embed"
          width="800"
          height="400"
          style={{ border: 0, borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Karta till Sharp Society">
        </iframe>
      </div>

      <footer>
        <p>&copy; 2026 Denna hemsida är skapad utav: Jelal Qaiumi - Alla rättigheter förbehållna.</p>
      </footer>
    </>
  )
}

function PinkAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <div className="pink-accordion">
      <button onClick={() => setOpen(open === 1 ? null : 1)}>
        <span>Favoritcitat</span>
        <span className="chevron">⌄</span>
      </button>
      {open === 1 && <div className="content">“Stay sharp, stay kind.”</div>}

      <button onClick={() => setOpen(open === 2 ? null : 2)}>
        <span>Favoritmat</span>
        <span className="chevron">⌄</span>
      </button>
      {open === 2 && <div className="content">Shawarma med extra vitlökssås.</div>}

      <button onClick={() => setOpen(open === 3 ? null : 3)}>
        <span>Favoritfilm</span>
        <span className="chevron">⌄</span>
      </button>
      {open === 3 && <div className="content">The Gentlemen.</div>}
    </div>
  )
}

function VideoCard({ src, title, likes }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.currentTime = 0

    video.play().catch(() => { })

    const clipLength = 2 // sekunder

    const interval = setInterval(() => {
      if (video.currentTime >= clipLength) {
        video.currentTime = 0
        video.play().catch(() => { })
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="video-card"
      style={{
        background: '#0d0d0d',
        borderRadius: 14,
        padding: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: 280,
          objectFit: 'cover',
          borderRadius: 10,
          display: 'block',
          background: '#000',
        }}
      />

      <div style={{ marginTop: 8, color: '#fff', fontWeight: 600 }}>
        {title}
      </div>

      <div style={{ position: 'absolute', left: 16, bottom: 16, color: '#fff' }}>
        {likes}
      </div>
    </div>
  )
}

export default App
