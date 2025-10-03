document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".card");
	const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	cards.forEach((card) => {
		const content = card.querySelector(".card-content");
		const rotationFactor =
			parseFloat(card.getAttribute("data-rotation-factor")) || 2;

		if (!isTouchDevice) {
			card.addEventListener("mousemove", (e) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				const rotateY = (rotationFactor * (x - centerX)) / centerX;
				const rotateX = (-rotationFactor * (y - centerY)) / centerY;

				content.style.transform = `
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;

				card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
				card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
			});

			card.addEventListener("mouseleave", () => {
				content.style.transform = "rotateX(0) rotateY(0)";

				content.style.transition = "transform 0.5s ease";
				setTimeout(() => {
					content.style.transition = "";
				}, 500);
			});
		}

		const randomDelay = Math.random() * 2;
		card.style.animation = `cardFloat 4s infinite alternate ease-in-out ${randomDelay}s`;
	});

	const style = document.createElement("style");
	style.textContent = `
    @keyframes cardFloat {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-5px);
      }
    }
    
    @media (min-width: 768px) {
      @keyframes cardFloat {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-8px);
        }
      }
    }
    
    @media (min-width: 1024px) {
      @keyframes cardFloat {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-10px);
        }
      }
    }
  `;
	document.head.appendChild(style);

	const buttons = document.querySelectorAll(".card-button");
	buttons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.stopPropagation();

			const ripple = document.createElement("span");
			ripple.classList.add("ripple");
			button.appendChild(ripple);

			const rect = button.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height) * 2;

			ripple.style.width = ripple.style.height = `${size}px`;
			ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
			ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

			ripple.classList.add("active");

			setTimeout(() => {
				ripple.remove();
			}, 500);
		});
	});

	const rippleStyle = document.createElement("style");
	rippleStyle.textContent = `
    .card-button {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.5s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
	document.head.appendChild(rippleStyle);
});