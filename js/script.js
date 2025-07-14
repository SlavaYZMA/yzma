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
    const modalText = document.getElementById('modal-text');

    function showModal(project) {
        if (project === 'chutkost') {
            modalTitle.textContent = 'Экспликация: Чуткость';
            modalText.innerHTML = `
                Чуткость как новая экология, 2023<br>
                Слава Иванова, Ирина Даниличева, Александра Далибах, Яна Сорокина<br>
                Медиа-инсталляция<br>
                Что такое чуткость? Чуткость – это внимательное отношение к окружающему миру и его многогранности. Чуткость – это ощущение детского любопытства ко всему незнакомому, отличному от нас. Исследуя концепцию чуткости, художники создали инсталляцию, которая возвращает посетителей в мир детской игры.<br><br>
                Инсталляция отсылает к детскому ритуалу создания секретиков – тайника с «сокровищами», где хранилось все самое ценное. В инсталляции роль такого тайника выполняет небольшая шкатулка из кокосового воска. Внутри шкатулки спрятан один из значимых матчей футбольного клуба «Зенит». Подобно полузабытому воспоминанию, матч представляет из себя обобщенный образ игры, где траектория движения игроков перекодирована в световые точки. Коробочка с секретом является интерактивным объектом, который можно открыть, потрогать, послушать, вдохнуть аромат газона. Реагируя на тепло человеческих рук, воск постепенно стирается: объект, как и весь окружающий мир, реагирует на действия человека.<br><br>
                Рядом с коробочкой можно посмотреть интервью со спортивными болельщиками. Авторы вместе с любителями спорта рассуждают о чуткости и экологии.<br><br>
                Взаимодействие с инсталляцией расширяет наше представление о связи чуткости и экологии, где детское любопытство и бережное отношение к хрупкому – это основа экологичной жизни. На сайте проекта размещены полезные материалы об эко-привычках, трендах и челленджах, которые несложно повторить каждому.
            `;
            modal.style.display = 'block';
        } else if (project === 'rajm-essay') {
            modalTitle.textContent = 'Эссе: The Rajm Project';
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
            modalTitle.textContent = 'Описание проекта: “rajm”';
            modalText.innerHTML = `
                Concept<br>
                The project “rajm” was born in April 2025, three months ago, when I began researching UN Women and UNODC data (2023), which recorded 85,000 cases of femicide annually. Of these, 51,100 (60%) were the result of violence by intimate partners or family members. These cold and depersonalized numbers resonated with me on a deeply personal level: as a survivor of gender-based violence, I was searching for a way to express what cannot be put into words. At the same time, I have been developing an AI-based bot to support victims of violence, which pushed me to explore new forms of engaging with traumatic experience.<br><br>
                Femicide is not an abstraction, but a parallel reality. We see the bodies, the tools, we hear the causes — all of that is explainable. But there is something else, something that awakens a feeling one cannot escape: smell. It spreads through space in a matter of minutes. A person cannot live without air for more than 180 seconds — hair absorbs it, skin retains it, and no amount of washing will erase the trace. That experience became the starting point.<br><br>
                Scent as a Memory Trigger<br>
                I chose scent as an uncontrollable trigger, inspired by PTSD research. According to APA (2022), smells linked to trauma activate the limbic system in 70% of survivors, causing flashbacks. Instead of using physical materials like blood or stone, I turned to synthesis, working with essential oils: vetiver, patchouli, geranium, sandalwood, cedarwood, and rose.<br><br>
                Vetiver and patchouli form an earthy base, evoking the scent of wet stone after rain. Geranium and rose add a metallic note reminiscent of blood. Sandalwood and cedarwood stabilize the composition, symbolizing the inevitability of memory. This is not about aesthetics — it is about refusal to forget.<br><br>
                I started with studio experiments, testing friends’ reactions to synthetic molecules (geosmin, 1-octen-3-ol). These tests revealed that scent could become a bridge between statistics and personal experience. “rajm” is not just an installation — it is a ritual in which the viewer becomes the keeper of trauma through scent, sound, and movement.<br><br>
                Femicide: Scientific Context<br>
                The term “femicide,” introduced by Diana Russell, refers to gender-based killings of women as a form of systemic violence. According to UN Women and UNODC (2023), 85,000 women and girls die every year; 51,100 of them at the hands of men they know; the home is the most dangerous place.<br><br>
                My project refers to feminist art and Judith Butler’s ideas on corporeality and vulnerability, offering not just data fixation but its reinterpretation through sensory experience.<br><br>
                Rajm: History and Symbolism<br>
                Rajm (stoning) is mentioned in Islamic jurisprudence (fiqh) as a punishment for adultery, conditional upon the testimony of four witnesses or a confession. Historian William Montgomery Watt (1961) notes that such cases were rare (1–2%), but their symbolic function — public condemnation — left a lasting impact.<br><br>
                In the Middle East, North Africa, and South Asia, rajm was used until the 19th century as a form of social control over women. Even today, this practice persists in some conflict zones, such as Afghanistan, where public executions resumed under Taliban control since 2021 (Human Rights Watch, 2023).<br><br>
                My project interprets rajm as a universal trauma, comparable to the European witch trials. Scent becomes a way to activate these memories, linking past and present.<br><br>
                Scent, Memory, and PTSD<br>
                Olfaction is directly connected to the limbic system — the hippocampus and amygdala — responsible for emotion and memory. It bypasses the thalamus, making smell perception especially intense.<br><br>
                According to Herz (2016) and APA (2022): Olfactory signals are recorded more strongly than visual ones; 70% of PTSD survivors experience flashbacks triggered by smell; Molecules like 1-octen-3-ol and geosmin recreate the scent of blood and wet stone.<br><br>
                A Cambridge study (Dalton, 2019) revealed a 35% increase in PTSD symptoms among witnesses of rajm. Neuroscientist Michael Hasselmo (2017) notes that the amygdala stores emotional memory for long periods.<br><br>
                My fragrance applies these principles. Vetiver and patchouli evoke earth after violence, geranium evokes blood.<br><br>
                Scientific Rationale for the Fragrance<br>
                Composition: Vetiver (40%) and patchouli (20%) contain khusimol and patchoulol — geosmin analogs; Geranium (15%) and rose (5%) provide citronellol and geraniol — substitutes for the scent of blood; Sandalwood (10%) and cedarwood (10%) add fixation and depth.<br><br>
                Stages and Timeline<br>
                July 10–12, 2025 — oil preparation<br>
                July 13–17 — blend testing with 10 volunteers<br>
                July 18–27 — maceration<br>
                July 28 – August 1 — conservation<br>
                August 2–13 — production of 50 bottles and bands, trial installation<br>
                August 14–15 — final adjustments and packaging<br><br>
                Project Budget<br>
                Materials: Oils (6 types): €12 per 10 ml; Ethanol: €10 per liter; Glycerin: €12 per liter<br>
                Components: Bottle: €10 per 50 ml; Stone engraving and shaping: €25; Stands: €200; Fabric: €50; Nails: €10; Panel: €50<br>
                Exhibition: Display bottles (5 pcs): €150; Testers (5 pcs): €25; Bands: €50; Nail wall: €60; Additional stands: €200<br>
                Total: Minimum €340, with reserve — approx. €400<br>
                Additional: +€5 for each visitor who takes a sample<br><br>
                Installation: Space and Structure<br>
                Space: A 50 m² room with dim lighting (300 lux), gray textured walls. Accommodates 10–15 visitors at a time, interaction lasts 15–20 minutes.<br>
                Zones: Zone 1 (Entrance): wooden chest with bands, bilingual instruction; Zone 2 (Center): 5 stone stands engraved with "رجم", fragrance bottles, audio track (rain, footsteps); Zone 3 (Exit): wall with 100 nails. The visitor hangs the band and receives a box with a scent sample and a stone<br><br>
                Visitor Journey: Entrance: choosing and putting on the band; Center: inhaling the scent, listening to audio; Exit: hanging the band, receiving the sample box<br><br>
                Logistics: Launch date: after August 16, 2025; Space: 50+ m²; Budget: from €1,000; Staff: 1 curator, 1 audio technician; Promotion: social media, press release<br><br>
                Design Sketches (left to right): Bottle: 50 ml, dark glass set in stone, with atomizer. Weight — 200 g, height — 7 cm; Tester: 5 ml, frosted glass engraved with "رجم". Height — 4 cm; Band: white cotton, 5 × 30 cm, embroidered with "رجم", infused with glycerin
            `;
            modal.style.display = 'block';
        } else if (project === 'kombucha-essay') {
            modalTitle.textContent = 'Эссе: Сумки из чайного гриба';
            modalText.innerHTML = 'Текст эссе будет добавлен позже, когда проект будет готов.';
            modal.style.display = 'block';
        } else if (project === 'kombucha-description') {
            modalTitle.textContent = 'Описание проекта: Сумки из чайного гриба';
            modalText.innerHTML = 'Описание проекта будет добавлено позже, когда работа над ним завершится.';
            modal.style.display = 'block';
        } else if (project === 'clay-essay') {
            modalTitle.textContent = 'Эссе: Уличный арт: Глиняные человечки';
            modalText.innerHTML = 'Текст эссе будет добавлен позже, когда проект будет готов.';
            modal.style.display = 'block';
        } else if (project === 'clay-description') {
            modalTitle.textContent = 'Описание проекта: Уличный арт: Глиняные человечки';
            modalText.innerHTML = 'Описание проекта будет добавлено позже, когда работа над ним завершится.';
            modal.style.display = 'block';
        }
    }

    const workItems = document.querySelectorAll('.work-item[data-modal]');
    workItems.forEach(item => {
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
});
