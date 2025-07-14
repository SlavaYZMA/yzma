const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    function showModal(project) {
        modalTitle.textContent = '';
        modalBody.innerHTML = '';

        if (project === 'chutkost') {
            modalTitle.textContent = 'Чуткость';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Сентябрь 2023 — Медиа-инсталляция с интерактивной шкатулкой из кокосового воска. Совместно с Ириной Даниличевой, Александрой Далибах и Яной Сорокиной. <a href="https://art-and-science-center.timepad.ru/event/2592578/" target="_blank">Подробнее</a>.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <video controls width="400">
                        <source src="sensetivy.mp4" type="video/mp4">
                        Ваш браузер не поддерживает видео.
                    </video>
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'serbian-dogbook') {
            modalTitle.textContent = 'Сербско-русский собачник';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Март 2024 — Зин формата А6 (6 страниц) с иллюстрациями, посвящённый общению с собачниками на сербском языке. <a href="serbian-dogbook.pdf" type="application/pdf" target="_blank">PDF</a>.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <img src="photo_2025-07-14_13-55-26.jpg" alt="Собачник" width="400" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'sestra') {
            modalTitle.textContent = 'Сестра';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Сентябрь 2024 — ИИ-бот для поддержки жертв гендерного насилия в Telegram. <a href="https://t.me/svudabot" target="_blank">Бот Горгона</a>.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <img src="sestra.jpg" alt="Сестра" width="400" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'quantportraits') {
            modalTitle.textContent = 'Квантовые портреты';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Май 2025 — Интерактивный art&science проект, где пиксели интерпретируются как квантовые объекты. <a href="https://quantportrait.netlify.app/" target="_blank">Посетить сайт</a>.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <img src="yzmaport/quantportret.png" alt="Квантовые портреты" width="400" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm') {
            modalTitle.textContent = 'Rajm';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Июнь 2025 — Проект о травме через аромат, вдохновлённый данными о фемициде.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <div class="photo-gallery">
                        <img src="20250710_2103_Conceptual Perfume Sculpture_simple_compose_01jztvf40ffyxrcfjb3dryvb2n.png" alt="Скульптура" width="200" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                        <img src="20250711_1212_Ritual Stone Art_simple_compose_01jzwffgadev5ay3etmtyktv3e.png" alt="Каменное искусство" width="200" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                        <img src="20250711_1218_Ritual Silk Wristband_simple_compose_01jzwfszsmf8arav9qtbx1krwp.png" alt="Шелковый браслет" width="200" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                    </div>
                </div>
                <div class="modal-section">
                    <h4>Дополнительно</h4>
                    <button class="modal-btn" data-modal="rajm-essay">Эссе</button>
                    <button class="modal-btn" data-modal="rajm-description">Описание</button>
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'kombucha') {
            modalTitle.textContent = 'Сумки из чайного гриба';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Июль 2025 — Экологичный проект в разработке, исследующий эстетический потенциал био-материалов.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <div class="photo-gallery">
                        <img src="kombucha.jpg" alt="Сумка 1" width="200" style="display: none;" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                    </div>
                </div>
                <div class="modal-section">
                    <h4>Дополнительно</h4>
                    <button class="modal-btn" data-modal="kombucha-essay">Эссе</button>
                    <button class="modal-btn" data-modal="kombucha-description">Описание</button>
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'clay') {
            modalTitle.textContent = 'Уличный арт: Глиняные человечки';
            modalBody.innerHTML = `
                <div class="modal-section">
                    <h4>Описание</h4>
                    <p>Июль 2025 — Глиняные фигурки, вдохновлённые дорожными знаками.</p>
                </div>
                <div class="modal-section">
                    <h4>Медиа</h4>
                    <div class="photo-gallery">
                        <img src="potman.webp" alt="Человечек 1" width="200" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                        <img src="streetman.webp" alt="Человечек 2" width="200" onerror="this.style.display='none'; this.parentElement.style.display='none';">
                    </div>
                </div>
                <div class="modal-section">
                    <h4>Дополнительно</h4>
                    <button class="modal-btn" data-modal="clay-essay">Эссе</button>
                    <button class="modal-btn" data-modal="clay-description">Описание</button>
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm-essay') {
            modalTitle.textContent = 'Эссе: Rajm';
            modalBody.innerHTML = `
                <p>The rajm project was conceived in April 2025 and is based on data from UN Women and UNODC (2023). According to this data, approximately 85,000 cases of femicide are recorded each year, 60% of which are committed by intimate partners or family members. These numbers may seem dry and depersonalized — but for me, they became deeply personal. I spent a long time searching for a way to express an experience that is nearly impossible to articulate.</p>
                <p>Femicide is not an abstract concept. It is a reality that exists alongside us, regardless of time. We see the bodies, the tools, we hear the motives — these things help us make sense of what happened. But what is it that provokes the inevitable reaction? Smell. It fills the space within minutes. A person cannot live without air for more than three minutes — breath is inevitable. Hair, skin — everything absorbs scent. And no amount of washing will erase its trace. This was the sensation that sparked my research.</p>
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm-description') {
            modalTitle.textContent = 'Описание: Rajm';
            modalBody.innerHTML = `
                <p>Concept — The project “rajm” began in April 2025, inspired by UN Women and UNODC data (2023), recording 85,000 annual femicide cases. Of these, 51,100 (60%) were by intimate partners or family. This personal resonance drove me to express the inexpressible.</p>
                <p>Scent as Trigger — Using vetiver, patchouli, geranium, sandalwood, cedarwood, and rose, I crafted a fragrance evoking blood-soaked stone, tested with synthetic molecules like geosmin.</p>
                <p>Installation — A 50 m² space with dim lighting, featuring scent vials, cotton bands, and a nail wall for visitor interaction.</p>
            `;
            modal.style.display = 'block';
        } else if (project === 'kombucha-essay') {
            modalTitle.textContent = 'Эссе: Сумки из чайного гриба';
            modalBody.innerHTML = 'Текст эссе будет добавлен позже.';
            modal.style.display = 'block';
        } else if (project === 'kombucha-description') {
            modalTitle.textContent = 'Описание: Сумки из чайного гриба';
            modalBody.innerHTML = 'Описание будет добавлено позже.';
            modal.style.display = 'block';
        } else if (project === 'clay-essay') {
            modalTitle.textContent = 'Эссе: Уличный арт: Глиняные человечки';
            modalBody.innerHTML = 'Текст эссе будет добавлен позже.';
            modal.style.display = 'block';
        } else if (project === 'clay-description') {
            modalTitle.textContent = 'Описание: Уличный арт: Глиняные человечки';
            modalBody.innerHTML = 'Описание будет добавлено позже.';
            modal.style.display = 'block';
        } else if (project === 'essay') {
            modalTitle.textContent = 'Моё эссе';
            modalBody.innerHTML = '';
            modal.style.display = 'block';
        }
    }

    const timelineItems = document.querySelectorAll('.timeline-item, .timeline-dot');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const project = item.getAttribute('data-modal');
            showModal(project);
        });
    });

    const modalButtons = document.querySelectorAll('.modal-btn');
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const project = button.getAttribute('data-modal');
            showModal(project);
        });
    });

    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    // Кастомный курсор
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    document.querySelectorAll('a, button, .timeline-item, .timeline-dot').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Параллакс-эффект
    const parallaxElements = document.querySelectorAll('.timeline-item');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = 0.2;
            el.style.transform = `translateX(${scrollPosition * speed * -0.1}px)`;
        });
        canvas.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    });
});
