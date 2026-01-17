/**
 * THE ULTIMATE BIRTHDAY EXPERIENCE FOR AVNIYA
 * FIXED FOR MOBILE & GITHUB DEPLOYMENT
 */

// --- 1. DATA AND STATE CONFIGURATION ---
let balloonsBurst = 0;
const targetBalloons = 20;
const secretURL = "sprcial.HTML"; // Ensure this matches your final filename exactly

const questions = [
    { q: "First, are you ready for a surprise?", a: ["Not yet", "YES!", "Maybe"] },
    { q: "Who deserves the most happiness today?", a: ["Me!", "Avniya", "The Internet"] },
    { q: "Last one: Will you have the best birthday ever?", a: ["Absolutely!", "100% YES", "Of Course!"] }
];

const qualities = ["Kind Hearted", "Creative", "Hilarious", "Best Friend", "Pure Soul", "Hardworking", "Magical", "Radiant", "Smart", "Beautiful", "Compassionate", "Unique"];

const photoData = [
    { src: "p1.jpg", caption: "You look so happy here! ✨" },
    { src: "P2.jpg", caption: "A truly magical moment. 💖" },
    { src: "P3.jpg", caption: "To more adventures together! 🚀" },
    { src: "p4.jpg", caption: "Simply beautiful. 🌸" },
    { src: "p5.jpg", caption: "A beautiful soul, inside and out💖" },
    { src: "p6.jpg", caption: "Energy that matches the smile. Truly one of a kind.😍" },
    { src: "p7.jpg", caption: "Radiant as always.💙" }
];

const wishMessages = [
    "May your day be filled with endless laughter...",
    "To the girl who lights up every room she enters...",
    "Wishing you a year full of magic and success...",
    "You deserve all the cake and all the love today...",
    "Keep shining like the star you are, Avniya!",
    "Happy Birthday to my favorite person! ✨"
];

let currentQ = 0;
let canCut = false;
let isDrawing = false;
let wishIndex = 0;

// --- 2. CORE NAVIGATION ---
function nextSection(id) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.add('hidden');
        sec.classList.remove('active');
    });
    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }
    if (id === 'game-section') loadQuiz();
}

// --- 3. THE INTERACTIVE QUIZ ENGINE ---
function loadQuiz() {
    const textElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const hintElement = document.getElementById('game-hint'); 
    
    textElement.innerText = questions[currentQ].q;
    optionsContainer.innerHTML = "";
    if (hintElement) hintElement.innerText = "";

    questions[currentQ].a.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer;
        btn.className = "quiz-btn";

        if (currentQ === 2) {
            if (hintElement) {
                hintElement.innerText = "Wait, why are the buttons floating? Try to catch them! 😂";
            }
            btn.addEventListener('mouseover', moveButton);
            btn.addEventListener('touchstart', moveButton);
        }

        btn.onclick = function(e) {
            createBloomEffect(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            currentQ++;
            if (currentQ < questions.length) loadQuiz();
            else nextSection('final-section');
        };
        optionsContainer.appendChild(btn);
    });
}

function moveButton(e) {
    const btn = e.target;
    const glassCard = document.querySelector('.glass-card');
    const rect = glassCard.getBoundingClientRect();
    const x = Math.random() * (rect.width - 100) + rect.left;
    const y = Math.random() * (rect.height - 100) + rect.top;
    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
    btn.style.zIndex = "1000";
}

// --- 4. VISUAL EFFECTS ---
function createBloomEffect(x, y) {
    const messages = ["You're Amazing!", "Best Friend!", "Keep Going!", "Magic!", "Avniya ✨"];
    const bloom = document.createElement('div');
    bloom.className = 'bloom-text';
    bloom.innerText = messages[Math.floor(Math.random() * messages.length)];
    bloom.style.cssText = `position:fixed; left:${x}px; top:${y}px; pointer-events:none; z-index:99999;`;
    document.body.appendChild(bloom);
    setTimeout(() => bloom.remove(), 2000);
}

// --- 5. THE FINALE ---
function blowCandle() {
    const flame = document.getElementById('flame');
    if (flame) flame.style.display = 'none';
    
    const instructionText = document.getElementById('instruction');
    if (instructionText) instructionText.innerText = "WISH GRANTED! Now SWIPE across the cake to cut it!";
    
    document.getElementById('knife')?.classList.remove('hidden');
    canCut = true;
    
    const music = document.getElementById('birthday-music');
    if (music) music.play().catch(() => console.log("Interaction needed for audio"));
    
    triggerMegaConfetti(80);
}

// --- 6. UNIVERSAL INPUT SYSTEM (FIXED) ---
function handleInputStart() { isDrawing = true; }
function handleInputEnd() { isDrawing = false; }

function handleInputMove(e) {
    let x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    let y = e.pageY || (e.touches ? e.touches[0].pageY : 0);
    let cX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    let cY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    createWishTrail(x, y);

    const knife = document.getElementById('knife');
    if (knife && !knife.classList.contains('hidden')) {
        knife.style.left = x + 'px';
        knife.style.top = y + 'px';
    }

    if (isDrawing && canCut) {
        const cake = document.getElementById('cake-main');
        if (cake) {
            const rect = cake.getBoundingClientRect();
            if (cX > rect.left && cX < rect.right && cY > rect.top && cY < rect.bottom) {
                performCakeSlice();
            }
        }
    }
}

// Event Listeners
window.addEventListener('mousedown', handleInputStart);
window.addEventListener('touchstart', (e) => { handleInputStart(); }, {passive: true});
window.addEventListener('mouseup', handleInputEnd);
window.addEventListener('touchend', handleInputEnd);
window.addEventListener('mousemove', handleInputMove);
window.addEventListener('touchmove', (e) => { handleInputMove(e); }, {passive: true});

function createWishTrail(x, y) {
    const star = document.createElement('div');
    star.innerHTML = "✨";
    star.style.cssText = `position:absolute; left:${x}px; top:${y}px; pointer-events:none; z-index:9999;`;
    document.body.appendChild(star);
    star.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: `translate(${(Math.random()-0.5)*50}px, 50px) scale(0)`, opacity: 0 }
    ], { duration: 1000 }).onfinish = () => star.remove();
}

function performCakeSlice() {
    if (!canCut) return;
    canCut = false; 
    document.getElementById('cake-main')?.classList.add('sliced');
    document.getElementById('knife')?.classList.add('hidden');
    
    const hud = document.getElementById('quest-hud') || document.getElementById('quest-container');
    if (hud) {
        hud.style.display = 'block';
        hud.classList.remove('hidden');
    }

    document.body.classList.add('heavy-screen-shake');
    setTimeout(() => document.body.classList.remove('heavy-screen-shake'), 800);
    
    triggerMegaConfetti(150); 
    startCelebrationCycles();
    startTypewriterWishLoop();
}

// --- 7. CELEBRATION ---
function startCelebrationCycles() {
    setInterval(createFloatingBalloon, 1200);
    setInterval(createFloatingPhoto, 5000);
}

function createFloatingBalloon() {
    const container = document.createElement('div');
    container.className = 'balloon-container';
    const body = document.createElement('div');
    body.className = 'balloon-real';
    body.innerText = qualities[Math.floor(Math.random() * qualities.length)];
    
    const popAction = (e) => {
        e.stopPropagation();
        const rect = body.getBoundingClientRect();
        createPopEffect(rect.left + 50, rect.top + 50);
        container.remove();
    };

    body.addEventListener('mousedown', popAction);
    body.addEventListener('touchstart', popAction);

    container.appendChild(body);
    container.style.left = Math.random() * 80 + 'vw';
    body.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`;
    document.body.appendChild(container);
    setTimeout(() => { if (container.parentNode) container.remove(); }, 12000);
}

function createPopEffect(x, y) {
    balloonsBurst++;
    const counter = document.getElementById('counter-num');
    const bar = document.getElementById('hud-bar');
    if (counter) counter.innerText = balloonsBurst;
    if (bar) bar.style.width = (balloonsBurst / targetBalloons * 100) + "%";

    if (balloonsBurst >= targetBalloons) {
        setTimeout(() => { window.location.href = secretURL; }, 800);
    }

    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'pop-particle';
        p.style.cssText = `left:${x}px; top:${y}px; position:fixed; background:#ffca3a; width:6px; height:6px; border-radius:50%;`;
        document.body.appendChild(p);
        const angle = Math.random() * Math.PI * 2;
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*60}px, ${Math.sin(angle)*60}px) scale(0)`, opacity: 0 }
        ], { duration: 600 }).onfinish = () => p.remove();
    }
}

function createFloatingPhoto() {
    const frame = document.createElement('div');
    frame.className = 'floating-photo';
    const selected = photoData[Math.floor(Math.random() * photoData.length)];
    frame.innerHTML = `<img src="${selected.src}"><div class="photo-caption">${selected.caption}</div>`;
    frame.style.left = Math.random() * 60 + 'vw';

    frame.onclick = function() {
        if (!this.classList.contains('popped')) {
            document.querySelectorAll('.popped').forEach(p => p.classList.remove('popped'));
            this.classList.add('popped');
        } else { this.remove(); }
    };
    document.body.appendChild(frame);
    setTimeout(() => { if (frame.parentNode && !frame.classList.contains('popped')) frame.remove(); }, 15000);
}

// --- 8. WISH LOOP & CONFETTI ---
function startTypewriterWishLoop() {
    const output = document.getElementById('looping-wish');
    if (!output) return;
    let charIdx = 0;
    function type() {
        let msg = wishMessages[wishIndex];
        if (charIdx < msg.length) {
            output.innerText += msg.charAt(charIdx++);
            setTimeout(type, 100);
        } else setTimeout(erase, 2000);
    }
    function erase() {
        if (charIdx > 0) {
            output.innerText = wishMessages[wishIndex].substring(0, --charIdx);
            setTimeout(erase, 50);
        } else {
            wishIndex = (wishIndex + 1) % wishMessages.length;
            setTimeout(type, 500);
        }
    }
    type();
}

function triggerMegaConfetti(count) {
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-10px; width:10px; height:10px; background:hsl(${Math.random()*360}, 70%, 60%); z-index:999;`;
        document.body.appendChild(c);
        c.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(105vh) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], { duration: 3000 + Math.random()*2000 }).onfinish = () => c.remove();
    }
}





