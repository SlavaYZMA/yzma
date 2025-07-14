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

// Функция закрытия модального окна
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

    // Модальное окно
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
        }
    }

    // Привязка события клика к элементам с data-modal
    const workItems = document.querySelectorAll('.work-item[data-modal]');
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const project = item.getAttribute('data-modal');
            showModal(project);
        });
    });

    // Привязка события к крестику
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
