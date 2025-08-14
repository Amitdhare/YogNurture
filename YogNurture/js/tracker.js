https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js

let progress = 0;
const totalTasks = 5; // total yoga + meditation steps
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {
    progress += 1;
    let percent = Math.min((progress / totalTasks) * 100, 100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = Math.floor(percent1) + "%";

    if (percent >= 100) {
        progressText.textContent = "🎉 Congratulations! You completed all activities!";
        confettiEffect();
    }
}

function confettiEffect() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}








