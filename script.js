document.addEventListener("DOMContentLoaded", () => {

  const nameBox = document.getElementById("nameBox");
  const nameInput = document.getElementById("nameInput");
  const nextBtn = document.getElementById("nextBtn");

  const main = document.getElementById("main");
  const bear = document.getElementById("bear");

  const letterScreen = document.getElementById("letter"); // Screen container
  const envelope = document.getElementById("envelope");   // Envelope Element
  const letterText = document.getElementById("letterText");
  const finalLine = document.getElementById("finalLine");

  let userName = "";
  let gender = "boy";
  
  // Names Lists
  const specialGirls = ["ranjeeta", "chuleshwari", "ranjita"];
  const forceBoyNames = ["chandramani", "shivmani", "hirendra", "arya", "rudra", "tilendra", "shiva", "ravi", "adi", "rishi", "hari", "jai", "harimani"];
  const forceGirlNames = ["suman", "kirti", "jyoti", "kiran", "kajal", "poonam", "ponam", "komal", "geet", "payal", "kanak", "shagun", "nupur", "gunjan", "heer", "kusum", "neelam", "sonal", "sejal", "dimple", "hetal", "chanchal"];

  // 🔹 AUTO GENDER LOGIC
  function detectGender(name) {
    const n = name.toLowerCase().trim();
    if (specialGirls.includes(n)) return "specialGirl";
    if (forceBoyNames.includes(n)) return "boy";
    if (forceGirlNames.includes(n)) return "girl";
    const girlEndings = ["a", "i", "e"];
    if (girlEndings.some(end => n.endsWith(end))) return "girl";
    return "boy";
  }

  // 🎉 CONFETTI BLAST
  function launchSideBlastConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff00cc", "#00d4ff", "#ffcc00", "#ffffff", "#adff2f"];

    const COUNT_PER_SIDE = 60;
    const SPREAD = 120;
    const POWER = 9;

    for (let i = 0; i < COUNT_PER_SIDE; i++) {
      blast("left");
      blast("right");
    }

    function blast(side) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      const startY = window.innerHeight * 0.35 + Math.random() * 250;
      const startX = side === "left" ? -30 : window.innerWidth + 30;

      let x = startX;
      let y = startY;

      const baseAngle = side === "left" ? 0 : 180;
      const angle = baseAngle + (Math.random() * SPREAD - SPREAD / 2);

      let vx = Math.cos(angle * Math.PI / 180) * (POWER + Math.random() * 3);
      let vy = Math.sin(angle * Math.PI / 180) * (POWER + Math.random() * 3);

      c.style.left = startX + "px";
      c.style.top = startY + "px";
      container.appendChild(c);

      const anim = setInterval(() => {
        x += vx;
        y += vy;
        vy += 0.35;
        c.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${x * 0.5}deg)`;
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
    nameBox.classList.add("hidden");
    main.classList.remove("hidden");

    // Set Bear Image
    bear.src = (gender === "girl" || gender === "specialGirl") ? "bear-girl.png" : "bear-boy.png";
  };

  // 🔹 BEAR CLICK → SHOW ENVELOPE → OPEN AUTOMATICALLY
  bear.onclick = () => {
    main.classList.add("hidden");
    letterScreen.classList.remove("hidden"); // Show Envelope Screen

    // Set Message Content
    if (gender === "specialGirl") {
      letterText.innerHTML = `Happy New Year, <b>${userName}</b> 🤍<br><br>Some people don’t just enter a year… they quietly make it unforgettable.<br>I hope 2026 reminds you how special you truly are. ✨`;
      finalLine.classList.remove("hidden");
    } else if (gender === "girl") {
      letterText.innerHTML = `Happy New Year, <b>${userName}</b> 🤍<br><br>💫 New year, fresh start, happy heart.<br>Wishing you the best always.`;
      finalLine.classList.add("hidden");
    } else {
      letterText.innerHTML = `Happy New Year mere bhai, <b>${userName}</b>. 🎊<br><br>Naya saal aa gaya, par ek cheez jo kabhi nahi badlegi…<br>Wo hai humari dosti or Bhaichara on top💪😌 
      Chahe saal badle, calendar badle, phones badle,
Par humari bakchodi, late replies,
Random plans fir cancel karna 😂
Aur “bhai kal milte hain” ka loop same hi rahega 😂`;
      finalLine.classList.add("hidden");
    }

    // 🕒 DELAY: Wait 0.5s, then Open Envelope & Blast Confetti
    setTimeout(() => {
      envelope.classList.add("open"); // Starts CSS Animation
      launchSideBlastConfetti();      // Boom! 🎉
    }, 500);
  };

});
