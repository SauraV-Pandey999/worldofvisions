/**
 * THE ULTIMATE BIRTHDAY EXPERIENCE FOR AVNIYA
 * FULL SOURCE CODE - NO SHORTCUTS
 */

// --- 1. DATA AND STATE CONFIGURATION ---
let balloonsBurst = 0;
const targetBalloons = 20;
const secretURL = "https://your-special-link-here.com"; // CHANGE THIS

const questions = [
    { 
        q: "First, are you ready for a surprise?", 
        a: ["Not yet", "YES!", "Maybe"] 
    },
    { 
        q: "Who deserves the most happiness today?", 
        a: ["Me!", "Avniya", "The Internet"] 
    },
    { 
        q: "Last one: Will you have the best birthday ever?", 
        a: ["Absolutely!", "100% YES", "Of Course!"] 
    }
];

const qualities = [
    "Kind Hearted", "Creative", "Hilarious", "Best Friend", 
    "Pure Soul", "Hardworking", "Magical", "Radiant",
    "Smart", "Beautiful", "Compassionate", "Unique"
];

const photoData = [
    { src: "pritam.jpg", caption: "You look so happy here! ✨" },
    { src: "rajat.jpg", caption: "A truly magical moment. 💖" },
    { src: "saurav.jpg", caption: "To more adventures together! 🚀" },
    { src: "photo4.jpg", caption: "Simply beautiful. 🌸" }
];

const wishMessages = [
    "May your day be filled with endless laughter...",
    "To the girl who lights up every room she enters...",
    "Wishing you a year full of magic and success...",
    "You deserve all the cake and all the love today...",
    "Keep shining like the star you are, Avniya!",
    "Happy Birthday to my favorite person! ✨"
];

// Global State
let currentQ = 0;
let canCut = false; // Set to false until candle is blown
let isDrawing = false;
let wishIndex = 0;

// --- 2. CORE NAVIGATION ---
function nextSection(id) {
    const allSections = document.querySelectorAll('section');
    allSections.forEach(sec => {
        sec.classList.add('hidden');
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }

    if (id === 'game-section') {
        loadQuiz();
    }
}

// --- 3. THE INTERACTIVE QUIZ ENGINE ---
function loadQuiz() {
    const textElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const hintElement = document.getElementById('game-hint'); 
    
    textElement.innerText = questions[currentQ].q;
    optionsContainer.innerHTML = "";

    if (hintElement) hintElement.innerText = "";

    const currentAnswers = questions[currentQ].a;

    currentAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer;
        btn.className = "quiz-btn";

        if (currentQ === 2) {
            if (hintElement) {
                hintElement.innerText = "Wait, why are the buttons floating? Try to catch them! 😂";
                hintElement.style.color = "#ff4d8b";
            }

            btn.addEventListener('mouseover', function() {
                const glassCard = document.querySelector('.glass-card');
                const cardRect = glassCard.getBoundingClientRect();
                
                const btnWidth = 120;
                const btnHeight = 45;
                const pad = 40;

                const finalX = Math.random() * (cardRect.width - btnWidth - pad*2) + cardRect.left + pad;
                const finalY = Math.random() * (cardRect.height - btnHeight - pad*2) + cardRect.top + (cardRect.height / 2);

                btn.style.position = "fixed";
                btn.style.left = finalX + "px";
                btn.style.top = finalY + "px";
                btn.style.zIndex = "1000";
                btn.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            });
        }

        btn.onclick = function(event) {
            createBloomEffect(event.clientX, event.clientY);
            currentQ++;
            
            if (currentQ < questions.length) {
                loadQuiz();
            } else {
                nextSection('final-section');
            }
        };
        optionsContainer.appendChild(btn);
    });
}

// --- 4. VISUAL BLOOM EFFECTS ---
function createBloomEffect(x, y) {
    const messages = ["You're Amazing!", "Best Friend!", "Keep Going!", "Magic!", "Avniya ✨"];
    const bloom = document.createElement('div');
    bloom.className = 'bloom-text';
    bloom.innerText = messages[Math.floor(Math.random() * messages.length)];
    bloom.style.position = 'fixed';
    bloom.style.left = x + 'px';
    bloom.style.top = y + 'px';
    bloom.style.pointerEvents = 'none';
    document.body.appendChild(bloom);
    setTimeout(() => bloom.remove(), 2000);
}

// --- 5. THE FINALE: CANDLE AND MUSIC ---
function blowCandle() {
    const flame = document.getElementById('flame');
    if (flame) flame.style.display = 'none';
    
    const candle = document.getElementById('candle-div');
    if (candle) candle.style.opacity = '0';
    
    const instructionText = document.getElementById('instruction');
    if (instructionText) {
        instructionText.innerText = "WISH GRANTED! Now SWIPE across the cake to cut it!";
        instructionText.style.color = "#ffafcc";
    }
    
    const knife = document.getElementById('knife');
    if (knife) knife.classList.remove('hidden');
    
    canCut = true;
    
    const musicPlayer = document.getElementById('birthday-music');
    if (musicPlayer) {
        musicPlayer.play().catch(() => console.log("Audio interaction needed"));
    }
    
    triggerInitialConfetti();
}

// --- 6. SWIPE TO CUT CAKE SYSTEM & WISH TRAIL ---
window.addEventListener('mousedown', () => { isDrawing = true; });
window.addEventListener('mouseup', () => { isDrawing = false; });

window.addEventListener('mousemove', function(e) {
    createWishTrail(e.pageX, e.pageY);

    const knifeIcon = document.getElementById('knife');
    if (knifeIcon && !knifeIcon.classList.contains('hidden')) {
        knifeIcon.style.left = e.pageX + 'px';
        knifeIcon.style.top = e.pageY + 'px';
    }

    if (isDrawing && canCut) {
        const cakeObj = document.getElementById('cake-main');
        if (cakeObj) {
            const rect = cakeObj.getBoundingClientRect();
            if (e.pageX > rect.left && e.pageX < rect.right && e.pageY > rect.top && e.pageY < rect.bottom) {
                performCakeSlice();
            }
        }
    }
});

function createWishTrail(x, y) {
    const star = document.createElement('div');
    star.innerHTML = "✨";
    star.style.position = 'absolute';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = "9999";
    document.body.appendChild(star);

    star.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(0)`, opacity: 0 }
    ], { duration: 1000 }).onfinish = () => star.remove();
}

function performCakeSlice() {
    if (!canCut) return;
    canCut = false; 
    
    document.getElementById('cake-main')?.classList.add('sliced');
    document.getElementById('knife')?.classList.add('hidden');
    
    // Show Quest HUD
    const hud = document.getElementById('quest-hud') || document.getElementById('quest-container');
    if (hud) hud.style.display = 'block';

    document.body.classList.add('heavy-screen-shake');
    setTimeout(() => document.body.classList.remove('heavy-screen-shake'), 800);
    
    triggerMegaConfetti(250); 
    triggerFireworkShow(12);   
    startCelebrationCycles();
    startTypewriterWishLoop();
}

// --- 7. CONTINUOUS CELEBRATION ---
function startCelebrationCycles() {
    setInterval(createFloatingBalloon, 1200);
    setInterval(createFloatingPhoto, 6000);
}

function createFloatingBalloon() {
    const container = document.createElement('div');
    container.className = 'balloon-container';
    
    const body = document.createElement('div');
    body.className = 'balloon-real';
    body.innerText = qualities[Math.floor(Math.random() * qualities.length)];
    
    body.onclick = function(e) {
        e.stopPropagation();
        createPopEffect(e.pageX, e.pageY);
        container.remove();
    };

    const string = document.createElement('div');
    string.className = 'balloon-string';

    container.appendChild(body);
    container.appendChild(string);
    container.style.left = Math.random() * 85 + 'vw';
    body.style.backgroundColor = `hsla(${Math.random() * 360}, 80%, 65%, 0.8)`;
    
    document.body.appendChild(container);
    setTimeout(() => { if (container.parentNode) container.remove(); }, 12000);
}

function createFloatingPhoto() {
    const frame = document.createElement('div');
    frame.className = 'floating-photo';
    const selected = photoData[Math.floor(Math.random() * photoData.length)];
    
    const img = document.createElement('img');
    img.src = selected.src;
    
    const cap = document.createElement('div');
    cap.className = 'photo-caption';
    cap.innerText = selected.caption;
    
    frame.appendChild(img);
    frame.appendChild(cap);
    frame.style.left = Math.random() * 70 + 'vw';
    frame.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    frame.onclick = function() {
        if (!this.classList.contains('popped')) {
            document.querySelectorAll('.popped').forEach(p => p.remove());
            this.classList.add('popped');
            this.style.transform = "translate(-50%, -50%) rotate(0deg)";
        } else {
            this.remove(); 
        }
    };
    
    document.body.appendChild(frame);
    setTimeout(() => { if (frame.parentNode && !frame.classList.contains('popped')) frame.remove(); }, 15000);
}

function createPopEffect(x, y) {
    balloonsBurst++;
    const counter = document.getElementById('counter-num');
    if (counter) {
        counter.innerText = balloonsBurst;
        counter.style.transform = "scale(1.4)";
        setTimeout(() => counter.style.transform = "scale(1)", 150);
    }

    if (balloonsBurst === targetBalloons) {
        setTimeout(() => {
            alert("💖 AMAZING! You've burst 20 balloons! Redirecting...");
            window.location.href = secretURL;
        }, 500);
    }

    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'pop-particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.backgroundColor = '#ffffff';
        p.style.position = 'fixed';
        p.style.pointerEvents = 'none';
        p.style.zIndex = "10002";
        document.body.appendChild(p);
        
        const angle = Math.random() * Math.PI * 2;
        const vel = Math.random() * 100 + 40;
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*vel}px, ${Math.sin(angle)*vel}px) scale(0)`, opacity: 0 }
        ], { duration: 800 }).onfinish = () => p.remove();
    }
}

// --- 8. THE TYPEWRITER WISH LOOP ---
function startTypewriterWishLoop() {
    const output = document.getElementById('looping-wish');
    if (!output) return;
    let charIdx = 0;

    function type() {
        let msg = wishMessages[wishIndex];
        if (charIdx < msg.length) {
            output.innerText += msg.charAt(charIdx);
            charIdx++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2500);
        }
    }

    function erase() {
        let msg = wishMessages[wishIndex];
        if (charIdx > 0) {
            output.innerText = msg.substring(0, charIdx - 1);
            charIdx--;
            setTimeout(erase, 50);
        } else {
            wishIndex = (wishIndex + 1) % wishMessages.length;
            setTimeout(type, 600);
        }
    }
    type();
}

// --- 9. MEGA CELEBRATION EFFECTS ---
function triggerInitialConfetti() {
    triggerMegaConfetti(80);
}

function triggerFireworkShow(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.7);
            createFireworkBurst(x, y);
        }, i * 300);
    }
}

function createFireworkBurst(x, y) {
    const colors = ['#ffafcc', '#ffc300', '#a2d2ff', '#ffffff', '#cdb4db'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'pop-particle';
        p.style.left = x + 'px'; p.style.top = y + 'px';
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 15px ${color}`;
        document.body.appendChild(p);
        const angle = Math.random() * Math.PI * 2;
        const vel = 60 + Math.random() * 120;
        p.animate([
            { transform: 'translate(0,0) scale(1.5)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*vel}px, ${Math.sin(angle)*vel}px) scale(0)`, opacity: 0 }
        ], { duration: 1500 }).onfinish = () => p.remove();
    }
}

function triggerMegaConfetti(count) {
    const colors = ['#ffafcc', '#ffc300', '#a2d2ff', '#cdb4db'];
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'pop-particle';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = '10px'; confetti.style.height = '10px';
        document.body.appendChild(confetti);
        confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(110vh) rotate(${Math.random()*1000}deg) translateX(${(Math.random()-0.5)*200}px)`, opacity: 0 }
        ], { duration: 3000 + Math.random()*3000 }).onfinish = () => confetti.remove();
    }
}