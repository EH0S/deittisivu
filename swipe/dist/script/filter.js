const countryFilter = document.getElementById("country_filter")
const genderFilter = document.getElementById("gender_filter")
const distanceFilter = document.getElementById("distance_filter")


saveBtn = document.getElementById("save_btn")
.addEventListener("click", () => {
    localStorage.setItem("countryFilter", countryFilter.value);
    localStorage.setItem("genderFilter", genderFilter.value);
    localStorage.setItem("distanceFilter", distanceFilter.value);

})