const API_BASE = 'http://localhost:3000/api';

// Ladda tjänster vid sidans start
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    setMinDate();
    initNavigation();
});

// Initialize navigation - highlight active link
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Premium slideshow for hero
function initSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;
    const slides = Array.from(slideshow.querySelectorAll('.slide'));
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');
    const dotsContainer = document.getElementById('slide-dots');
    const slidesContainer = slideshow.querySelector('.slides');
    
    let index = 0;
    let timer = null;
    let touchStart = 0;
    let touchEnd = 0;

    // Navigate to slide
    function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
    }

    // Create navigation dots
    slides.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Visa bild ' + (idx+1));
        btn.addEventListener('click', () => {
            pause();
            show(idx);
        });
        dotsContainer.appendChild(btn);
    });

    // Button click handlers
    prevBtn.addEventListener('click', () => { pause(); show(index - 1); });
    nextBtn.addEventListener('click', () => { pause(); show(index + 1); });

    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { pause(); show(index - 1); }
        if (e.key === 'ArrowRight') { pause(); show(index + 1); }
    });

    // Touch swipe support (mobile)
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStart = e.changedTouches[0].clientX;
    }, false);

    slidesContainer.addEventListener('touchend', (e) => {
        touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) { pause(); show(index + 1); }
        if (touchEnd - touchStart > 50) { pause(); show(index - 1); }
    }, false);

    // Auto-play controls
    function start() {
        pause();
        timer = setInterval(() => show(index + 1), 4500);
    }

    function pause() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    // Pause on hover, resume on leave
    slideshow.addEventListener('mouseenter', pause);
    slideshow.addEventListener('mouseleave', start);

    // Initialize
    show(0);
    start();
}

document.addEventListener('DOMContentLoaded', () => initSlideshow());

// Ladda recensioner från servern
async function loadReviews() {
    const container = document.getElementById('reviews-list');
    if (!container) return;
    try {
        const resp = await fetch('/api/reviews');
        const reviews = await resp.json();
        if (!reviews || reviews.length === 0) {
            container.innerHTML = '<p>Inga omdömen hittades.</p>';
            return;
        }

        container.innerHTML = reviews.map(r => `
            <div class="review-card">
                <div class="review-text">${escapeHtml(r.text)}</div>
                ${r.author ? `<div class="review-author">— ${escapeHtml(r.author)}</div>` : ''}
                ${r.rating ? `<div class="review-rating">${escapeHtml(r.rating)}</div>` : ''}
            </div>
        `).join('');
    } catch (err) {
        console.error('Fel vid hämtning av recensioner:', err);
        container.innerHTML = '<p>Fel vid hämtning av omdömen.</p>';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&"'<>]/g, function (s) {
        return ({'&':'&amp;','"':'&quot;',"'":"&#39;",'<':'&lt;','>':'&gt;'})[s];
    });
}

// Kör loadReviews på start
document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
});

// Hämta tjänster från API
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE}/services`);
        const services = await response.json();

        // Fyll tjänst-listan på bokningssidan
        const serviceSelect = document.getElementById('service');
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.name;
            option.textContent = `${service.name} (${service.duration} min) - ${service.price} kr`;
            serviceSelect.appendChild(option);
        });

        // Visa tjänster i tjänster-sektionen
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = services.map(service => `
            <div class="service-card">
                <h3>${service.name}</h3>
                <p>⏱️ ${service.duration} minuter</p>
                <div class="service-price">${service.price} kr</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Fel vid hämtning av tjänster:', error);
    }
}

// Sätt minimaldatum (idag)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
}

// Hantera datumval
document.getElementById('date').addEventListener('change', loadAvailableTimes);

// Ladda lediga tider för valt datum
async function loadAvailableTimes() {
    const selectedDate = document.getElementById('date').value;
    if (!selectedDate) return;

    try {
        const response = await fetch(`${API_BASE}/bookings/${selectedDate}`);
        const bookings = await response.json();

        // Generera alla tider
        const times = generateTimeSlots();
        const bookedTimes = bookings.map(b => b.time);

        // Uppdatera time-select
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = '<option value="">Välj tid</option>';

        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            if (bookedTimes.includes(time)) {
                option.disabled = true;
                option.textContent += ' (Bokad)';
            }
            timeSelect.appendChild(option);
        });

        // Visa lediga tider visuellt
        displayAvailableTimes(times, bookedTimes);
    } catch (error) {
        console.error('Fel vid hämtning av lediga tider:', error);
    }
}

// Generera tidslots (30 min intervall, 08:00 - 17:00)
function generateTimeSlots() {
    const times = [];
    for (let i = 8; i < 17; i++) {
        times.push(`${String(i).padStart(2, '0')}:00`);
        times.push(`${String(i).padStart(2, '0')}:30`);
    }
    return times;
}

// Visa lediga tider visuellt
function displayAvailableTimes(times, bookedTimes) {
    const container = document.getElementById('available-times');
    const timesList = document.getElementById('times-list');
    
    timesList.innerHTML = times.map(time => `
        <div class="time-slot ${bookedTimes.includes(time) ? 'booked' : ''}" 
             ${!bookedTimes.includes(time) ? `onclick="selectTime('${time}')"` : ''}>
            ${time}
        </div>
    `).join('');

    container.style.display = 'block';
}

// Välj tid från visuell kalender
function selectTime(time) {
    document.getElementById('time').value = time;
}

// Hantera bokningsformulär
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const booking = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        notes: document.getElementById('notes').value
    };

    try {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        const data = await response.json();
        const messageDiv = document.getElementById('booking-message');

        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = '✓ Bokningen är bekräftad! Vi ses då!';
            document.getElementById('booking-form').reset();
            loadAvailableTimes();
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = '✗ ' + data.error;
        }

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } catch (error) {
        console.error('Fel vid bokning:', error);
        const messageDiv = document.getElementById('booking-message');
        messageDiv.className = 'message error';
        messageDiv.textContent = '✗ Ett fel uppstod. Försök igen senare.';
    }
});

// Admin: Ladda bokningar för valt datum
async function loadBookingsForAdmin() {
    const date = document.getElementById('admin-date').value;
    if (!date) {
        alert('Välj ett datum');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/bookings/${date}`);
        const bookings = await response.json();

        const tbody = document.getElementById('bookings-tbody');
        const table = document.getElementById('bookings-table');

        if (bookings.length === 0) {
            table.style.display = 'none';
            const messageDiv = document.getElementById('admin-message');
            messageDiv.className = 'message';
            messageDiv.textContent = 'Inga bokningar för detta datum.';
            messageDiv.style.display = 'block';
            return;
        }

        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.phone}</td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td>${booking.notes || '-'}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteBooking(${booking.id})">Ta bort</button>
                </td>
            </tr>
        `).join('');

        table.style.display = 'table';
        document.getElementById('admin-message').style.display = 'none';
    } catch (error) {
        console.error('Fel vid hämtning av bokningar:', error);
    }
}

// Admin: Ta bort bokning
async function deleteBooking(id) {
    if (!confirm('Är du säker på att du vill ta bort denna bokning?')) return;

    try {
        const response = await fetch(`${API_BASE}/bookings/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const messageDiv = document.getElementById('admin-message');
            messageDiv.className = 'message success';
            messageDiv.textContent = '✓ Boningen är raderad';
            messageDiv.style.display = 'block';
            loadBookingsForAdmin(); // Uppdatera listan
        }
    } catch (error) {
        console.error('Fel vid radering:', error);
    }
}

// Ställ in dagens datum som standard i admin-datum
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('admin-date').value = today;
});
