import templateGuys from "../templateGuys.json" assert { type: "json" };
import templateWomen from "../templateWomen.json" assert { type: "json" };

let namelabel = document.querySelector("#name_label");
let ageLabel = document.querySelector("#age_label");
let descLabel = document.querySelector("#desc_label");

let currentSwipeProfile = undefined;
let currentSwipeIndex = undefined;
let startX = 0,
  startY = 0,
  moveX = 0,
  moveY = 0;

const swipeProfile = document.querySelector("#swipe_profile");
const swipeContainer = document.querySelector("#swipe_container");
const swipePicture = document.querySelector("#swipe_picture");
const profilePictures = document.querySelector("#profile_pictures");

swipePicture.addEventListener("pointerdown", onPointerDown, false);
swipePicture.addEventListener("click", navigatePictures, false);

const filterBtn = document.querySelector("#filter_btn");
const chatBtn = document.querySelector("#chat_btn");

const rejectBtn = document
  .querySelector("#reject_btn")
  .addEventListener("click", onReject, false);

const acceptBtn = document
  .querySelector("#accept_btn")
  .addEventListener("click", onAccept, false);

function loadRandomProfile() {
  
  let randomIndex = undefined;
  let attempts = 0;
  const maxAttempts = 100;
  const filterGender = localStorage.getItem("genderFilter");
  console.log(filterGender);
  let isValidIndex = false;
  do {
    if (filterGender === "male") {
      randomIndex = Math.floor(Math.random() * templateGuys.accounts.length);
   //  console.log(templateGuys.accounts[randomIndex].gender);
      isValidIndex = isValidFilter(templateGuys.accounts[randomIndex]);
    } else {
      randomIndex = Math.floor(Math.random() * templateWomen.accounts.length);
    //  console.log(templateWomen.accounts[randomIndex].gender);

      isValidIndex = isValidFilter(templateWomen.accounts[randomIndex]);
     // console.log(isValidIndex);
    }

    attempts++;

    if (attempts >= maxAttempts) {
      console.error("Exceeded maximum attempts to find a valid profile.");
      return; // Exit the function to prevent an infinite loop
    }
  } while (randomIndex === currentSwipeIndex || !isValidIndex);

  currentSwipeProfile =
    filterGender === "male"
      ? templateGuys.accounts[randomIndex]
      : templateWomen.accounts[randomIndex];

  currentSwipeIndex = randomIndex;

  namelabel.textContent = currentSwipeProfile.firstname;
  ageLabel.textContent = currentSwipeProfile.age;
  descLabel.textContent = currentSwipeProfile.description;

  swipePicture.style.backgroundImage = `url(${currentSwipeProfile.pics[0]})`;
  swipePicture.style.backgroundSize = "cover";
  swipePicture.style.backgroundPosition = "center";

  profilePictures.innerHTML = ""; //clearing for new pics
  for (let i = 0; i < currentSwipeProfile.pics.length; i++) {
    var newPic = document.createElement("span");
    newPic.className =
      i === 0 ? "w-full h-full border border-red-500" : "w-full h-full border";
    profilePictures.appendChild(newPic);
  }
}

function isValidFilter(account) {
  const filterGender = localStorage.getItem("genderFilter");
  const filterCountry = localStorage.getItem("countryFilter");
  const filterDistance = localStorage.getItem("distanceFilter");

  const isValidGender = filterGender === account.gender ? true : false;
  const isValidCountry = filterCountry === account.country ? true : false;
  const isValidDistance = filterDistance >= account.distance ? true : false;

  console.log(isValidGender, isValidCountry, isValidDistance);
  return isValidGender && isValidCountry && isValidDistance;
}

function navigatePictures() {
  const pics = profilePictures.getElementsByTagName("span");
  const selectedClassName = "w-full h-full border border-red-500";
  const defaultClassname = "w-full h-full border";

  for (let i = 0; i < pics.length; i++) {
    if (pics[i].className == selectedClassName) {
      pics[i].className = defaultClassname;

      if (pics[i + 1] !== undefined) {
        pics[i + 1].className = selectedClassName;
        swipePicture.style.backgroundImage = `url(${
          currentSwipeProfile.pics[i + 1]
        })`;

        return;
      } else {
        pics[0].className = selectedClassName;
        swipePicture.style.backgroundImage = `url(${currentSwipeProfile.pics[0]})`;
      }
    }
  }
}

loadRandomProfile();
//navigatePictures();

//SWIPE ANIMATION
function setTransform(x, y, deg, duration) {
  swipePicture.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
  if (duration) swipePicture.style.transition = `transform ${duration}ms`;
}

function onPointerDown({ clientX, clientY }) {
  startX = clientX;
  startY = clientY;
  swipePicture.addEventListener("pointermove", onPointerMove);
  swipePicture.addEventListener("pointerup", onPointerUp);
  swipePicture.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove({ clientX, clientY }) {
  moveX = clientX - startX;
  moveY = clientY - startY;
  setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp() {
  swipePicture.removeEventListener("pointermove", onPointerMove);
  swipePicture.removeEventListener("pointerup", onPointerUp);
  swipePicture.removeEventListener("pointerleave", onPointerUp);
  if (Math.abs(moveX) > swipePicture.clientHeight / 2) {
    swipePicture.removeEventListener("pointerdown", onPointerDown);
    complete();
  } else cancel();
}

function complete() {
  const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3;
  const flyY = (moveY / moveX) * flyX;

  setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);

  setTimeout(() => {
    setTransform(0, 0, 0, 0);

    swipePicture.addEventListener("pointerdown", onPointerDown);
    (startX = 0), (startY = 0), (moveX = 0), (moveY = 0);
    //loadRandomProfile();
    isMatch();
  }, 1000);
}

function cancel() {
  setTransform(0, 0, 0, 0);
  setTimeout(() => (swipePicture.style.transition = ""), 100);
}

function onAccept() {
  isMatch();
}

function isMatch() {
  const random = Math.random();
  if (random < 0.5) {
    //no match
    loadRandomProfile();
  } else if (random < 0.7) {
    //match

    var matchData = JSON.parse(localStorage.getItem("Profiles") || '[]');
    console.log(matchData[0]);

    const alreadyMatch = matchData.some(profile => profile.firstname === currentSwipeProfile.firstname);
    console.log("no nko", alreadyMatch);

    if (!alreadyMatch) {
      matchData.push(currentSwipeProfile)
      localStorage.setItem("Profiles", JSON.stringify(matchData));
    }
    
    loadRandomProfile();
  }
}

function onReject() {
  loadRandomProfile(); //just skip
}
