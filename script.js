document.addEventListener("DOMContentLoaded", () => {

  // --- DOM ELEMENTS ---
  const nameBox = document.getElementById("nameBox");
  const nameInput = document.getElementById("nameInput");
  const nextBtn = document.getElementById("nextBtn");

  const main = document.getElementById("main");
  const bear = document.getElementById("bear");

  // Envelope Elements
  const letterScreen = document.getElementById("letter");
  const envelope = document.getElementById("envelope");
  const letterText = document.getElementById("letterText");
  const finalLine = document.getElementById("finalLine");

  // Carousel Elements
  const carouselScreen = document.getElementById("carousel-screen");
  const textContainer = document.querySelector(".carousel-text-container");
  const carouselImg = document.getElementById("carouselImg");
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  const pagination = document.getElementById("pagination");
  const cUser = document.getElementById("cUser");

  // Video Elements
  const videoScreen = document.getElementById("video-screen");
  const boyVideo = document.getElementById("boyVideo");

  // --- STATE ---
  let userName = "";
  let userCategory = "normalBoy"; // default
  let currentImageIndex = 0;
  let activeImages = [];
  let isCarouselActive = false;
  let slideStage = 0;

  // ============================================
  // 🔹 USER CONFIGURATION (EDIT HERE)
  // ============================================

  // 1. NAMES (Lower Case Only!)
  const bestFriendName = ["siddharth","sidharth"]; // 👈 Put your BEST FRIEND'S name here
  const specialBoys = ["hitesh", "rajat", "dev", "abhay","chandramani"]; // 👈 Put 4-5 SPECIAL BOYS here
  const specialGirls = ["ranjeeta", "chuleshwari", "ranjita"];
  
  // 2. IMAGE FILES (Make sure these exist in your folder)
  const bestFriendImages = ["bf1.jpg", "bf2.jpg", "bf3.jpg", "bf4.jpg", "bf5.jpg"];
  const specialBoyImages = ["sb1.jpg", "sb2.jpg", "sb3.jpg", "sb4.jpg", "sb5.jpg","sb6.jpg"];
  
  const ranjitaImages = ["r1.jpg", "r2.jpg", "r3.jpg", "r4.jpg"]; 
  const chuleshwariImages = ["c1.jpg", "c2.jpg", "c3.jpg"];

  // 3. VIDEO FILE
  const boyVideoFile = "boys_vibe.mp4"; // 👈 The video for Normal Boys

  // 4. GENERAL NAME LISTS
  const forceBoyNames = ["chandramani", "shivmani", "hirendra", "arya", "rudra", "tilendra", "shiva", "ravi", "adi", "rishi", "hari", "jai", "harimani"];
  const forceGirlNames = ["suman", "kirti", "jyoti", "kiran", "kajal", "poonam", "ponam", "komal", "geet", "payal", "kanak", "shagun", "nupur", "gunjan", "heer", "kusum", "neelam", "sonal", "sejal", "dimple", "hetal", "chanchal"];

  // ============================================

  // --- LOGIC: DETECT CATEGORY ---
  function detectCategory(name) {
    const n = name.toLowerCase().trim();

    // 1. Check VIPs
    if (bestFriendName.includes(n)) return "bestFriend";
    if (specialBoys.includes(n)) return "specialBoy";
    if (specialGirls.includes(n)) return "specialGirl";

    // 2. Check Manual Lists
    if (forceBoyNames.includes(n)) return "normalBoy";
    if (forceGirlNames.includes(n)) return "girl";

    // 3. Auto-Detect Gender
    const girlEndings = ["a", "i", "e"];
    if (girlEndings.some(end => n.endsWith(end))) return "girl";
    
    // Default fallback
    return "normalBoy";
  }

  // 🔹 NEXT BUTTON CLICK
  nextBtn.onclick = () => {
    userName = nameInput.value.trim();
    if (userName.length < 2) {
      alert("Please enter your name");
      return;
    }

    userCategory = detectCategory(userName);
    
    // Hide Login, Show Bear
    nameBox.classList.add("hidden");
    main.classList.remove("hidden");

    // Set Bear Image based on Category
    if (userCategory === "girl" || userCategory === "specialGirl") {
      bear.src = "bear-girl.png";
    } else {
      bear.src = "bear-boy.png";
    }
  };

  // 🔹 BEAR CLICK (Routing Logic)
  bear.onclick = () => {
    main.classList.add("hidden");

    if (userCategory === "bestFriend") {
      startCarousel("bestFriend");
    } 
    else if (userCategory === "specialBoy") {
      startCarousel("specialBoy");
    }
    else if (userCategory === "specialGirl") {
      startCarousel("specialGirl");
    } 
    else if (userCategory === "normalBoy") {
      startVideo();
    } 
    else {
      startEnvelope(); // Normal Girl
    }
  };

  // --- 1. VIDEO LOGIC (Normal Boys) ---
  function startVideo() {
    videoScreen.classList.remove("hidden");
    boyVideo.src = boyVideoFile;
    // Auto-play since user interacted with the bear
    boyVideo.play().catch(e => console.log("Autoplay prevented:", e));
  }

  // --- 2. ENVELOPE LOGIC (Normal Girls) ---
  function startEnvelope() {
    letterScreen.classList.remove("hidden");
    
    // Customize message if needed
    letterText.innerHTML = `Happy New Year, <b>${userName}</b> 🤍<br><br>💫 New year, fresh start, happy heart.<br>Wishing you the best always.`;
    finalLine.classList.add("hidden");

    setTimeout(() => {
      envelope.classList.add("open");
      launchSideBlastConfetti();
    }, 500);
  }

  // --- 3. CAROUSEL LOGIC (VIPs) ---
  function startCarousel(type) {
    carouselScreen.classList.remove("hidden");
    cUser.innerText = userName; 

    // Determine which images to show
    if (type === "bestFriend") {
      activeImages = bestFriendImages;
    } else if (type === "specialBoy") {
      activeImages = specialBoyImages;
    } else if (type === "specialGirl") {
      // Logic for different girls
      const cleanName = userName.toLowerCase();
      if (cleanName.includes("ranjita") || cleanName.includes("ranjeeta")) {
        activeImages = ranjitaImages;
      } else {
        activeImages = chuleshwariImages;
      }
    }

    // Setup Dots
    pagination.innerHTML = "";
    activeImages.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      pagination.appendChild(dot);
    });

    isCarouselActive = true;
    slideStage = 0; // Reset to text view
  }

  // Carousel Interaction
  carouselScreen.onclick = handleCarouselNext;
  
  let touchStartX = 0;
  carouselScreen.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  carouselScreen.addEventListener('touchend', e => {
    if (e.changedTouches[0].screenX < touchStartX - 50) handleCarouselNext();
  });

  function handleCarouselNext() {
    if (!isCarouselActive) return;

    if (slideStage === 0) {
      textContainer.classList.add("fade-out");
      carouselWrapper.classList.add("fade-in");
      pagination.classList.add("fade-in");
      updateImage(0); 
      slideStage = 1; 
    } else {
      currentImageIndex++;
      if (currentImageIndex < activeImages.length) {
        updateImage(currentImageIndex);
      } else {
        // Loop back to start
        currentImageIndex = 0;
        updateImage(0);
      }
    }
  }

  function updateImage(index) {
    carouselImg.style.opacity = 0;
    setTimeout(() => {
      carouselImg.src = activeImages[index];
      carouselImg.style.opacity = 1;
    }, 200);

    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  // --- CONFETTI ---
  function launchSideBlastConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff00cc", "#00d4ff", "#ffcc00", "#ffffff", "#adff2f"];

    for (let i = 0; i < 50; i++) {
      blast("left");
      blast("right");
    }

    function blast(side) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const startX = side === "left" ? 0 : window.innerWidth;
      const startY = window.innerHeight * 0.5;

      let x = startX;
      let y = startY;
      
      let vx = (side === "left" ? 1 : -1) * (Math.random() * 10 + 5);
      let vy = (Math.random() - 0.5) * 15;

      container.appendChild(c);

      const anim = setInterval(() => {
        x += vx;
        y += vy;
        vy += 0.5; 
        c.style.left = x + "px";
        c.style.top = y + "px";
        if (y > window.innerHeight) { clearInterval(anim); c.remove(); }
      }, 20);
    }
  }

});
