console.log('particles.js loaded');

window.particles = [];
window.quantumStates = [];
window.decompositionTimer = 0;
window.mouseWave = { x: 0, y: 0, radius: 0, trail: [] };
window.terminalMessages = [];
window.globalMessageCooldown = 0;
window.phaseTimer = 0;
window.globalPhase = 'chaos'; // Фазы: chaos, clustering, synchronization, wavefront, spiral-migration
window.grid = [];
window.vortexCenters = []; // Центры вихрей

// Сообщения
const messages = {
    initialize: [
        "Инициализация биоквантовой экосистемы портрета.",
        "Формирование квантовой биосетки. Пиксели оживают.",
        "Запуск квантовой биодекомпозиции."
    ],
    initializeSuccess: [
        "Экосистема активна: ${validParticles} квантовых состояний.",
        "Успешно оживлено: ${validParticles} биоквантов.",
        "Портрет трансформирован в ${validParticles} состояний."
    ],
    initializeError: [
        "Ошибка: биоквантовая сетка не сформирована.",
        "Не удалось оживить систему. Требуется изображение.",
        "Аномалия: данные изображения не пригодны."
    ],
    update: [
        "Биоквантовая экосистема пульсирует в фазе ${phase}.",
        "Кванты текут в живом квантовом поле.",
        "Эволюция: кванты создают биоквантовый танец."
    ],
    decomposition: [
        "Декомпозиция портрета: прозрачность ${imgAlpha}/255.",
        "Изображение растворяется в биоквантовом потоке.",
        "Переход в квантовую биосреду: ${imgAlpha}/255."
    ],
    blockFormation: [
        "Пиксели сливаются в биокластеры формы ${shape}.",
        "Формирование живых блоков: текстура оживает.",
        "Квантовая биология: пиксели образуют ${shape}."
    ],
    stabilized: [
        "Биоквантовая экосистема стабилизирована.",
        "Органические квантовые состояния синхронизированы.",
        "Кванты живут в бесконечном квантовом танце."
    ],
    scatter: [
        "Кванты текут, как микроорганизмы в биосреде.",
        "Биоквантовая система: спины формируют узоры.",
        "Органическое рассеяние квантов."
    ],
    superposition: [
        "Квант в суперпозиции: форма ${shape}, спин ${spin}.",
        "Биоквантовая суперпозиция: живая форма ${shape}.",
        "Квант живёт в суперпозиции: спин ${spin}."
    ],
    mouseInfluence: [
        "Наблюдение возмущает биокванты, изменяя спины.",
        "Волновой пакет наблюдателя оживляет кванты.",
        "Квантовое воздействие меняет биопотоки."
    ],
    featureAttraction: [
        "Кванты текут к ключевым точкам, как клетки.",
        "Биоквантовая структура формируется у лица.",
        "Кванты пульсируют у ключевых координат."
    ],
    interference: [
        "Квантовая интерференция создаёт живые узоры.",
        "Волновые функции текут, как мембраны.",
        "Интерференция формирует биоквантовые связи."
    ],
    tunneling: [
        "Квант со спином ${spin} мигрировал через барьер.",
        "Биоквантовая миграция: квант ожил в новом состоянии.",
        "Квант туннелировал, как живая клетка."
    ],
    entanglement: [
        "Запутанные кванты пульсируют синхронно.",
        "Квантовая нелокальность: спины связаны.",
        "Запутанность создаёт живую корреляцию."
    ],
    globalEntanglement: [
        "Глобальная запутанность: кванты синхронизированы.",
        "Экосистема вошла в состояние глобальной корреляции.",
        "Нелокальная гармония квантов активирована."
    ],
    wavefront: [
        "Глобальный волновой фронт оживляет экосистему.",
        "Кванты текут, как волна в биосреде.",
        "Волновой всплеск синхронизирует кванты."
    ],
    phaseTransition: [
        "Квантовый фазовый переход: система в фазе ${phase}.",
        "Биоквантовая эволюция: переход к ${phase}.",
        "Экосистема трансформируется в фазу ${phase}."
    ],
    precession: [
        "Спиновая прецессия кванта ${index}: ритм изменён.",
        "Квант ${index} прецессирует, как живая структура.",
        "Биоквант ${index} меняет спиновый ритм."
    ],
    diffusion: [
        "Квант ${index} диффундирует в биосреде.",
        "Биоквантовая диффузия: квант ${index} расплывается.",
        "Квант ${index} расширяет волновую функцию."
    ],
    decoherence: [
        "Квант ${index} потерял когерентность.",
        "Биоквант ${index} стабилизировался из-за декогеренции.",
        "Декогеренция: квант ${index} утратил квантовые свойства."
    ],
    decoherenceRestore: [
        "Квант ${index} восстановил квантовую когерентность.",
        "Биоквант ${index} ожил в суперпозиции.",
        "Квант ${index} вернулся к квантовой жизни."
    ],
    spiralMigration: [
        "Кванты закручиваются в биоквантовые вихри.",
        "Спиральная миграция: кванты текут, как живые потоки.",
        "Биокванты формируют вихревые биоструктуры."
    ],
    vortexSingularity: [
        "Вихревая сингулярность: кванты схлопываются в центр.",
        "Квантовая сингулярность активировала биопотоки.",
        "Глобальный вихрь оживляет квантовую экосистему."
    ],
    error: [
        "Ошибка в биоквантовой системе: квант ${index} не обновлён.",
        "Аномалия: спин кванта ${index} не изменился.",
        "Биоквантовая ошибка: квант ${index} не ожил."
    ]
};

// Выбор случайного сообщения
function getRandomMessage(type, params = {}) {
    let msgArray = messages[type];
    let msg = msgArray[Math.floor(Math.random() * msgArray.length)];
    for (let key in params) {
        msg = msg.replace(`\${${key}}`, params[key]);
    }
    return `[${new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}] ${msg}`;
}

// Обновление терминального лога
window.updateTerminalLog = function() {
    const maxMessages = 10;
    while (window.terminalMessages.length > maxMessages) {
        window.terminalMessages.shift();
    }
    const terminalDiv = document.getElementById(`terminal-log-step-${window.currentStep}`);
    if (terminalDiv) {
        terminalDiv.innerHTML = window.terminalMessages.map(msg => 
            `<div class="${msg.includes('туннелировал') || msg.includes('мигрировал') ? 'tunneling' : msg.includes('интерференция') ? 'interference' : msg.includes('запутанность') || msg.includes('нелокальность') ? 'entanglement' : msg.includes('сингулярность') ? 'vortex' : ''}">${msg}</div>`
        ).join('');
    }
};

// Создание сетки для оптимизации
function createGrid() {
    window.grid = [];
    const gridSize = 80;
    const gridWidth = Math.ceil(400 / gridSize);
    const gridHeight = Math.ceil(400 / gridSize);
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        window.grid[i] = [];
    }
    window.particles.forEach((p, i) => {
        const gridX = Math.floor(p.x / gridSize);
        const gridY = Math.floor(p.y / gridSize);
        const gridIndex = gridY * gridWidth + gridX;
        if (gridIndex >= 0 && gridIndex < window.grid.length) {
            window.grid[gridIndex].push(i);
        }
    });
}

// Получение соседей из сетки
function getNeighbors(p, i, gridSize = 80) {
    const gridWidth = Math.ceil(400 / gridSize);
    const gridX = Math.floor(p.x / gridSize);
    const gridY = Math.floor(p.y / gridSize);
    let neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const nx = gridX + dx;
            const ny = gridY + dy;
            const gridIndex = ny * gridWidth + nx;
            if (gridIndex >= 0 && gridIndex < window.grid.length) {
                neighbors = neighbors.concat(window.grid[gridIndex]);
            }
        }
    }
    return neighbors;
}

// Создание вихревых центров
function createVortexCenters() {
    window.vortexCenters = [];
    const numVortices = Math.floor(Math.random() * 6) + 5; // 5–10 центров
    for (let i = 0; i < numVortices; i++) {
        window.vortexCenters.push({
            x: Math.random() * 400,
            y: Math.random() * 400,
            strength: 0.02 + Math.random() * 0.03
        });
    }
}

// Инициализация частиц
window.initializeParticles = function(img) {
    console.log('initializeParticles called, img defined: ' + !!img + ', dimensions: ' + (img ? img.width + 'x' + img.height : 'undefined'));
    window.terminalMessages.push(getRandomMessage('initialize'));
    window.updateTerminalLog();
    if (typeof window.playInitialization === 'function') {
        window.playInitialization();
    }
    if (!img || !img.pixels) {
        console.error('Error: window.img is not defined or pixels not loaded');
        window.terminalMessages.push(getRandomMessage('initializeError'));
        window.updateTerminalLog();
        return;
    }
    window.particles = [];
    window.quantumStates = [];
    window.decompositionTimer = 0;
    window.phaseTimer = 0;
    window.globalPhase = 'chaos';
    window.mouseWave = { x: 0, y: 0, radius: 0, trail: [] };
    window.globalMessageCooldown = 0;
    window.grid = [];
    window.vortexCenters = [];

    try {
        img.loadPixels();
        if (!img.pixels || img.pixels.length === 0) {
            console.error('Error: img.pixels is empty or not loaded');
            window.terminalMessages.push(getRandomMessage('initializeError'));
            window.updateTerminalLog();
            return;
        }

        const pixelSize = 7;
        const blockSize = 20;
        const numParticles = Math.floor((img.width * img.height) / (pixelSize * pixelSize));
        let validParticles = 0;

        const faceFeatures = [
            { x: img.width * 0.35, y: img.height * 0.3, weight: 0.25 },
            { x: img.width * 0.65, y: img.height * 0.3, weight: 0.25 },
            { x: img.width * 0.5, y: img.height * 0.5, weight: 0.15 },
            { x: img.width * 0.5, y: img.height * 0.7, weight: 0.15 }
        ];

        for (let y = 0; y < img.height; y += pixelSize) {
            for (let x = 0; x < img.width; x += pixelSize) {
                const index = (Math.floor(x) + Math.floor(y) * img.width) * 4;
                const r = img.pixels[index] || 0;
                const g = img.pixels[index + 1] || 0;
                const b = img.pixels[index + 2] || 0;
                const a = img.pixels[index + 3] || 255;
                const brightness = (r + g + b) / 3;

                if (brightness > 60 || Math.random() < 0.2) {
                    const useFeature = Math.random() < 0.5;
                    let featureWeight = 0.1;
                    if (useFeature) {
                        const feature = faceFeatures.find(f => Math.abs(f.x - x) < img.width * 0.1 && Math.abs(f.y - y) < img.height * 0.1);
                        featureWeight = feature ? feature.weight : 0.1;
                    }

                    window.particles.push({
                        x: x * 400 / img.width,
                        y: y * 400 / img.height,
                        baseX: x * 400 / img.width,
                        baseY: y * 400 / img.height,
                        velocityX: 0,
                        velocityY: 0,
                        size: pixelSize * 1.2,
                        phase: Math.random() * 2 * Math.PI,
                        frequency: 0.007,
                        spin: Math.random() < 0.5 ? 0.5 : -0.5,
                        spinPhase: Math.random() * 2 * Math.PI,
                        entangledPartner: Math.random() < 0.1 ? Math.floor(Math.random() * numParticles) : null,
                        collapsed: false,
                        decompositionProgress: 0,
                        shape: 'pixel',
                        featureWeight: featureWeight,
                        blockId: Math.floor(x / blockSize) + Math.floor(y / blockSize) * Math.floor(img.width / blockSize),
                        clusterId: null,
                        vortexId: null,
                        pulsePhase: Math.random() * 2 * Math.PI,
                        uncertaintyRadius: 6
                    });

                    window.quantumStates.push({
                        r: r,
                        g: g,
                        b: b,
                        a: 0,
                        probability: 1.0,
                        decoherenceTimer: 0,
                        tunnelFlash: 0,
                        interferencePhase: Math.random() * 2 * Math.PI,
                        entanglementFlash: 0,
                        wavePacketAlpha: 0
                    });
                    validParticles++;
                }
            }
        }

        console.log('Initialized ' + window.particles.length + ' particles, valid: ' + validParticles);
        window.terminalMessages.push(getRandomMessage('initializeSuccess', { validParticles }));
        window.updateTerminalLog();
        if (typeof window.playInitialization === 'function') {
            window.playInitialization();
        }
        if (validParticles === 0) {
            console.error('No valid particles created.');
            window.terminalMessages.push(getRandomMessage('initializeError'));
            window.updateTerminalLog();
        }
    } catch (error) {
        console.error('Error in initializeParticles: ' + error);
        window.terminalMessages.push(getRandomMessage('initializeError'));
        window.updateTerminalLog();
    }
};

// Отрисовка волнового пакета
function drawWavePacket(sketch, x, y, uncertaintyRadius, r, g, b, wavePacketAlpha) {
    sketch.noStroke();
    let gradient = sketch.drawingContext.createRadialGradient(
        x, y, 0,
        x, y, uncertaintyRadius
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${wavePacketAlpha})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    sketch.drawingContext.fillStyle = gradient;
    sketch.ellipse(x, y, uncertaintyRadius * 2, uncertaintyRadius * 2);
}

// Отрисовка форм
function drawShape(sketch, x, y, size, shape, rotation, spin, spinPhase, r, g, b, a, featureWeight, pulse) {
    sketch.push();
    sketch.translate(x, y);
    sketch.rotate(rotation + spin * Math.PI / 2 + spinPhase);
    sketch.fill(r, g, b, a * 0.6);
    sketch.noStroke();
    if (shape === 'pixel') {
        sketch.ellipse(0, 0, size * pulse, size * pulse);
    } else if (shape === 'ellipse') {
        sketch.ellipse(0, 0, size * 1.2 * (1 + featureWeight + Math.abs(spin)) * pulse, size * 0.6 * pulse);
    } else if (shape === 'soft-ribbon') {
        let stretch = 1 + featureWeight + Math.abs(spin) * 0.4 + 0.2 * Math.sin(spinPhase);
        sketch.beginShape();
        sketch.vertex(-size * 1.0 * stretch * pulse, size * 0.15 * pulse);
        sketch.bezierVertex(
            -size * 0.4 * stretch * pulse, size * 0.3 * pulse,
            size * 0.4 * stretch * pulse, size * 0.3 * pulse,
            size * 1.0 * stretch * pulse, size * 0.15 * pulse
        );
        sketch.bezierVertex(
            size * 0.4 * stretch * pulse, -size * 0.3 * pulse,
            -size * 0.4 * stretch * pulse, -size * 0.3 * pulse,
            -size * 1.0 * stretch * pulse, -size * 0.15 * pulse
        );
        sketch.endShape(sketch.CLOSE);
    } else if (shape === 'bio-cluster') {
        for (let i = 0; i < 5; i++) {
            let dx = (Math.sin(i * Math.PI / 2.5 + spin + pulse + spinPhase) * size * 0.3);
            let dy = (Math.cos(i * Math.PI / 2.5 + spin + pulse + spinPhase) * size * 0.3);
            sketch.ellipse(dx, dy, size * 0.2 * (1 + Math.abs(spin)) * pulse, size * 0.2 * pulse);
        }
    }
    sketch.pop();
}

// Отрисовка мыши
function drawMouseWave(sketch) {
    if (window.currentStep !== 4 && window.currentStep !== 5 || window.mouseWave.radius <= 0) return;
    sketch.noFill();
    let gradient = sketch.drawingContext.createRadialGradient(
        window.mouseWave.x, window.mouseWave.y, 0,
        window.mouseWave.x, window.mouseWave.y, window.mouseWave.radius
    );
    gradient.addColorStop(0, 'rgba(209, 209, 230, 0.15)');
    gradient.addColorStop(1, 'rgba(209, 209, 230, 0)');
    sketch.drawingContext.strokeStyle = gradient;
    sketch.strokeWeight(0.8);
    sketch.ellipse(window.mouseWave.x, window.mouseWave.y, window.mouseWave.radius * 2);

    window.mouseWave.trail.forEach((point, i) => {
        let alpha = 40 * (1 - i / window.mouseWave.trail.length);
        sketch.stroke(209, 209, 230, alpha);
        sketch.ellipse(point.x, point.y, window.mouseWave.radius * 0.4);
    });
}

// Обновление частиц
window.updateParticles = function(sketch) {
    if (!window.quantumSketch || !window.particles || window.particles.length === 0) {
        console.error('Cannot update particles: quantumSketch: ' + !!window.quantumSketch + ', particlesLength: ' + (window.particles ? window.particles.length : 0));
        if (window.globalMessageCooldown <= 0) {
            window.terminalMessages.push(getRandomMessage('error', { index: 0 }));
            window.updateTerminalLog();
            window.globalMessageCooldown = 200;
        }
        return;
    }
    if (window.currentStep !== 4 && window.currentStep !== 5) {
        console.log('updateParticles skipped: not on step 4 or 5, currentStep: ' + window.currentStep);
        return;
    }
    let messageAddedThisFrame = false;
    if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
        window.terminalMessages.push(getRandomMessage('update', { phase: window.globalPhase }));
        window.updateTerminalLog();
        window.globalMessageCooldown = 200;
        messageAddedThisFrame = true;
    }
    window.globalMessageCooldown--;
    window.frame = window.frame || 0;
    window.frame++;
    window.phaseTimer += 0.015;

    // Фазовый переход
    if (window.currentStep === 5) {
        if (window.phaseTimer < 30) {
            if (window.globalPhase !== 'chaos') {
                window.globalPhase = 'chaos';
                window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'хаос' }));
                window.updateTerminalLog();
            }
        } else if (window.phaseTimer < 60) {
            if (window.globalPhase !== 'clustering') {
                window.globalPhase = 'clustering';
                window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'кластеризация' }));
                window.updateTerminalLog();
            }
        } else if (window.phaseTimer < 90) {
            if (window.globalPhase !== 'synchronization') {
                window.globalPhase = 'synchronization';
                window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'синхронизация' }));
                window.updateTerminalLog();
            }
        } else if (window.phaseTimer < 120) {
            if (window.globalPhase !== 'wavefront') {
                window.globalPhase = 'wavefront';
                window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'волновой фронт' }));
                window.updateTerminalLog();
            }
        } else if (window.phaseTimer < 150) {
            if (window.globalPhase !== 'spiral-migration') {
                window.globalPhase = 'spiral-migration';
                createVortexCenters();
                window.particles.forEach(p => {
                    let closestVortex = null;
                    let minDist = Infinity;
                    window.vortexCenters.forEach((v, i) => {
                        const dx = p.x - v.x;
                        const dy = p.y - v.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < minDist) {
                            minDist = dist;
                            closestVortex = i;
                        }
                    });
                    p.vortexId = closestVortex;
                });
                window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'спиральная миграция' }));
                window.updateTerminalLog();
            }
        } else {
            window.phaseTimer = 0;
            window.globalPhase = 'chaos';
            window.terminalMessages.push(getRandomMessage('phaseTransition', { phase: 'хаос' }));
            window.updateTerminalLog();
        }
    }

    // Декомпозиция (шаг 4)
    if (window.currentStep === 4 && window.decompositionTimer < 12) {
        window.decompositionTimer += 0.015;
        if (window.img) {
            var imgAlpha = Math.max(0, 255 * (1 - window.decompositionTimer / 4));
            sketch.tint(255, imgAlpha);
            sketch.image(window.img, 0, 0, 400, 400);
            if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                window.terminalMessages.push(getRandomMessage('decomposition', { imgAlpha: imgAlpha.toFixed(0) }));
                window.updateTerminalLog();
                window.globalMessageCooldown = 200;
                messageAddedThisFrame = true;
            }
        }
    } else if (window.currentStep === 5) {
        if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
            window.terminalMessages.push(getRandomMessage('stabilized'));
            window.updateTerminalLog();
            if (typeof window.playStabilization === 'function') {
                window.playStabilization();
            }
            window.globalMessageCooldown = 200;
            messageAddedThisFrame = true;
        }
    }

    // Обновление мыши
    if (window.currentStep === 4 || window.currentStep === 5) {
        window.mouseWave.radius = Math.max(0, window.mouseWave.radius - 0.4);
        window.mouseWave.trail.push({ x: window.mouseWave.x, y: window.mouseWave.y });
        if (window.mouseWave.trail.length > 8) window.mouseWave.trail.shift();
    }

    // Формирование кластеров
    const blocks = {};
    const clusters = {};
    if (window.globalPhase === 'clustering') {
        window.particles.forEach(p => {
            if (!p.clusterId) {
                p.clusterId = Math.floor(Math.random() * 50);
            }
            if (!clusters[p.clusterId]) {
                clusters[p.clusterId] = [];
            }
            clusters[p.clusterId].push(p);
        });
    } else {
        window.particles.forEach(p => {
            p.clusterId = null;
            if (!blocks[p.blockId]) {
                blocks[p.blockId] = [];
            }
            blocks[p.blockId].push(p);
        });
    }

    // Создание сетки для интерференции
    createGrid();

    let potentialMessages = [];
    let globalEntanglement = Math.random() < 0.002 && window.currentStep === 5;
    let wavefrontEvent = Math.random() < 0.001 && window.currentStep === 5 && window.globalPhase === 'wavefront';
    let vortexSingularity = Math.random() < 0.001 && window.currentStep === 5 && window.globalPhase === 'spiral-migration';

    // Вихревая сингулярность
    if (vortexSingularity) {
        const singularityCenter = { x: Math.random() * 400, y: Math.random() * 400 };
        sketch.fill(63, 22, 127, 50);
        sketch.noStroke();
        sketch.ellipse(singularityCenter.x, singularityCenter.y, 40, 40);
        if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
            potentialMessages.push({ type: 'vortexSingularity', params: {} });
            if (typeof window.playNote === 'function' && window.noteFrequencies) {
                const freq = window.noteFrequencies['G4'] || 392;
                window.playNote(freq, 'sine', 0.3, 0.25);
            }
        }
    }

    window.particles.forEach(function(p, i) {
        try {
            var state = window.quantumStates[i];
            var pulse = 1 + 0.2 * Math.sin(p.pulsePhase + p.spin * Math.PI);
            p.pulsePhase += 0.05 * (1 + Math.abs(p.spin) * 0.3);
            p.spinPhase += 0.02;

            // Неопределённость и диффузия
            var speed = Math.sqrt(p.velocityX * p.velocityX + p.velocityY * p.velocityY);
            p.uncertaintyRadius = 6 + speed * 10 + 5 * Math.sin(p.pulsePhase);
            state.wavePacketAlpha = p.collapsed ? 0 : 50 * state.probability * pulse;

            // Декогеренция
            if (!p.collapsed && window.decompositionTimer >= 8) {
                state.decoherenceTimer += 0.01;
                if (state.decoherenceTimer > 100 && Math.random() < 0.003) {
                    p.collapsed = true;
                    state.probability = 0.3;
                    state.wavePacketAlpha = 0;
                    p.size = 2;
                    if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                        potentialMessages.push({ type: 'decoherence', params: { index: i } });
                    }
                } else if (state.decoherenceTimer > 100 && Math.random() < 0.003) {
                    p.collapsed = false;
                    state.probability = 1.0;
                    state.decoherenceTimer = 0;
                    if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                        potentialMessages.push({ type: 'decoherenceRestore', params: { index: i } });
                    }
                }
            }

            // Этапы и фазы
            if (window.currentStep === 4) {
                p.decompositionProgress = Math.min(1, p.decompositionProgress + 0.015);
                state.a = Math.floor(p.decompositionProgress * 180);

                if (window.decompositionTimer < 4) {
                    p.shape = 'pixel';
                    p.velocityX = 0;
                    p.velocityY = 0;
                } else if (window.decompositionTimer < 8) {
                    p.shape = Math.random() < 0.5 ? 'ellipse' : 'soft-ribbon';
                    const block = blocks[p.blockId];
                    if (block && block.length > 0) {
                        const centerX = block.reduce((sum, p) => sum + p.baseX, 0) / block.length;
                        const centerY = block.reduce((sum, p) => sum + p.baseY, 0) / block.length;
                        p.velocityX += (centerX - p.x) * 0.02;
                        p.velocityY += (centerY - p.y) * 0.02;
                        p.size = 7 * pulse;
                        if (Math.random() < 0.007 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                            potentialMessages.push({ type: 'blockFormation', params: { shape: p.shape } });
                        }
                    }
                } else {
                    p.shape = ['ellipse', 'soft-ribbon', 'bio-cluster'][Math.floor(Math.random() * 3)];
                    p.size = (1.8 + 1.2 * sketch.noise(p.x * window.noiseScale, p.y * window.noiseScale) * state.probability) * (1 + p.featureWeight * 0.3 + Math.abs(p.spin)) * pulse;
                    if (Math.random() < 0.01 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                        p.shape = ['ellipse', 'soft-ribbon', 'bio-cluster'][Math.floor(Math.random() * 3)];
                        potentialMessages.push({ type: 'superposition', params: { shape: p.shape, spin: p.spin.toFixed(1) } });
                        if (typeof window.playNote === 'function' && window.noteFrequencies) {
                            const notes = ['C4', 'E4', 'G4'];
                            const note = notes[Math.floor(Math.random() * notes.length)];
                            const freq = window.noteFrequencies[note] || 261.63;
                            window.playNote(freq, 'sine', 0.2, 0.15);
                        }
                    }
                }
            } else if (window.currentStep === 5) {
                p.decompositionProgress = 1;
                state.a = 180;
                p.shape = ['ellipse', 'soft-ribbon', 'bio-cluster'][Math.floor(Math.random() * 3)];
                p.size = (1.8 + 1.2 * sketch.noise(p.x * window.noiseScale, p.y * window.noiseScale) * state.probability) * (1 + p.featureWeight * 0.3 + Math.abs(p.spin)) * pulse;

                // Фазовое поведение
                if (window.globalPhase === 'clustering' && p.clusterId !== null) {
                    const cluster = clusters[p.clusterId];
                    if (cluster && cluster.length > 0) {
                        const centerX = cluster.reduce((sum, p) => sum + p.x, 0) / cluster.length;
                        const centerY = cluster.reduce((sum, p) => sum + p.y, 0) / cluster.length;
                        p.velocityX += (centerX - p.x) * 0.03;
                        p.velocityY += (centerY - p.y) * 0.03;
                    }
                } else if (window.globalPhase === 'synchronization') {
                    p.spin = Math.sin(window.phaseTimer * 0.1 + p.x * 0.01 + p.y * 0.01) > 0 ? 0.5 : -0.5;
                } else if (window.globalPhase === 'wavefront' || wavefrontEvent) {
                    p.velocityX += Math.sin(p.x * 0.02 + window.phaseTimer) * 0.5 * pulse;
                    p.velocityY += Math.cos(p.y * 0.02 + window.phaseTimer) * 0.5 * pulse;
                } else if (window.globalPhase === 'spiral-migration' && p.vortexId !== null) {
                    const vortex = window.vortexCenters[p.vortexId];
                    if (vortex) {
                        const dx = p.x - vortex.x;
                        const dy = p.y - vortex.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx);
                        const spiralSpeed = vortex.strength * (1 + Math.abs(p.spin)) * pulse;
                        p.velocityX += (-Math.sin(angle) * spiralSpeed - dx * 0.01) * 0.05;
                        p.velocityY += (Math.cos(angle) * spiralSpeed - dy * 0.01) * 0.05;
                        if (Math.random() < 0.0005 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                            sketch.push();
                            sketch.noFill();
                            sketch.stroke(63, 22, 127, 30);
                            sketch.strokeWeight(0.3);
                            sketch.beginShape();
                            for (let t = 0; t < 1; t += 0.1) {
                                let r = dist * (1 - t);
                                let a = angle + t * Math.PI * 2;
                                sketch.vertex(vortex.x + r * Math.cos(a), vortex.y + r * Math.sin(a));
                            }
                            sketch.endShape();
                            sketch.pop();
                            potentialMessages.push({ type: 'spiralMigration', params: {} });
                        }
                    }
                    if (vortexSingularity) {
                        const dx = p.x - singularityCenter.x;
                        const dy = p.y - singularityCenter.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > 0) {
                            p.velocityX += -dx / dist * 0.1 * pulse;
                            p.velocityY += -dy / dist * 0.1 * pulse;
                        }
                    }
                }
            }

            // Биологичное движение
            if (window.decompositionTimer >= 8 || window.currentStep === 5) {
                const n = sketch.noise(p.x * window.noiseScale, p.y * window.noiseScale, window.frame * 0.008);
                const bioRhythm = 1 + 0.3 * Math.sin(p.pulsePhase + p.spin);
                p.velocityX += (Math.cos(p.phase + p.spin * Math.PI / 2) * n * window.chaosFactor * 0.4 * bioRhythm - p.velocityX) * 0.04;
                p.velocityY += (Math.sin(p.phase + p.spin * Math.PI / 2) * n * window.chaosFactor * 0.4 * bioRhythm - p.velocityY) * 0.04;
                p.phase += p.frequency * (1 + Math.abs(p.spin) * 0.4);
                if (Math.random() < 0.02) {
                    p.velocityX += (Math.random() - 0.5) * 1.5 * bioRhythm;
                    p.velocityY += (Math.random() - 0.5) * 1.5 * bioRhythm;
                }
                if (Math.random() < 0.005 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    potentialMessages.push({ type: 'precession', params: { index: i } });
                }
                if (Math.random() < 0.005 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    potentialMessages.push({ type: 'diffusion', params: { index: i } });
                }
            } else {
                p.velocityX *= 0.96;
                p.velocityY *= 0.96;
            }

            // Влияние мыши
            if (window.currentStep === 4 || window.currentStep === 5) {
                var dx = p.x - window.mouseWave.x;
                var dy = p.y - window.mouseWave.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < window.mouseInfluenceRadius && distance > 0 && !p.collapsed && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    var influence = (window.mouseInfluenceRadius - distance) / window.mouseInfluenceRadius;
                    p.velocityX += dx * influence * 0.03 * pulse;
                    p.velocityY += dy * influence * 0.03 * pulse;
                    if (Math.random() < 0.007) {
                        p.spin = -p.spin;
                        potentialMessages.push({ type: 'mouseInfluence', params: { spin: p.spin.toFixed(1) } });
                    }
                }
            }

            // Притяжение к ключевым точкам
            if (p.featureWeight > 0.1 && window.decompositionTimer < 8 && window.currentStep === 4 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                p.velocityX += (p.baseX - p.x) * 0.03 * p.featureWeight;
                p.velocityY += (p.baseY - p.y) * 0.03 * p.featureWeight;
                potentialMessages.push({ type: 'featureAttraction', params: {} });
            }

            // Глобальная запутанность
            if (globalEntanglement && !p.collapsed) {
                p.entangledPartner = Math.floor(Math.random() * window.particles.length);
                state.entanglementFlash = 15;
                if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    potentialMessages.push({ type: 'globalEntanglement', params: {} });
                }
            }

            // Волновой фронт
            if (wavefrontEvent) {
                state.wavePacketAlpha = 80 * pulse;
                p.uncertaintyRadius = 15;
                if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    potentialMessages.push({ type: 'wavefront', params: {} });
                    if (typeof window.playNote === 'function' && window.noteFrequencies) {
                        const freq = window.noteFrequencies['C4'] || 261.63;
                        window.playNote(freq, 'sine', 0.3, 0.2);
                    }
                }
            }

            // Цвета
            state.r = Math.min(255, Math.max(0, state.r));
            state.g = Math.min(255, Math.max(0, state.g));
            state.b = Math.min(255, Math.max(0, state.b));

            // Интерференция
            if (window.decompositionTimer >= 8 || window.currentStep === 5) {
                const neighbors = getNeighbors(p, i);
                neighbors.forEach(j => {
                    if (i !== j) {
                        const other = window.particles[j];
                        var dx = p.x - other.x;
                        var dy = p.y - other.y;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < 80 && p.featureWeight > 0.1 && other.featureWeight > 0.1 && !p.collapsed && !other.collapsed) {
                            var wave = Math.sin(distance * 0.04 + state.interferencePhase + window.frame * 0.015 + p.spin + other.spin);
                            p.velocityX += wave * 0.03 * (window.globalPhase === 'synchronization' ? 4 : 2.5) * pulse;
                            p.velocityY += wave * 0.03 * (window.globalPhase === 'synchronization' ? 4 : 2.5) * pulse;
                            if (Math.random() < 0.0005 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                                sketch.push();
                                sketch.noFill();
                                sketch.stroke(63, 22, 127, 40);
                                sketch.strokeWeight(0.4 + 0.2 * Math.abs(wave));
                                sketch.beginShape();
                                for (let t = 0; t < 1; t += 0.1) {
                                    let ix = p.x + t * (other.x - p.x);
                                    let iy = p.y + t * (other.y - p.y);
                                    let offset = Math.sin(t * Math.PI * 2 + state.interferencePhase) * 2 * wave;
                                    sketch.vertex(ix + offset * (dy / distance), iy - offset * (dx / distance));
                                }
                                sketch.endShape();
                                sketch.pop();
                                potentialMessages.push({ type: 'interference', params: { spin: p.spin.toFixed(1) } });
                                if (typeof window.playInterference === 'function') {
                                    window.playInterference(380, 385, 0.7, 0.1);
                                }
                            }
                        }
                    }
                });
            }

            // Туннелирование
            if (Math.random() < 0.001 && !p.collapsed && (window.decompositionTimer >= 8 || window.currentStep === 5)) {
                var oldX = p.x, oldY = p.y;
                p.x = Math.random() * 400;
                p.y = Math.random() * 400;
                p.velocityX = (Math.random() - 0.5) * 1.2 * pulse;
                p.velocityY = (Math.random() - 0.5) * 1.2 * pulse;
                state.tunnelFlash = 12;
                sketch.stroke(204, 51, 51, 40);
                sketch.strokeWeight(0.4);
                sketch.line(oldX, oldY, p.x, p.y);
                sketch.noFill();
                sketch.stroke(204, 51, 51, 25);
                sketch.ellipse(p.x, p.y, state.tunnelFlash * 0.25, state.tunnelFlash * 0.25);
                if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    potentialMessages.push({ type: 'tunneling', params: { spin: p.spin.toFixed(1) } });
                    if (typeof window.playTunneling === 'function') {
                        const freq = (p.x * p.y) % 380 + 190;
                        window.playTunneling(freq, 0.12, 0.15);
                    }
                }
            } else {
                sketch.noStroke();
            }

            // Запутанность
            if (p.entangledPartner !== null && window.particles[p.entangledPartner] && (window.decompositionTimer >= 8 || window.currentStep === 5)) {
                var partner = window.particles[p.entangledPartner];
                var partnerState = window.quantumStates[p.entangledPartner];
                state.r = partnerState.r = (state.r + partnerState.r) / 2;
                state.g = partnerState.g = (state.g + partnerState.g) / 2;
                state.b = partnerState.b = (state.b + partnerState.b) / 2;
                if (!p.collapsed && !partner.collapsed && Math.random() < 0.005 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                    state.entanglementFlash = 15;
                    partnerState.entanglementFlash = 15;
                    potentialMessages.push({ type: 'entanglement', params: { spin: p.spin.toFixed(1) } });
                    if (typeof window.playNote === 'function' && window.noteFrequencies) {
                        const freq = window.noteFrequencies['E4'] || 329.63;
                        window.playNote(freq, 'sine', 0.2, 0.15);
                    }
                }
                if (state.entanglementFlash > 0) {
                    sketch.stroke(63, 22, 127, state.entanglementFlash * 4);
                    sketch.strokeWeight(0.4);
                    sketch.line(p.x, p.y, partner.x, partner.y);
                    state.entanglementFlash--;
                    partnerState.entanglementFlash--;
                }
            }

            // Отталкивание от краёв
            const margin = 20;
            if (p.x < margin) p.velocityX += (margin - p.x) * 0.04 * pulse;
            if (p.x > 400 - margin) p.velocityX -= (p.x - (400 - margin)) * 0.04 * pulse;
            if (p.y < margin) p.velocityY += (margin - p.y) * 0.04 * pulse;
            if (p.y > 400 - margin) p.velocityY -= (p.y - (400 - margin)) * 0.04 * pulse;

            // Обновление позиции
            p.x = Math.max(0, Math.min(400, p.x + p.velocityX));
            p.y = Math.max(0, Math.min(400, p.y + p.velocityY));

            // Отрисовка волнового пакета
            if (!p.collapsed && state.wavePacketAlpha > 0) {
                drawWavePacket(sketch, p.x, p.y, p.uncertaintyRadius, state.r, state.g, state.b, state.wavePacketAlpha);
            }

            // Отрисовка частицы
            if (p.size > 0) {
                sketch.fill(state.r, state.g, state.b, state.a / 7);
                sketch.ellipse(p.x, p.y, p.size + 3 * pulse, p.size + 3 * pulse);
                drawShape(sketch, p.x, p.y, p.size, p.shape, p.phase, p.spin, p.spinPhase, state.r, state.g, state.b, state.a, p.featureWeight, pulse);
                if (state.tunnelFlash > 0) {
                    sketch.fill(204, 51, 51, state.tunnelFlash * 2.5);
                    sketch.ellipse(p.x, p.y, p.size + 2 * pulse, p.size + 2 * pulse);
                    state.tunnelFlash--;
                }
            }
        } catch (error) {
            console.error('Error updating particle ' + i + ': ' + error);
            if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                potentialMessages.push({ type: 'error', params: { index: i } });
            }
        }
    });

    if (potentialMessages.length > 0 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
        let selectedMessage = potentialMessages.find(msg => msg.type === 'tunneling') ||
                             potentialMessages.find(msg => msg.type === 'interference') ||
                             potentialMessages.find(msg => msg.type === 'entanglement') ||
                             potentialMessages.find(msg => msg.type === 'globalEntanglement') ||
                             potentialMessages.find(msg => msg.type === 'wavefront') ||
                             potentialMessages.find(msg => msg.type === 'vortexSingularity') ||
                             potentialMessages.find(msg => msg.type === 'spiralMigration') ||
                             potentialMessages.find(msg => msg.type === 'decoherence') ||
                             potentialMessages.find(msg => msg.type === 'decoherenceRestore') ||
                             potentialMessages[Math.floor(Math.random() * potentialMessages.length)];
        window.terminalMessages.push(getRandomMessage(selectedMessage.type, selectedMessage.params));
        window.updateTerminalLog();
        window.globalMessageCooldown = 200;
        messageAddedThisFrame = true;
    }

    drawMouseWave(sketch);
};

// Реакция на движение мыши
window.observeParticles = function(sketch, mouseX, mouseY) {
    if (!window.particles || !window.quantumStates || window.particles.length === 0) {
        console.error('observeParticles: No particles or quantum states available');
        if (window.globalMessageCooldown <= 0) {
            window.terminalMessages.push(getRandomMessage('error', { index: 0 }));
            window.updateTerminalLog();
            window.globalMessageCooldown = 200;
        }
        return;
    }
    if (window.currentStep !== 4 && window.currentStep !== 5) {
        console.log('observeParticles skipped: not on step 4 or 5, currentStep: ' + window.currentStep);
        return;
    }
    console.log('observeParticles called, mouseX: ' + mouseX + ', mouseY: ' + mouseY);
    if (window.globalMessageCooldown <= 0) {
        window.terminalMessages.push(getRandomMessage('mouseInfluence'));
        window.updateTerminalLog();
        window.globalMessageCooldown = 200;
    }
    window.mouseWave.x = mouseX;
    window.mouseWave.y = mouseY;
    window.mouseWave.radius = window.mouseInfluenceRadius;
};

// Реакция на клик
window.clickParticles = function(sketch, mouseX, mouseY) {
    if (!window.particles || !window.quantumStates || window.particles.length === 0) {
        console.error('clickParticles: No particles or quantum states available');
        if (window.globalMessageCooldown <= 0) {
            window.terminalMessages.push(getRandomMessage('error', { index: 0 }));
            window.updateTerminalLog();
            window.globalMessageCooldown = 200;
        }
        return;
    }
    if (window.currentStep !== 4 && window.currentStep !== 5) {
        console.log('clickParticles skipped: not on step 4 or 5, currentStep: ' + window.currentStep);
        return;
    }
    console.log('clickParticles called, mouseX: ' + mouseX + ', mouseY: ' + mouseY);
    let messageAddedThisFrame = false;
    window.particles.forEach(function(p, i) {
        try {
            var dx = mouseX - p.x;
            var dy = mouseY - p.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var state = window.quantumStates[i];
            var pulse = 1 + 0.2 * Math.sin(p.pulsePhase + p.spin * Math.PI);

            if (distance < window.mouseInfluenceRadius && distance > 0 && window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                if (!p.collapsed) {
                    p.collapsed = true;
                    state.a = 180;
                    p.size = 2.5 * pulse;
                    p.uncertaintyRadius = 2;
                    state.wavePacketAlpha = 0;
                    p.shape = ['ellipse', 'soft-ribbon', 'bio-cluster'][Math.floor(Math.random() * 3)];
                    p.spin = Math.random() < 0.5 ? 0.5 : -0.5;
                    sketch.fill(204, 51, 51, 80);
                    sketch.ellipse(p.x, p.y, 8 * pulse, 8 * pulse);
                    sketch.noFill();
                    sketch.stroke(204, 51, 51, 40);
                    sketch.strokeWeight(0.4);
                    sketch.ellipse(p.x, p.y, 20, 20);
                    console.log('Particle ' + i + ' collapsed, shape: ' + p.shape + ', spin: ' + p.spin.toFixed(1) + ', alpha: ' + state.a);
                    window.terminalMessages.push(getRandomMessage('collapse', { shape: p.shape, spin: p.spin.toFixed(1) }));
                    window.updateTerminalLog();
                    if (typeof window.playArpeggio === 'function') {
                        window.playArpeggio(p.shape);
                    }
                    window.globalMessageCooldown = 200;
                    messageAddedThisFrame = true;
                } else {
                    p.collapsed = false;
                    p.phase = Math.random() * 2 * Math.PI;
                    p.pulsePhase = Math.random() * 2 * Math.PI;
                    p.spin = Math.random() < 0.5 ? 0.5 : -0.5;
                    state.a = 180;
                    state.wavePacketAlpha = 50;
                    p.uncertaintyRadius = 5;
                    p.size = 1.8 + (sketch.noise(p.x * window.noiseScale, p.y * window.noiseScale) * 1.2) * pulse;
                    console.log('Particle ' + i + ' restored to superposition, shape: ' + p.shape + ', spin: ' + p.spin.toFixed(1) + ', alpha: ' + state.a);
                    window.terminalMessages.push(getRandomMessage('superpositionRestore', { spin: p.spin.toFixed(1) }));
                    window.updateTerminalLog();
                    if (typeof window.playNote === 'function' && window.noteFrequencies) {
                        const freq = window.noteFrequencies['E4'] || 329.63;
                        window.playNote(freq, 'sine', 0.2, 0.15);
                    }
                    window.globalMessageCooldown = 200;
                    messageAddedThisFrame = true;
                }
            }
        } catch (error) {
            console.error('Error clicking particle ' + i + ': ' + error);
            if (window.globalMessageCooldown <= 0 && !messageAddedThisFrame) {
                window.terminalMessages.push(getRandomMessage('error', { index: i }));
                window.updateTerminalLog();
                window.globalMessageCooldown = 200;
                messageAddedThisFrame = true;
            }
        }
    });
};
