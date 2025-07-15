document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, начинаю настройку событий');

    // Открытие модального окна для кнопок process-btn
    document.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                console.log(`Открываю модальное окно ${modalId}`);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.log(`Модальное окно ${modalId} не найдено`);
            }
        });
    });

    // Открытие модального окна для элементов таймлайна
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                console.log(`Клик по .timeline-item, открываю ${modalId}`);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.log(`Модальное окно ${modalId} не найдено для .timeline-item`);
            }
        });
    });

    // Закрытие модального окна
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                console.log(`Закрываю модальное окно ${modal.id}`);
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                console.log(`Закрытие модального окна ${modal.id} по клику вне`);
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Анимация появления при скроллинге
    function checkVisibility() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
});

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log(`Закрытие модального окна ${modalId} через функцию`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
