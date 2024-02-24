let header = document.querySelector(".header-area");

// Constants
const INTERVAL_TIME = 5000;

// Function to select elements
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

// Function to set main color
function setMainColor(color) {
  document.documentElement.style.setProperty("--main-color", color);
  localStorage.setItem("color_option", color);
}

// Function to handle active state
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Event listeners
getElement(".toggle-settings").addEventListener("click", function () {
  getElement(".settings-box").classList.toggle("open");
  getElement(".toggle-settings i").classList.toggle("rotate");
});

// Random background buttons
let randomYes = getElement(
  ".settings-box .option-box .random-backgrounds span.yes"
);
let randomNo = getElement(
  ".settings-box .option-box .random-backgrounds span.no"
);

randomYes.onclick = function () {
  randomNo.classList.remove("active");
  this.classList.add("active");
  localStorage.setItem("random_image", "yes");
  clearInterval(randomImageInterval);
  interval();
};

randomNo.onclick = function () {
  randomYes.classList.remove("active");
  this.classList.add("active");
  localStorage.setItem("random_image", "no");
  clearInterval(randomImageInterval);
};

// Show bullets buttons
let showYes = getElements(".settings-box .option-box .bullets-option span")[0];
let showNo = getElements(".settings-box .option-box .bullets-option span")[1];

showYes.onclick = function () {
  showNo.classList.remove("active");
  this.classList.add("active");
  getElement(".nav-bullets").style.display = "block";
  localStorage.setItem("show_bullets", "yes");
};

showNo.onclick = function () {
  showYes.classList.remove("active");
  this.classList.add("active");
  getElement(".nav-bullets").style.display = "none";
  localStorage.setItem("show_bullets", "no");
};

// Sticky Header buttons
let stickyYes = getElements(".settings-box .option-box .sticky-header span")[0];
let stickyNo = getElements(".settings-box .option-box .sticky-header span")[1];

stickyYes.onclick = function () {
  stickyNo.classList.remove("active");
  this.classList.add("active");
  localStorage.setItem("sticky", "yes");
  stickyHeader(); // Reapply sticky header functionality
};

stickyNo.onclick = function () {
  stickyYes.classList.remove("active");
  this.classList.add("active");
  localStorage.setItem("sticky", "no");
  stickyHeader(); // Reapply sticky header functionality
  window.location.reload()
};

// Reset options
getElement(".reset-options").onclick = function () {
  randomYes.click();
  showYes.click();
  stickyYes.click();
  for (let colorLi of colorsLi) {
    colorLi.classList.remove("active");
  }
  colorsLi[0].classList.add("active");
  setMainColor(colorsLi[0].dataset.color);
  // window.location.reload()
};

const landing = getElement(".landing-page");

let imgs = [
  "Imgs/01.jpg",
  "Imgs/02.jpg",
  "Imgs/03.jpg",
  "Imgs/04.jpg",
  "Imgs/05.jpg",
  "Imgs/06.png",
  "Imgs/07.jpg",
  "Imgs/08.jpg",
  "Imgs/09.jpg",
  "Imgs/10.jpg",
];

let randomImageInterval;

function interval() {
  randomImageInterval = setInterval(function () {
    let randomImageNum = Math.floor(Math.random() * imgs.length);
    landing.style.backgroundImage = `url(${imgs[randomImageNum]})`;
  }, INTERVAL_TIME);
}
interval();

// Colors
let mainColor = localStorage.getItem("color_option");

let colorsLi = getElements(".colors-list li");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  colorsLi.forEach((element) => {
    // Remove Active Class From All Colors List Item
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Switch Colors
// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

let randomImageLocal = localStorage.getItem("random_image");
let showLocal = localStorage.getItem("show_bullets");
let stickLocal = localStorage.getItem("sticky");

if (randomImageLocal === "no") {
  randomNo.click();
}

if (showLocal === "no") {
  showNo.click();
}

if (stickLocal === "no") {
  stickyNo.classList.add("active");
  stickyYes.classList.remove("active");
  stickyHeader();
} else {
  stickyYes.classList.add("active");
  stickyNo.classList.remove("active");
  stickyHeader();
}

let ourSkills = getElement(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;

  // Get The Element Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Get The Window Height
  let windowHeight = this.innerHeight;

  // The Amount of Pixels Scrolled from Top
  let windowScrollTop = this.scrollY;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 200
  ) {
    let allSkills = getElements(".skill-box .skill-progress span");
    allSkills.forEach((element) => {
      element.style.width = element.dataset.progress;
    });
  }
};

let ourGallery = getElements(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function (e) {
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.append(overlay);

    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    let popupImage = document.createElement("img");
    popupImage.setAttribute("src", e.target.getAttribute("src"));

    popupBox.append(popupImage);
    document.body.append(popupBox);

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.append(imgText);
      popupBox.prepend(imgHeading);
    }

    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "X";
    closeBtn.classList.add("close-button");
    popupBox.prepend(closeBtn);

    closeBtn.addEventListener("click", function () {
      popupBox.remove();
      overlay.remove();
    });
    overlay.addEventListener("click", function () {
      popupBox.remove();
      overlay.remove();
    });
  });
});

const allBullets = getElements(".nav-bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    getElement(e.target.dataset.section).scrollIntoView();
  });
});

// Open Links Menu on Toggle-menu click
let toggleBtn = getElement(".toggle-menu");
let hLinks = getElement(".header-area .links");

toggleBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  hLinks.classList.toggle("open");
});

hLinks.onclick = function (e) {
  e.stopPropagation();
};

document.documentElement.onclick = function (e) {
  if (e.target !== toggleBtn && e.target !== hLinks) {
    toggleBtn.classList.remove("menu-active");
    hLinks.classList.remove("open");
  }
};

// Function to handle sticky header
function stickyHeader() {
  // Get the sticky option from local storage
  let stickyOption = localStorage.getItem("sticky");

  // If sticky option is not set or it's set to "yes"
  if (stickyOption === null || stickyOption === "yes") {
    window.addEventListener("scroll", function () {
      // Get the height of the header
      let headerOuterHeight = header.offsetHeight;

      // The amount of pixels scrolled from top
      let windowScrollTop = window.scrollY || window.pageYOffset;

      // Add or remove the "fixed-header" class based on the scroll position
      if (windowScrollTop > headerOuterHeight) {
        header.classList.add("fixed-header");
      } else {
        header.classList.remove("fixed-header");
      }
    });
  } else {
    console.log("Sticky Header is Off");
    header.classList.remove("fixed-header");
  }
}
stickyHeader();
