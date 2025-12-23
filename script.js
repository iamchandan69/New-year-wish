document.addEventListener("DOMContentLoaded", () => {

  const privateLinks = {
    "aivena26": { name: "Aivena", gender: "girl" },
    "rahul22": { name: "Rahul", gender: "boy" }
  };

  let userName = "";
  let gender = "girl";

  const nameBox = document.getElementById("nameBox");
  const nameInput = document.getElementById("nameInput");
  const nextBtn = document.getElementById("nextBtn");
  const main = document.getElementById("main");
  const bearImg = document.getElementById("bear");

  /* ---------- PRIVATE LINK ---------- */

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token && privateLinks[token]) {
    userName = privateLinks[token].name;
    gender = privateLinks[token].gender;
    startExperience();
    return;
  }

  /* ---------- NEXT BUTTON ---------- */

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 CRITICAL FIX

    userName = nameInput.value.trim();

    if (userName.length < 2) {
      alert("Please enter your full name 🤍");
      return;
    }

    gender = "girl";
    startExperience();
  });

  /* ---------- ENTER KEY ---------- */

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextBtn.click();
    }
  });

  /* ---------- START EXPERIENCE ---------- */

  function startExperience() {
    nameBox.style.display = "none";
    main.classList.remove("hidden");

    bearImg.src = gender === "girl"
      ? "bear-girl.png"
      : "bear-boy.png";
  }

  /* ---------- ENVELOPE ---------- */

  document.getElementById("envelope").addEventListener("click", () => {
    main.style.display = "none";
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

});

function detectGenderFromName(name) {
  const boyNames = [
    "chandan","rahul","rohit","amit","arjun","karan","vikram",
    "sachin","ankit","suresh","mahesh","ramesh","naresh",
    "manish","pradeep","deepak","sunil","ashok","vijay",
    "ajay","raj","rohan","mohit","naveen","sanjay"
  ];

  const girlNames = [
    "aivena","aisha","priya","neha","kajal","pooja","anjali",
    "simran","nisha","ranjita","ranjeeta","riya","chuleshwari","kiran","meena","suman","rekha",
    "sonam","payal","isha","kriti","sneha","kavya","ananya"
  ];

  const cleanName = name.toLowerCase().trim();

  if (boyNames.includes(cleanName)) return "boy";
  if (girlNames.includes(cleanName)) return "girl";

  // fallback logic
  if (
    cleanName.endsWith("a") ||
    cleanName.endsWith("i") ||
    cleanName.endsWith("e")
  ) {
    return "girl";
  }

  return "boy"; // default safe
}

