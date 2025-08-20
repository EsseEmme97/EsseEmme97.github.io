AOS.init({once:true,duration:1000});

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



