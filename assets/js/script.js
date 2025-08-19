class TypeWriterEffect {
  constructor(element, speed = 100, wordBreakIndex = null) {
    this.element = element;
    this.speed = speed;
    this.wordBreakIndex = wordBreakIndex;
  }

  splitText() {
    const text = this.element.textContent;
    this.element.textContent = "";
    text
      .trim()
      .split("")
      .forEach((char, index) => {
        // If a word break index is provided, insert a line break at that index
        if (
          this.wordBreakIndex !== null &&
          index === this.wordBreakIndex &&
          window.innerWidth > 768
        ) {
          const br = document.createElement("br");
          this.element.appendChild(br);
          return;
        }
        if (char === " ") {
          this.element.appendChild(document.createTextNode(" "));
          return;
        }
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = (index * this.speed) / 1000 + "s";
        this.element.appendChild(span);
      });
  }
}

const typeWriterEffect = new TypeWriterEffect(
  document.querySelector(".typewriter"),
  80,
  9
);
typeWriterEffect.splitText();

const container = document.querySelector(".scrollable");

const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;

  Array.from(container.children).forEach((child, i) => {
    child.style.animationDelay = `${i * 0.17}s`;
    child.classList.add("animate__animated", "animate__fadeIn");
  });
  observer.unobserve(container);
}, {
  threshold: 0.6,
  rootMargin: "0px 0px -10% 0px"
});

observer.observe(container);

