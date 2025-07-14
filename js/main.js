
    ru: { intro: "Пожалуйста, выберите язык", upload: "Загрузите изображение для квантового портрета", animation: "Двигайте курсор для коллапса суперпозиции", result: "Ваш квантовый портрет сохранён" },
    en: { intro: "Please select a language", upload: "Upload an image for a quantum portrait", animation: "Move cursor to collapse superposition", result: "Your quantum portrait is saved" }
};

function setLanguage(lang) {
    document.querySelectorAll('.text-block').forEach(el => {
        const step = el.parentElement.id;
