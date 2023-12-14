const countryFilter = document.getElementById("country_filter")
const genderFilter = document.getElementById("gender_filter")
const distanceFilter = document.getElementById("distance_filter")


import { storedYourProfile } from "../shared.js";

let saveBtn = document.getElementById("save_btn")
.addEventListener("click", () => {
    localStorage.setItem(storedYourProfile[0].nimi+"-countryFilter", countryFilter.value);
    localStorage.setItem(storedYourProfile[0].nimi+"-genderFilter", genderFilter.value);
    localStorage.setItem(storedYourProfile[0].nimi+"-distanceFilter", distanceFilter.value);

})