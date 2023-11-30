var kirjautunut = null;
var avaaja = null;
var inforuutu = document.getElementById("info");

function kirjauduSisaan(){
    inforuutu.innerHTML = "<i>Keskustelun polarisoija numero yxi</i>";
    let nimi = document.getElementById("kayttajaNimi").value;
    let sana = document.getElementById("salasana").value;
    let tallennettuNimi = localStorage.getItem(nimi);
    let tallennettuSana = localStorage.getItem(`${nimi};*`);
    if(tallennettuNimi != nimi){
        inforuutu.innerHTML = "Käyttäjää ei löydy!";
        document.getElementById("kayttajaNimi").value = "";
    } else if(tallennettuSana != sana){
        inforuutu.innerHTML = "Väärä salasana!";
        document.getElementById("salasana").value = "";
    } else if(localStorage.getItem(`${nimi};&`) == "aanestaja"){
        kirjautunut = nimi;
        document.getElementById("kayttajaNimi").value = "";
        document.getElementById("salasana").value = "";
        document.getElementById("aanestajanEtusivu").style.display = "block";
        document.getElementById("etusivu").style.display = "none";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Äänestäjä</b>.`;
    } else if(localStorage.getItem(`${nimi};&`) == "mies"){
        kirjautunut = nimi;
        sahposti = localStorage.getItem (`${nimi};%`)
        document.getElementById("kayttajaNimi").value = "";
        document.getElementById("salasana").value = "";
        document.getElementById("miessivut").style.display = "block";
        document.getElementById("etusivu").style.display = "none";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! <b>${sahposti}</b>! Olet rooliltasi <b>Mies</b>.`;
            // Get the image (data URL) from local storage
            const thumbnail = localStorage.getItem(`${nimi};$`)

            const previewImage = document.getElementById('preview')

            if (thumbnail) {
                // If there is an image in the local storage, set the data URL as the src attribute value
                previewImage.setAttribute('src', thumbnail)
            }
    } else if(localStorage.getItem(`${nimi};&`) == "nainen"){
        kirjautunut = nimi;
        document.getElementById("kayttajaNimi").value = "";
        document.getElementById("salasana").value = "";
        document.getElementById("nainensivut").style.display = "block";
        document.getElementById("etusivu").style.display = "none";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Nainen</b>.`;
    } else {
        kirjautunut = nimi;
        document.getElementById("kayttajaNimi").value = "";
        document.getElementById("salasana").value = "";
        document.getElementById("yllapitajanEtusivu").style.display = "block";
        document.getElementById("etusivu").style.display = "none";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Ylläpitäjä</b>.`;
    }
}

function luoKayttaja(){
    document.getElementById("kayttajanLuominen").style.display = "block";
    document.getElementById("etusivu").style.display = "none";
    inforuutu.innerHTML = "<i>Keskustelun polarisoija numero yxi</i>";
}

function vahvistaKayttaja(){
    let rooli = document.getElementById("rooli").value;
    let nimi = document.getElementById("uusiKayttajaNimi").value;
    let sahposti = document.getElementById("sposti").value;
    let sana = document.getElementById("uusiSalasana").value;
    let puhelin = document.getElementById("puh").value;
    let kuva = document.getElementById("thumbnailRegister").value;
    let sahkoposti = document.getElementById("sposti").value;

    if(nimi.length < 3 || nimi.length > 20 || nimi.includes(" ") || nimi.includes(";") || nimi.includes("&") || nimi.includes("*") || nimi.includes("¤")){
        inforuutu.innerHTML = " Nimen minimipituus on 3 ja maksimipituus 20 merkkiä. Älä käytä välilyöntiä, puolipistettä, &-, ¤- tai *-merkkejä.";
        document.getElementById("uusiKayttajaNimi").value = "";
    }  else if(sana.length < 3 || sana.includes(";")){
        inforuutu.innerHTML = "Salasanassa tulee olla vähintään 3 merkkiä eikä se saa sisältää puolipisteitä. Sen maksimipituus on 10 merkkiä.";
        document.getElementById("uusiSalasana").value = "";
    }  else if(puhelin.length < 9 || puhelin.includes(";")){
        inforuutu.innerHTML = "Puhelin numerossa tulee olemaan vähintään 9 numeroa";
        document.getElementById("puh").value = "";
    }   else {
        localStorage.setItem(nimi, nimi);
        localStorage.setItem(nimi + ";&", rooli);
        localStorage.setItem(nimi + ";*", sana);
        localStorage.setItem(nimi + ";/", puhelin);
        localStorage.setItem(nimi + ";%", sahposti);
        
        let kuva = document.getElementById("thumbnailRegister").value;
        // Check if an image is selected
        if (kuva) {
            const input = document.getElementById('thumbnailRegister');
            const image = input.files[0];
            const reader = new FileReader();
            const previewImage = document.getElementById('preview1'); // Image preview element
    
            reader.onload = function(event) {
                // Display image preview
                previewImage.setAttribute('src', event.target.result);
                localStorage.setItem(nimi + ";$", event.target.result);

            };
    
            // Read the image file as a data URL
            reader.readAsDataURL(image);
        }

        document.getElementById("etusivu").style.display = "block";
        document.getElementById("kayttajanLuominen").style.display = "none";
        inforuutu.innerHTML = `Käyttäjä <b>${nimi}</b> luotu!`;
        document.getElementById("uusiKayttajaNimi").value = "";
        document.getElementById("uusiSalasana").value = "";
    }
}

function peruutaAlkuun(){
    inforuutu.innerHTML = "<i>Keskustelun polarisoija numero yxi</i>";
    document.getElementById("etusivu").style.display = "block";
    document.getElementById("kayttajanLuominen").style.display = "none";
    document.getElementById("uusiKayttajaNimi").value = "";
    document.getElementById("uusiSalasana").value = "";
}

function kirjauduUlos(){
    inforuutu.innerHTML = `<b>${kirjautunut}</b> kirjattu ulos, näkemiin!`;
    kirjautunut = null;
    document.getElementById("etusivu").style.display = "block";
    //document.getElementById("aanestajanEtusivu").style.display = "none";
    document.getElementById("yllapitajanEtusivu").style.display = "none";
    document.getElementById("miessivut").style.display = "none";
    document.getElementById("Muokkaus").style.display = "none";
    document.getElementById("editor").style.display = "none";
}

function editoi(){
    document.getElementById("miessivut").style.display = "none";
    document.getElementById("editor").style.display = "block";
}

function luoAanestys(){
    document.getElementById("aanestyksenLuominen").style.display = "block";
    document.getElementById("yllapitajanEtusivu").style.display = "none";
    inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Ylläpitäjä</b>.`;
}

function peruutaEtusivulle(){
    if(localStorage.getItem(`${kirjautunut};&`) == "yllapitaja"){
        document.getElementById("yllapitajanEtusivu").style.display = "block";
        document.getElementById("aanestyksenLuominen").style.display = "none";
        document.getElementById("uusiAanestysNimi").value = "";
        document.getElementById("uusiEhdokas1").value = "";
        document.getElementById("uusiEhdokas2").value = "";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Ylläpitäjä</b>.`;
    } else {
        document.getElementById("aanestajanEtusivu").style.display = "block";
        document.getElementById("katsoAanestysta").style.display = "none";
        inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Olet rooliltasi <b>Äänestäjä</b>.`;
    }
}

function tallenna() {
    let nimi = kirjautunut;
    let tallennettuNimi = localStorage.getItem(nimi);
    let uusposti = document.getElementById("sposti1").value;
    let kerro = document.getElementById("kerro").value;

    localStorage.setItem(tallennettuNimi + ";%", uusposti);
    localStorage.setItem(tallennettuNimi + ";€", kerro);

    const input = document.getElementById('thumbnail');

    if (input.files && input.files[0]) {
        const image = input.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            localStorage.setItem(nimi + ";$", event.target.result);

            // Update the preview image
            const previewImage = document.getElementById('preview');
            previewImage.setAttribute('src', event.target.result);

            console.log("Profile picture updated for", nimi);
        };

        reader.readAsDataURL(image);
    }
}

const input = document.getElementById('thumbnail')

// List to change event on the input element to get the image file
input.addEventListener('change', (event) => {
    
    let nimi = document.getElementById("uusiKayttajaNimi").value;
    let nimi2 = document.getElementById("kayttajaNimi").value;
    let tallennettuNimi = localStorage.getItem(nimi);
    const image = event.target.files[0]

    // Create file reader object
    const reader = new FileReader()

    // Convert image to data URL
    reader.readAsDataURL(image)

    reader.addEventListener('load', () => {
        // Save data URL to local storage
        localStorage.setItem(nimi + ";$", reader.result)
        localStorage.setItem(nimi2 + ";$", reader.result)
        console.log(nimi2);
    })
})

// Loading the stored image to the web page
document.addEventListener('DOMContentLoaded', () => {
    let nimi = document.getElementById("kayttajaNimi").value;

    let tallennettuNimi = localStorage.getItem(nimi);

    kirjautunut = nimi
    // Get the image (data URL) from local storage
    const thumbnail = localStorage.getItem(`${kirjautunut};$`)

    const previewImage = document.getElementById('preview')

    if (thumbnail) {
        // If there is an image in the local storage, set the data URL as the src attribute value
        previewImage.setAttribute('src', thumbnail)
    }
})