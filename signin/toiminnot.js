var kirjautunut = null;
var avaaja = null;
var inforuutu = document.getElementById("info");

function kirjauduSisaan(){
    inforuutu.innerHTML = "<i>Tervetuloa deittisovellukseen</i>";
    let nimi = document.getElementById("kayttajaNimi").value;
    let sana = document.getElementById("salasana").value;
    let tallennettuData = JSON.parse(localStorage.getItem(nimi));
    if (!tallennettuData) {
        inforuutu.innerHTML = "Käyttäjää ei löydy!";
        document.getElementById("kayttajaNimi").value = "";
    } else if (tallennettuData.sana !== sana) {
        inforuutu.innerHTML = "Väärä salasana!";
        document.getElementById("salasana").value = "";
    } else {
        let rooli = tallennettuData.rooli;
        if (rooli === "mies") {
            kirjautunut = nimi;
            document.getElementById("kayttajaNimi").value = "";
            document.getElementById("salasana").value = "";
            document.getElementById("etusivu").style.display = "none";
            document.getElementById("miessivut").style.display = "block";
            inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Tervetuloa deitti appiin.`;
}}}

function luoKayttaja(){
    document.getElementById("kayttajanLuominen").style.display = "block";
    document.getElementById("etusivu").style.display = "none";
    inforuutu.innerHTML = "<i>hejsan</i>";
}

function vahvistaKayttaja(){
    let rooli = document.getElementById("rooli").value;
    let nimi = document.getElementById("uusiKayttajaNimi").value;
    let sana = document.getElementById("uusiSalasana").value;
    let puhelin = document.getElementById("puh").value;
    let sahkoposti = document.getElementById("sposti").value;
    let kerro = document.getElementById("kerro").value;
    let ikä = document.getElementById("ika").value;

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
  
        // Initialize an object to store user data
        let userData = {
            nimi,
            rooli,
            sana,
            puhelin,
            sahkoposti,
            kerro,
            ikä,
            images: [] // Store images in an array
        };

        // Function to handle image preview and storage
        function handleImagePreview(inputId) {
            const input = document.getElementById(inputId);
            const image = input.files[0];
    
            if (image) {
                const reader = new FileReader();
    
                reader.onload = function (event) {
                    let pfp = event.target.result;
                    userData.images.push(pfp);
    
                    // Store the user data in localStorage after all images are loaded
                    if (userData.images.length === 3) {
                        localStorage.setItem(nimi, JSON.stringify(userData));
                        document.getElementById("etusivu").style.display = "block";
                        document.getElementById("kayttajanLuominen").style.display = "none";
                        inforuutu.innerHTML = `Käyttäjä <b>${nimi}</b> luotu!`;
                        document.getElementById("uusiKayttajaNimi").value = "";
                        document.getElementById("uusiSalasana").value = "";
                    }
                };
    
                reader.readAsDataURL(image);
            }
        }
    
        handleImagePreview("thumbnailRegister");
        handleImagePreview("thumbnailRegister2");
        handleImagePreview("thumbnailRegister3");
    }
}


function Paivita() {
    const previewImage1 = document.getElementById('preview0');
    const previewImage2 = document.getElementById('preview1');
    const previewImage3 = document.getElementById('preview2');

    // Function to handle image preview and storage
    function handleImagePreview(inputId, previewImage) {
        const input = document.getElementById(inputId);
        const image = input.files[0];

        if (image) {
            const reader = new FileReader();

            reader.onload = function (event) {
                let pfp = event.target.result;

                // Update the preview image source
                if (previewImage) {
                    previewImage.setAttribute('src', pfp);
                }
            };

            reader.readAsDataURL(image);
        }
    }

    handleImagePreview("thumbnailRegister", previewImage1);
    handleImagePreview("thumbnailRegister2", previewImage2);
    handleImagePreview("thumbnailRegister3", previewImage3);
}

// Call this function when the button is clicked
document.getElementById('updateButton').addEventListener('click', updatePreviewImages);

function peruutaAlkuun(){
    inforuutu.innerHTML = "<i></i>";
    document.getElementById("etusivu").style.display = "block";
    document.getElementById("kayttajanLuominen").style.display = "none";
    document.getElementById("uusiKayttajaNimi").value = "";
    document.getElementById("uusiSalasana").value = "";
}

function kirjauduUlos(){
    inforuutu.innerHTML = `<b>${kirjautunut}</b> kirjattu ulos, näkemiin!`;
    kirjautunut = null;
    document.getElementById("etusivu").style.display = "block";
    document.getElementById("miessivut").style.display = "none";
    document.getElementById("editor").style.display = "none";
}
//avaa editoi sivun
function editoi() {
    inforuutu.innerHTML = "<i></i>";
    document.getElementById("miessivut").style.display = "none";
    document.getElementById("editor").style.display = "block";
    let nimi = kirjautunut;
    let tallennettuData = JSON.parse(localStorage.getItem(nimi));

    let images = tallennettuData.images;

    // Set image URLs to preview elements
    const previewImage1 = document.getElementById('kuva1');
    const previewImage2 = document.getElementById('kuva2');
    const previewImage3 = document.getElementById('kuva3');

    if (images && images.length >= 3) {
        previewImage1.setAttribute('src', images[0]); // Set image URL directly
        previewImage2.setAttribute('src', images[1]); // Set image URL directly
        previewImage3.setAttribute('src', images[2]); // Set image URL directly
        console.log('Image 1 URL:', images[0]);
        console.log('Image 2 URL:', images[1]);
        console.log('Image 3 URL:', images[2]);
    } else {
        console.log('Images not available or insufficient images.');
    }
}

function palaa(){
    document.getElementById("miessivut").style.display = "block";
    document.getElementById("editor").style.display = "none";

    
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
    let uuskerro = document.getElementById("uuskerro").value;
    let uussposti = document.getElementById("sposti1").value;

    // Get all input elements of type file
    const inputElements = document.querySelectorAll('input[type="file"][id^="uuskuva"]');

    // Initialize an array to store image data
    let imagesData = JSON.parse(localStorage.getItem(nimi)).images || [];

    // Loop through each input file element
    inputElements.forEach((input, index) => {
        if (input.files && input.files[0] && index < 3) { // Consider only the first three inputs
            const image = input.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                let tallennettuData = JSON.parse(localStorage.getItem(nimi));

                // Save the image URLs directly at the respective indexes
                imagesData[index] = event.target.result;

                // Update the corresponding preview image
                const previewImage = document.getElementById(`kuva${index + 1}`);
                if (previewImage) {
                    previewImage.setAttribute('src', imagesData[index]);
                }

                // Update other user data as needed
                tallennettuData.kerro = uuskerro;
                tallennettuData.sahkoposti = uussposti;

                // Store updated user data back in local storage
                tallennettuData.images = imagesData;
                localStorage.setItem(nimi, JSON.stringify(tallennettuData));

                console.log(`Profile picture ${index + 1} updated for ${nimi}`);
            };

            reader.readAsDataURL(image);
        }
    });
}