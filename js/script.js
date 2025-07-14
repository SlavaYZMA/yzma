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
                <p>2023 — Медиа-инсталляция с интерактивной шкатулкой из кокосового воска. Совместно с Ириной Даниличевой, Александрой Далибах и Яной Сорокиной. <a href="https://art-and-science-center.timepad.ru/event/2592578/" target="_blank">Подробнее</a>.</p>
                <video controls width="400">
                    <source src="sensetivy.mp4" type="video/mp4">
                    Ваш браузер не поддерживает видео.
                </video>
            `;
            modal.style.display = 'block';
        } else if (project === 'serbian-dogbook') {
            modalTitle.textContent = 'Сербско-русский собачник';
            modalBody.innerHTML = `
                <p>2023 — Зин формата А6 (6 страниц) с иллюстрациями, посвящённый общению с собачниками на сербском языке. <a href="serbian-dogbook.pdf" type="application/pdf" target="_blank">PDF</a>.</p>
                <img src="photo_2025-07-14_13-55-26.jpg" alt="Собачник" width="400">
            `;
            modal.style.display = 'block';
        } else if (project === 'sestra') {
            modalTitle.textContent = 'Сестра';
            modalBody.innerHTML = `
                <p>2024 — ИИ-бот для поддержки жертв гендерного насилия в Telegram. <a href="https://t.me/svudabot" target="_blank">Бот Горгона</a>.</p>
                <img src="sestra.jpg" alt="Сестра" width="400">
            `;
            modal.style.display = 'block';
        } else if (project === 'quantportraits') {
            modalTitle.textContent = 'Квантовые портреты';
            modalBody.innerHTML = `
                <p>2024 — Интерактивный art&science проект, где пиксели интерпретируются как квантовые объекты. <a href="https://quantportrait.netlify.app/" target="_blank">Посетить сайт</a>.</p>
                <img src="quantportrait.jpg" alt="Квантовые портреты" width="400">
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm') {
            modalTitle.textContent = 'Rajm';
            modalBody.innerHTML = `
                <p>2025 — Проект о травме через аромат, вдохновлённый данными о фемициде. В разработке с апреля 2025.</p>
                <button class="modal-btn" data-modal="rajm-essay">Эссе</button>
                <button class="modal-btn" data-modal="rajm-description">Описание</button>
                <div class="photo-gallery">
                    <img src="20250710_2103_Conceptual Perfume Sculpture_simple_compose_01jztvf40ffyxrcfjb3dryvb2n.png" alt="Скульптура" width="200">
                    <img src="20250711_1212_Ritual Stone Art_simple_compose_01jzwffgadev5ay3etmtyktv3e.png" alt="Каменное искусство" width="200">
                    <img src="20250711_1218_Ritual Silk Wristband_simple_compose_01jzwfszsmf8arav9qtbx1krwp.png" alt="Шелковый браслет" width="200">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'kombucha') {
            modalTitle.textContent = 'Сумки из чайного гриба';
            modalBody.innerHTML = `
                <p>2025 — Экологичный проект в разработке, исследующий эстетический потенциал био-материалов.</p>
                <button class="modal-btn" data-modal="kombucha-essay">Эссе</button>
                <button class="modal-btn" data-modal="kombucha-description">Описание</button>
                <div class="photo-gallery">
                    <img src="" alt="Сумка 1" width="200" style="display: none;">
                    <img src="" alt="Сумка 2" width="200" style="display: none;">
                    <img src="" alt="Сумка 3" width="200" style="display: none;">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'clay') {
            modalTitle.textContent = 'Уличный арт: Глиняные человечки';
            modalBody.innerHTML = `
                <p>2025 — Глиняные фигурки, вдохновлённые дорожными знаками, рассказывающие о жизни после знаков.</p>
                <button class="modal-btn" data-modal="clay-essay">Эссе</button>
                <button class="modal-btn" data-modal="clay-description">Описание</button>
                <div class="photo-gallery">
                    <img src="yzma/potman.webp" alt="Человечек 1" width="200">
                    <img src="yzma/streetman.webp" alt="Человечек 2" width="200">
                </div>
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm-essay') {
            modalTitle.textContent = 'Эссе: Rajm';
            modalText.innerHTML = `
                The rajm project was conceived in April 2025 and is based on data from UN Women and UNODC (2023). According to this data, approximately 85,000 cases of femicide are recorded each year, 60% of which are committed by intimate partners or family members. These numbers may seem dry and depersonalized — but for me, they became deeply personal. I spent a long time searching for a way to express an experience that is nearly impossible to articulate.<br><br>
                Femicide is not an abstract concept. It is a reality that exists alongside us, regardless of time. We see the bodies, the tools, we hear the motives — these things help us make sense of what happened. But what is it that provokes the inevitable reaction? Smell. It fills the space within minutes. A person cannot live without air for more than three minutes — breath is inevitable. Hair, skin — everything absorbs scent. And no amount of washing will erase its trace. This was the sensation that sparked my research.<br><br>
                I chose scent as a trigger for memory, guided by research on post-traumatic stress disorder (PTSD). According to the American Psychological Association (APA, 2022), around 70% of people with PTSD experience flashbacks when exposed to trauma-related smells. My grandmother once said: “The smell of a burned body — you never forget it. You’ll recognize it forever.”<br><br>
                To create the fragrance, I used only essential oils: vetiver, patchouli, geranium, sandalwood, cedarwood, and rose. This composition recreates the scent of a blood-soaked, rain-drenched stone. Vetiver and patchouli form the earthy base, evoking the texture of wet stone. Geranium and rose introduce metallic notes reminiscent of blood. Sandalwood and cedarwood anchor the scent, reinforcing its permanence. I arrived at this formula through chemistry and testing — in search of that one precise olfactory response.<br><br>
                In Marcel Proust’s In Search of Lost Time, the scent of a madeleine soaked in tea transports the narrator back to childhood — a trigger of nostalgia. But what if scent were used to create an entirely different experience? The scent of rajm, diffused through vials filled with a synthesized blend of oils, draws the visitor into the "after" — into a moment of loss, where emptiness, finality, and inevitability converge.<br><br>
                In Ancient Egypt (ca. 1500 BCE), myrrh and frankincense were used to preserve the memory of the pharaohs — a guide into the afterlife. The pharaoh died enveloped in the scent of divinity, of power. But femicide does not care how you smell. Femicide leaves that scent behind — as memory, as evidence — for all who were there, for all who participated, for all who witnessed. In rajm, the aromatic vials become not a bridge to the divine or to solace, but a reminder of death. Inhalation becomes an encounter with trauma.<br><br>
                Henri Bergson, in Matter and Memory, describes smell as a way for the past to exist in the present. Within the project, the viewer wears a cotton band soaked in glycerin — it captures both the viewer’s scent and the scent of the space around them. The project disrupts linear time. It imposes memory. It offers no choice to leave or reject the experience. One breath is all that separates now from then.<br><br>
                During the ritual, the viewer ties the cotton band, sprays the scent, and later hangs the band on a nail. This action is not meant to soothe or comfort. It is an unconscious immersion in loss — though it can also become conscious. The result is the same: the scent will remain.<br><br>
                The term rajm in Islamic law (fiqh, al-Bukhari) refers to stoning — a form of execution. Unlike animal killings, which occur for survival, human violence is unique: we can inflict pain for its own sake. And so the question arises — what does it mean, now, to be more human? The question "Which species stones its own?" — the answer may be: only humans. It is we who leave behind the scent of violence.<br><br>
                Historian William Montgomery Watt (1961) noted that such stonings were rare (1–2%), but their public nature turned violence into spectacle. It was not just the person being executed who became the victim — the audience did too.<br><br>
                rajm explores the aftermath of violence: emptiness, hopelessness, the strange relief of the end. All of these elements are woven into a singular experience. The madeleine of Proust becomes the scent of loss. The Egyptian tradition becomes a journey into void. Bergson’s flowing memory is broken by the band, forcing remembrance of what we would rather turn away from. rajm is a direct encounter with loss. It is a place where the viewer is left with a scent that cannot be washed away. An acceptance of what smells like death. A project that renders violence tangible — through breath.
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

    const timelineItems = document.querySelectorAll('.timeline-item');
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

    document.querySelectorAll('a, button, .timeline-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
});
