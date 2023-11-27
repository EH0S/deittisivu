const swipeContainer = document.querySelector("#swipe_container");
swipeContainer.addEventListener("touchstart", startTouch, false);
swipeContainer.addEventListener("touchmove", moveTouch, false);

const filterBtn = document
  .querySelector("#filter_btn")
  .addEventListener("click", onFilter, false);

const chatBtn = document
  .querySelector("#chat_btn")
  .addEventListener("click", onChat, false);

const rejectBtn = document
  .querySelector("#reject_btn")
  .addEventListener("click", onReject, false);

const acceptBtn = document
  .querySelector("#accept_btn")
  .addEventListener("click", onAccept, false);

const namelabel = document.querySelector("#name_label");
const ageLabel = document.querySelector("#age_label");
const descLabel = document.querySelector("#desc_label");

function onAccept() {}

function onReject() {}

function onChat() {}

function onFilter() {}

function loadRandomProfile() {

}

let initialX = null;
let initialY = null;

const templateGuys = {
  "accounts": [
    {
      "firstname": "Pekka",
      "lastname": "Siisoin",
      "description": "Mories moriesta, se on röiukko täs näi.",
      "gender": "male",
      "picture": "/img/6.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "64251"
      }
    },
    {
      "firstname": "Atte",
      "lastname": "Attenen",
      "description": "Seon atte täsä termostaatti! Lähdetkö neitokainen baariin.",
      "gender": "male",
      "picture": "/img/10.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "242603"
      },
    },
    {
      "firstname": "Antti",
      "lastname": "Matikainen",
      "description": "pittääkö sitä baariin lähtiä",
      "gender": "male",
      "picture": "/img/3.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "206426"
      },
    },
    {
      "firstname": "Teppo",
      "lastname": "Tipponen",
      "description": "röimän",
      "gender": "male",
      "picture": "/img/1.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "264220"
      },
    },
    {
      "firstname": "Ilikka",
      "lastname": "Rönssö",
      "description": "määki oon röimän",
      "gender": "male",
      "picture": "/img/2.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "4464212"
      },
    },
    {
      "firstname": "JORMA",
      "lastname": "KARHUNEN",
      "description": "Miten tätä käyhtetään",
      "gender": "male",
      "picture": "/img/11.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "464622"
      },
    }
  ]
}

const templateWomen = {
  "accounts": [
    {
      "firstname": "Lissu",
      "lastname": "Siisoin",
      "description": "mie oon vaa tällai täsnäi.",
      "gender": "woman",
      "picture": "/img/5.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "26464"
      }
    },
    {
      "firstname": "Veerasana",
      "lastname": "Visarana",
      "description": "auta mua ettimään mun pikkurilli",
      "gender": "woman",
      "picture": "/img/7.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "624264"
      }
    },
    {
      "firstname": "Leila",
      "lastname": "Mustonnen",
      "description": "Kavereita vaan",
      "gender": "woman",
      "picture": "/img/8.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "426642642"
      }
    },
    {
      "firstname": "Karita",
      "lastname": "Visarana",
      "description": "Terveppä terve",
      "gender": "woman",
      "picture": "/img/9.jpg",
      "filter": {
        "gender": "male",
        "country": "fi",
        "distance": "462426"
      }
    },
  ]
}

console.log(templateGuys.accounts[0]);

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
}

function moveTouch(e) {
  if (initialX === null || initialY === null) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const [diffX, diffY] = [initialX - currentX, initialY - currentY];

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      console.log("left");
    } else {
      console.log("right");
    }
  } else {
    if (diffY > 0) {
      console.log("up");
      ///show full profile
    }
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
}
