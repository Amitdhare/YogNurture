document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".mark-done");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    let completed = 0;
    const total = tasks.length;

    tasks.forEach(button => {
        button.addEventListener("click", () => {
            if (!button.disabled) {
                completed++;
                button.disabled = true;
                updateProgress();

                if (completed === total) {
                    launchConfetti();
                }
            }
        });
    });

    function updateProgress() {
        let percent = Math.round((completed / total) * 100);
        progressBar.style.width = percent + "%";
        progressText.textContent = `Progress: ${percent}%`;
    }

    function launchConfetti() {
        const duration = 2 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            const colors = ["#ff0", "#0f0", "#0ff", "#f0f", "#f00", "#00f"];
            const particleCount = 5;

            for (let i = 0; i < particleCount; i++) {
                const confetti = document.createElement("div");
                confetti.style.position = "fixed";
                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.top = "-10px";
                confetti.style.width = "10px";
                confetti.style.height = "10px";
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.opacity = Math.random();
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.transition = "top 2s ease-out, left 2s ease-out";

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.style.top = "100vh";
                    confetti.style.left = Math.random() * 100 + "vw";
                }, 10);

                setTimeout(() => {
                    confetti.remove();
                }, 2000);
            }

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }
});









