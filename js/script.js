document.addEventListener('DOMContentLoaded', () => {
    // Открытие модального окна для кнопок process-btn
    document.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем прокрутку
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку
            }
        });
    });

    // Открытие модального окна для элементов таймлайна
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку
            }
        });
    });

    // Закрытие модального окна
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
            }
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
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
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
    }
}
