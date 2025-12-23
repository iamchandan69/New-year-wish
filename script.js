/* ===============================
   PRIVATE ONE-PERSON LINKS
================================ */

const privateLinks = {
  "aivena26": { name: "Aivena", gender: "girl" },
  "rahul22": { name: "Rahul", gender: "boy" }
};

/* ===============================
   VARIABLES
================================ */

let userName = "";
let gender = "girl";

/* ===============================
   CHECK PRIVATE LINK
================================ */

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token && privateLinks[token]) {
  userName = privateLinks[token].name;
  gender = privateLinks[token].gender;
  startExperience();
}

/* ===============================
   NAME INPUT (1-second)
================================ */

const nameInput = document.getElementById("nameInput");

if (nameInput) {
  const nextBtn = document.getElementById("nextBtn");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    userName = nameInput.value.trim();

    if (userName.length < 2) {
      alert("Please enter your full name 🤍");
      return;
    }

    gender = "girl"; // default for manual entry
    startExperience();
  });
}

/* ===============================
   START EXPERIENCE
================================ */

function startExperience() {
  document.getElementById("nameBox").style.display = "none";
  document.getElementById("main").classList.remove("hidden");

  const bearImg = document.getElementById("bear");

  // 🔥 DIFFERENT BEAR PNG LOGIC
  if (gender === "girl") {
    bearImg.src = "bear-girl.png";
  } else {
    bearImg.src = "bear-boy.png";
  }
}

/* ===============================
   ENVELOPE CLICK → LETTER
================================ */

document.getElementById("envelope").addEventListener("click", () => {
  document.getElementById("main").style.display = "none";
  document.getElementById("letter").classList.remove("hidden");

  const girlText =
`Happy New Year, ${userName} 🤍
2026 feels special…
because you’re part of it.`;

  const boyText =
`Happy New Year, ${userName} 🤍
Some people quietly make the year better,
just by being in it.`;

  document.getElementById("letterText").innerText =
    gender === "girl" ? girlText : boyText;

  if (gender === "girl") {
    document.getElementById("finalLine").classList.remove("hidden");
  }
});
