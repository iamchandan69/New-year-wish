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

  // 🔹 AUTO GENDER FROM NAME
  function detectGender(name) {
    const girlEndings = ["a", "i", "e"];
    const n = name.toLowerCase();

    if (girlEndings.some(end => n.endsWith(end))) return "girl";
    return "boy";
  }

  // 🔹 NEXT BUTTON (100% SAFE)
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

  // 🔹 BEAR CLICK → LETTER
  bear.onclick = () => {
    main.style.display = "none";
    letter.classList.remove("hidden");

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
