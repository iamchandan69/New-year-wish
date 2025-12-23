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
  const specialGirls = ["ranjeeta", "chuleshwari","ranjita"];
  const forceBoyNames = ["chandramani", "shivmani", "harimani"];
  
  
  // 🔹 AUTO GENDER FROM NAME
  function detectGender(name) {
  const n = name.toLowerCase().trim();

  if (specialGirls.includes(n)) return "specialGirl";
  if (forceBoyNames.includes(n)) return "boy";

  const girlEndings = ["a", "i", "e"];
  if (girlEndings.some(end => n.endsWith(end))) return "girl";

  return "boy";
}

  // 🎉 SIDE PARTY POPPER (WIDE + HEAVY BLAST)
  function launchSideBlastConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff5c8d", "#ffc83d", "#7afcff", "#b983ff", "#ffffff"];

    const COUNT_PER_SIDE = 60;   // 🔥 Quantity control
    const SPREAD = 120;          // 🔥 Blast width (degrees)
    const POWER = 9;             // 🔥 Blast strength

    for (let i = 0; i < COUNT_PER_SIDE; i++) {
      blast("left");
      blast("right");
    }

    function blast(side) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      const startY = window.innerHeight * 0.35 + Math.random() * 250;
      const startX = side === "left" ? -30 : window.innerWidth + 30;

      let x = startX;
      let y = startY;

      // 🔥 WIDE FAN ANGLE
      const baseAngle = side === "left" ? 0 : 180;
      const angle =
        baseAngle +
        (Math.random() * SPREAD - SPREAD / 2);

      let vx = Math.cos(angle * Math.PI / 180) * (POWER + Math.random() * 3);
      let vy = Math.sin(angle * Math.PI / 180) * (POWER + Math.random() * 3);

      c.style.left = startX + "px";
      c.style.top = startY + "px";

      container.appendChild(c);

      const anim = setInterval(() => {
        x += vx;
        y += vy;
        vy += 0.35; // gravity

        c.style.transform =
          `translate(${x - startX}px, ${y - startY}px)
           rotate(${x * 0.5}deg)`;

        if (y > window.innerHeight + 80) {
          clearInterval(anim);
          c.remove();
        }
      }, 16);
    }
  }

  // 🔹 NEXT BUTTON
  nextBtn.onclick = () => {
    userName = nameInput.value.trim();

    if (userName.length < 2) {
      alert("Please enter your name");
      return;
    }

    gender = detectGender(userName);

    nameBox.style.display = "none";
    main.classList.remove("hidden");

    bear.src = (gender === "girl" || gender === "specialGirl")
  ? "bear-girl.png"
  : "bear-boy.png";

  };

  // 🔹 BEAR CLICK → FINAL WISH
  bear.onclick = () => {
    main.style.display = "none";
    letter.classList.remove("hidden");

    launchSideBlastConfetti(); // 💥 PARTY POPPER BLAST

    if (gender === "specialGirl") {
  letterText.innerText =
`Happy New Year, ${userName} 🤍
Some people don’t just enter a year…
they quietly make it unforgettable.

I hope 2026 reminds you
how special you truly are. ✨`;

  finalLine.classList.remove("hidden");

} else if (gender === "girl") {
  letterText.innerText =
`Happy New Year, ${userName} 🤍
💫 New year, fresh start, happy heart.
Wishing you the best always.`;

  finalLine.classList.add("hidden");

} else {
  letterText.innerText =
`Happy New Year mere bhai, ${userName}. 🎊

Naya saal aa gaya, par ek cheez jo kabhi nahi badlegi…
Wo hai humari dosti or Bhaichara on top💪😌
Chahe saal badle, calendar badle, phones badle,
Par humari bakchodi, late replies,
Random plans fir cancel karna 😂
Aur “bhai kal milte hain” ka loop same hi rahega 😂.`;
    }
  };

});
