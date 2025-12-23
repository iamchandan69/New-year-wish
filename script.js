document.addEventListener("DOMContentLoaded", () => {

  const nameBox = document.getElementById("nameBox");
  const nameInput = document.getElementById("nameInput");
  const nextBtn = document.getElementById("nextBtn");

  const main = document.getElementById("main");
  const bear = document.getElementById("bear");

  const letter = document.getElementById("letter");
  const letterText = document.getElementById("letterText");
  const finalLine = document.getElementById("finalLine");

  let userName = "";
  let gender = "boy";

  // 🔹 AUTO GENDER FROM NAME (NO EXTRA INPUT)
  function detectGender(name) {
    const girlEndings = ["a", "i", "e"];
    const n = name.toLowerCase();

    if (girlEndings.some(end => n.endsWith(end))) return "girl";
    return "boy";
  }

  // 🎉 LEFT–RIGHT PARTY POPPER BLAST
  function launchSideBlastConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff5c8d", "#ffc83d", "#7afcff", "#b983ff", "#ffffff"];

    for (let i = 0; i < 100; i++) {
      blast("left");
      blast("right");
    }

    function blast(side) {
      const c = document.createElement("div");
      c.className = "confetti";

      c.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      const startY = window.innerHeight * 0.4 + Math.random() * 200;
      const startX = side === "left" ? -20 : window.innerWidth + 20;

      let x = startX;
      let y = startY;

      const angle =
        side === "left"
          ? Math.random() * 50 - 20
          : Math.random() * 50 + 160;

      let vx = Math.cos(angle * Math.PI / 180) * 7;
      let vy = Math.sin(angle * Math.PI / 180) * 7;

      c.style.left = startX + "px";
      c.style.top = startY + "px";

      container.appendChild(c);

      const anim = setInterval(() => {
        x += vx;
        y += vy;
        vy += 0.3;

        c.style.transform =
          `translate(${x - startX}px, ${y - startY}px) rotate(${x}deg)`;

        if (y > window.innerHeight + 60) {
          clearInterval(anim);
          c.remove();
        }
      }, 16);
    }
  }

  // 🔹 NEXT BUTTON CLICK
  nextBtn.onclick = () => {
    userName = nameInput.value.trim();

    if (userName.length < 2) {
      alert("Please enter your name");
      return;
    }

    gender = detectGender(userName);

    nameBox.style.display = "none";
    main.classList.remove("hidden");

    bear.src = gender === "girl"
      ? "bear-girl.png"
      : "bear-boy.png";
  };

  // 🔹 BEAR CLICK → FINAL WISH + BLAST
  bear.onclick = () => {
    main.style.display = "none";
    letter.classList.remove("hidden");

    launchSideBlastConfetti(); // 💥 PARTY POPPER BLAST

    if (gender === "girl") {
      letterText.innerText =
`Happy New Year, ${userName} 🤍
2026 feels special…
because you’re part of it.`;
      finalLine.classList.remove("hidden");
    } else {
      letterText.innerText =
`Happy New Year, ${userName} 🤍
Some people quietly make the year better,
just by being in it.`;
    }
  };

});
