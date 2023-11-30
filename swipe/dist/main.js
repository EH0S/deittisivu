const templateGuys = {
  accounts: [
    {
      firstname: "Pekka",
      lastname: "Siisoin",
      description: "Mories moriesta, se on röiukko täs näi.",
      gender: "male",
      picture: "./img/4.jpg",
      age: "99",
      filter: {
        gender: "male",
        country: "fi",
        distance: "64251",
      },
    },
    {
      firstname: "Atte",
      lastname: "Attenen",
      description: "Seon atte täsä termostaatti! Lähdetkö neitokainen baariin.",
      gender: "male",
      picture: "./img/10.jpg",
      age: "22",

      filter: {
        gender: "male",
        country: "fi",
        distance: "242603",
      },
    },
    {
      firstname: "Antti",
      lastname: "Matikainen",
      description: "pittääkö sitä baariin lähtiä",
      gender: "male",
      picture: "./img/3.jpg",
      age: "25",

      filter: {
        gender: "male",
        country: "fi",
        distance: "206426",
      },
    },
    {
      firstname: "Teppo",
      lastname: "Tipponen",
      description: "röimän",
      gender: "male",
      picture: "./img/1.jpg",
      age: "27",
      filter: {
        gender: "male",
        country: "fi",
        distance: "264220",
      },
    },
    {
      firstname: "Ilikka",
      lastname: "Rönssö",
      description: "määki oon röimän",
      gender: "male",
      picture: "./img/2.jpg",
      age: "32",
      filter: {
        gender: "male",
        country: "fi",
        distance: "4464212",
      },
    },
    {
      firstname: "JORMA",
      lastname: "KARHUNEN",
      description: "Miten tätä käyhtetään",
      gender: "male",
      picture: "./img/11.jpg",
      age: "44",
      filter: {
        gender: "male",
        country: "fi",
        distance: "464622",
      },
    },
  ],
};

const templateWomen = {
  accounts: [
    {
      firstname: "Lissu",
      lastname: "Siisoin",
      description: "mie oon vaa tällai täsnäi.",
      gender: "woman",
      picture: "./img/5.jpg",
      age: "1000",
      filter: {
        gender: "male",
        country: "fi",
        distance: "26464",
      },
    },
    {
      firstname: "Veerasana",
      lastname: "Visarana",
      description: "auta mua ettimään mun pikkurilli",
      gender: "woman",
      picture: "./img/7.jpg",
      age: "22",

      filter: {
        gender: "male",
        country: "fi",
        distance: "624264",
      },
    },
    {
      firstname: "Leila",
      lastname: "Mustonnen",
      description: "Kavereita vaan",
      gender: "woman",
      picture: "./img/8.jpg",
      age: "35",
      filter: {
        gender: "male",
        country: "fi",
        distance: "426642642",
      },
    },
    {
      firstname: "Karita",
      lastname: "Visarana",
      description: "Terveppä terve",
      gender: "woman",
      picture: "./img/9.jpg",
      age: "45",
      filter: {
        gender: "male",
        country: "fi",
        distance: "462426",
      },
    },
  ],
};

let namelabel = document.querySelector("#name_label");
let ageLabel = document.querySelector("#age_label");
let descLabel = document.querySelector("#desc_label");

let filterGender = "w";
let currentSwipeProfile = undefined;
let currentSwipeIndex = undefined;
let startX = 0,
  startY = 0,
  moveX = 0,
  moveY = 0;

const swipeProfile = document.querySelector("#swipe_profile");
const swipeContainer = document.querySelector("#swipe_container");
const swipePicture = document.querySelector("#swipe_picture");
swipePicture.addEventListener("pointerdown", onPointerDown, false);


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

  do {
    randomIndex =
      filterGender === "male"
        ? Math.floor(Math.random() * templateWomen.accounts.length)
        : Math.floor(Math.random() * templateGuys.accounts.length);
  } while (randomIndex === currentSwipeIndex);

  currentSwipeProfile =
    filterGender === "male"
      ? templateWomen.accounts[randomIndex]
      : templateGuys.accounts[randomIndex];
  currentSwipeIndex = randomIndex;

  namelabel.textContent = currentSwipeProfile.firstname;
  ageLabel.textContent = currentSwipeProfile.age;
  descLabel.textContent = currentSwipeProfile.description;

  swipePicture.style.backgroundImage = `url(${currentSwipeProfile.picture})`;
  swipePicture.style.backgroundSize = "cover";
  swipePicture.style.backgroundPosition = "center";
}

loadRandomProfile();

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
    swipePicture.addEventListener("pointerdown", onPointerDown);
    setTransform(0, 0, 0, 0);
    loadRandomProfile();
  }, 1000);
}

function cancel() {
  setTransform(0, 0, 0, 100);
  setTimeout(() => (swipePicture.style.transition = ""), 100);
}

function onAccept() {
  //TODO: save to localstorage as swiped profile
}

function onReject() {
  loadRandomProfile(); //just skip
}
