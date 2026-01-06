import { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './App.css'
import React from 'react'
function App() {
  const [count, setCount] = useState(0)


  return (
    <>

      <nav className='sidebar'>
        <div className="sidebar-logo">
          <img src="SHARP2.JPG" alt="Sharp Society logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="#products">PRODUKTER</a></li>
          <li><a href="#team">VÅRT TEAM</a></li>
          <li><a href="#booking">BOKA TID</a></li>
          <li><a href="#home">OM OSS</a></li>
        </ul>
      </nav>


      <section id="home" className="hero">
        <div className="hero-content">
          <EmblaHeroCarousel />




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
            textAlign: "center",
            color: "var(--text-color)",
            margin: "40px 0",
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
              <h3>Alex Dakermanji</h3>
              <p className="staff-role">Frisör</p>
            </div>

          </div>
          <p className="team-note"> <code></code> </p>
        </div>
      </section>





      <section id="booking" className="booking">
        <div className="container">
          <h2>BOKA TID</h2>
          <div className="setmore-embed">
            <iframe
              src="https://sharpsocietyuf.setmore.com/book"
              style={{
                width: "100%",
                minHeight: "700px",
                border: "none",
                borderRadius: "8px",
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
            textAlign: "center",
            color: "var(--text-color)",
            marginBottom: "40px",
            fontSize: "1.1rem",
            lineHeight: 1.8
          }}>
            Sharp Society är en modern barbershop och frisering som sätter kvalitet och service i första rummet.<br />
            Med skicklig barberare, noggrannhet i varje detalj och en avslappnad atmosfär erbjuder vi klippningar och behandlingar på högsta nivå.<br />
            Här står kundens stil och upplevelse i fokus – alltid med ett skarpt resultat och professionell service.
          </p>
          <div className="review-list" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
            marginBottom: "24px"
          }}>
            <div className="review-card" style={{
              background: "#fdfcfc",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "18px 22px",
              maxWidth: "320px",
              minWidth: "220px"
            }}>
              <div style={{ color: "#FFD700", fontSize: "1.2rem", marginBottom: "6px" }}>★★★★★</div>
              <div style={{ fontStyle: "italic", color: "#333" }}>“Bästa klippningen jag fått! Supernöjd med resultatet och bemötandet.”</div>
              <div style={{ marginTop: "8px", color: "#888", fontSize: "0.95em" }}>– Erik S.</div>
            </div>
            <div className="review-card" style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "18px 22px",
              maxWidth: "320px",
              minWidth: "220px"
            }}>
              <div style={{ color: "#FFD700", fontSize: "1.2rem", marginBottom: "6px" }}>★★★★★</div>
              <div style={{ fontStyle: "italic", color: "#333" }}>“Grym service och faden var 10/10”</div>
              <div style={{ marginTop: "8px", color: "#888", fontSize: "0.95em" }}>– Poul D.</div>
            </div>
            <div className="review-card" style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              padding: "18px 22px",
              maxWidth: "320px",
              minWidth: "220px"
            }}>
              <div style={{ color: "#FFD700", fontSize: "1.2rem", marginBottom: "6px" }}>★★★★★</div>
              <div style={{ fontStyle: "italic", color: "#333" }}>“Blev positivt överraskad! Jag gick in med ganska låga förväntningar, men frisören visade sig vara riktigt duktig (speciellt på att klippa afrohår). Resultatet blev snyggt och välgjort. Rekommenderas!.”</div>
              <div style={{ marginTop: "8px", color: "#888", fontSize: "0.95em" }}>– Dioncounda S.</div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: "flex", justifyContent: "center", background: "#070707", padding: "40px 0" }}>
        <iframe
          src="https://www.google.com/maps?q=Vänsterkroken+5,+Motala,+Östergötlands+län&output=embed"
          width="800"
          height="400"
          style={{ border: 0, borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Karta till Sharp Society">
        </iframe>
      </div>
      <footer>
        <p>&copy; 2025 Sharp Society - Alla rättigheter förbehållna.</p>
      </footer>
    </>
  )
}
function EmblaHeroCarousel() {  const heroImages = [
    '/slideshow/1.JPG',
    '/slideshow/2.JPG',
    '/slideshow/3.JPG',
    '/slideshow/4.JPG',
    '/slideshow/5.JPG',
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="slideshow" style={{ maxWidth: 420, margin: '0 auto', position: 'relative', borderRadius: 18, boxShadow: '0 6px 32px rgba(0,0,0,0.18)' }}>
      <div className="embla" ref={emblaRef} style={{ overflow: 'hidden', borderRadius: 18 }}>
        <div className="embla__container" style={{ display: 'flex' }}>
          {heroImages.map((src, idx) => (
            <div className="embla__slide" key={src} style={{ flex: '0 0 100%', minWidth: 0, position: 'relative', height: 340 }}>
              <img src={src} alt={`Bild ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }} />
            </div>
          ))}
        </div>
      </div>

      <button className="slide-prev" aria-label="Föregående" onClick={scrollPrev}>‹</button>
      <button className="slide-next" aria-label="Nästa" onClick={scrollNext}>›</button>

    </div>
  );
}
export default App
