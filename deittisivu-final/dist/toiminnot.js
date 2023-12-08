var kirjautunut = null;
var avaaja = null;
var inforuutu = document.getElementById("info");

function kirjauduSisaan() {
    inforuutu.innerHTML = "<i>Tervetuloa deittisovellukseen</i>";

    let nimi = document.getElementById("kayttajaNimi").value;
    let sana = document.getElementById("salasana").value;
    
    let tallennettuData = JSON.parse(localStorage.getItem('käyttäjät'));
    
    if (!tallennettuData) {
        inforuutu.innerHTML = "Käyttäjää ei löydy!";
        document.getElementById("kayttajaNimi").value = "";
        document.getElementById("salasana").value = "";
    } else {
        let foundUser = tallennettuData.find(user => user.nimi === nimi && user.sana === sana);

        if (foundUser) {
            let rooli = foundUser.rooli;
            if (rooli === "mies") {
                kirjautunut = nimi;
                window.location.href = 'swipe.html';
                inforuutu.innerHTML = `Moi <b>${kirjautunut}</b>! Tervetuloa deitti appiin.`;
                localStorage.setItem("kirjautunut", nimi);
            } else {
                // Handle other roles or redirect as needed
            }
        } else {
            inforuutu.innerHTML = "Väärä käyttäjänimi tai salasana!";
            document.getElementById("kayttajaNimi").value = "";
            document.getElementById("salasana").value = "";
        }
    }
}

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
                        var userDatas = JSON.parse(localStorage.getItem('käyttäjät') || '[]');
                        userDatas.push(userData)
                        localStorage.setItem("käyttäjät", JSON.stringify(userDatas));
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
    //document.getElementById("etusivu").style.display = "block";
    //document.getElementById("miessivut").style.display = "none";
    //document.getElementById("editor").style.display = "none";
    window.location.href = 'kirjautuminen.html';
}
//avaa editoi sivun
function editoi() {
    inforuutu.innerHTML = "";
    document.getElementById("miessivut").style.display = "none";
    document.getElementById("editor").style.display = "block";
    let nimi = kirjautunut; // Get the logged-in username
    let tallennettuData = JSON.parse(localStorage.getItem('käyttäjät') || '[]');

    // Find the user by their name
    let foundUser = tallennettuData.find(user => user.nimi === nimi);

    if (foundUser) {
        let images = foundUser.images;

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
    } else {
        console.log('User data not found.');
    }
}

function palaa(){
    document.getElementById("miessivut").style.display = "block";
    document.getElementById("editor").style.display = "none";
    window.location.href = 'swipe.html';
    
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
    let loggedUserName = localStorage.getItem('kirjautunut');
    let käyttäjät = JSON.parse(localStorage.getItem('käyttäjät')) || [];
    let loggedUser = käyttäjät.find(user => user.nimi === loggedUserName);

    if (!loggedUser) {
        console.log('User not logged in.');
        return;
    }

    // Get the updated email value from the input field
    let newEmail = document.getElementById('sposti1').value;

    // Get the updated 'kerro itsestäsi' value from the input field
    let newAbout = document.getElementById('uuskerro').value;

    // Update the 'sahkoposti' and 'kerro' fields for the logged-in user with the new values
    loggedUser.sahkoposti = newEmail;
    loggedUser.kerro = newAbout;

    // Get all input elements of type file
    const inputElements = document.querySelectorAll('input[type="file"][id^="uuskuva"]');

    // Loop through each input file element
    inputElements.forEach((input, index) => {
        if (input.files && input.files[0] && index < 3) { // Consider only the first three inputs
            const image = input.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                // Save the image URLs directly at the respective indexes
                loggedUser.images[index] = event.target.result;

                // Update the corresponding preview image if needed
                const previewImage = document.getElementById(`kuva${index + 1}`);
                if (previewImage) {
                    previewImage.setAttribute('src', loggedUser.images[index]);
                }

                console.log(`Profile picture ${index + 1} updated for ${loggedUserName}`);
            };

            reader.readAsDataURL(image);
        }
    });

    // Store updated 'käyttäjät' array back in local storage
    localStorage.setItem('käyttäjät', JSON.stringify(käyttäjät));
}