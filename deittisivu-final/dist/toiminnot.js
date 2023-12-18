var kirjautunut = null;
var avaaja = null;
var inforuutu = document.getElementById("info");

function kirjauduSisaan() {

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
                localStorage.setItem("kirjautunut", nimi);
                let findUser = tallennettuData.filter(user => user.nimi === nimi);
                // laittaa kirjautuneen käyttäjän tiedot chatti osioon, pfp jne...
                localStorage.setItem('yourProfile', JSON.stringify(findUser));
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
    inforuutu.innerHTML = "<i></i>";
}

function vahvistaKayttaja() {
    let existingUsers = JSON.parse(localStorage.getItem('käyttäjät') || '[]');
    let sukupuoli = document.getElementById("Sukupuoli").value;
    let nimi = document.getElementById("uusiKayttajaNimi").value;
    let sana = document.getElementById("uusiSalasana").value;
    let puhelin = document.getElementById("puh").value;
    let sahkoposti = document.getElementById("sposti").value;
    let kerro = document.getElementById("kerro").value;
    let ikä = document.getElementById("ika").value;

    const isUsernameTaken = existingUsers.some(user => user.nimi.toLowerCase() === nimi.toLowerCase());

    if (isUsernameTaken) {
        inforuutu.innerHTML = "Käyttäjänimi on jo käytössä. Valitse toinen käyttäjänimi.";
        document.getElementById("uusiKayttajaNimi").value = "";
    } else if (nimi.length < 3 || nimi.length > 20) {
        inforuutu.innerHTML = "Nimen minimipituus on 3.";
        document.getElementById("uusiKayttajaNimi").value = "";
    } else if (sana.length < 3 || sana.includes(";")) {
        inforuutu.innerHTML = "Salasanassa tulee olla vähintään 3 merkkiä.";
        document.getElementById("uusiSalasana").value = "";
    } else if (puhelin.length < 9 || puhelin.includes(";")) {
        inforuutu.innerHTML = "Puhelinnumerossa tulee olla vähintään 9 numeroa.";
        document.getElementById("puh").value = "";
    } else {
  
        
        let userData = {
            nimi,
            sukupuoli,
            sana,
            puhelin,
            sahkoposti,
            kerro,
            ikä,
            images: [] 
        };

        // Function to handle image preview and storage
        function handleImagePreview(inputId) {
            const input = document.getElementById(inputId);
            const image = input.files[0];
    
            if (image) {
                if (image.size >= 1 * 1024 * 1024) {
                    inforuutu.innerHTML = "Kuva in liian iso";
                    alert("liia iso kuva");
                    return;
                }
                const reader = new FileReader();
    
                reader.onload = function (event) {
                    let pfp = event.target.result;
                    userData.images.push(pfp);
    
                    if (userData.images.length >= 3) {
                        var userDatas = JSON.parse(localStorage.getItem('käyttäjät') || '[]');
                        userDatas.push(userData)
                        localStorage.setItem("käyttäjät", JSON.stringify(userDatas));
                        document.getElementById("etusivu").style.display = "block";
                        document.getElementById("kayttajanLuominen").style.display = "none";
                        inforuutu.innerHTML = `Käyttäjä <b>${nimi}</b> luotu!`;
                        document.getElementById("uusiKayttajaNimi").value = "";
                        document.getElementById("uusiSalasana").value = "";
                        document.getElementById("puh").value = "";
                        document.getElementById("sposti").value = "";
                        document.getElementById("kerro").value = "";
                        document.getElementById("ika").value = "";
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

    function handleImagePreview(inputId, previewImage) {
        const input = document.getElementById(inputId);
        const image = input.files[0];

        if (image) {
            const reader = new FileReader();

            reader.onload = function (event) {
                let pfp = event.target.result;

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


function peruutaAlkuun(){
    inforuutu.innerHTML = "<i></i>";
    document.getElementById("etusivu").style.display = "block";
    document.getElementById("kayttajanLuominen").style.display = "none";
    document.getElementById("uusiKayttajaNimi").value = "";
    document.getElementById("uusiSalasana").value = "";
    document.getElementById("puh").value = "";
    document.getElementById("sposti").value = "";
    document.getElementById("kerro").value = "";
    document.getElementById("ika").value = "";
}

function kirjauduUlos(){
    inforuutu.innerHTML = `<b>${kirjautunut}</b> kirjattu ulos, näkemiin!`;
    kirjautunut = null;
    window.location.href = 'kirjautuminen.html';
    localStorage.removeItem('kirjautunut');
}
//avaa editoi sivun
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.endsWith("asetukset.html")) {
        let nimi = localStorage.getItem('kirjautunut'); 
        let tallennettuData = JSON.parse(localStorage.getItem('käyttäjät') || '[]');
        
        let foundUser = tallennettuData.find(user => user.nimi === nimi);

        if (foundUser) {
            let images = foundUser.images;

            // Set image URLs to preview elements
            const previewImage1 = document.getElementById('kuva1');
            const previewImage2 = document.getElementById('kuva2');
            const previewImage3 = document.getElementById('kuva3');

            if (images && images.length <= 3) {
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
        console.log("hehe");
            


    }
});


function palaa(){
    window.location.href = 'swipe.html';
    
}


function tallenna() {
    let loggedUserName = localStorage.getItem('kirjautunut');
    let käyttäjät = JSON.parse(localStorage.getItem('käyttäjät')) || [];
    let loggedUserIndex = käyttäjät.findIndex(user => user.nimi === loggedUserName);

    if (loggedUserIndex === -1) {
        console.log('User not logged in or found.');
        return;
    }

    let loggedUser = käyttäjät[loggedUserIndex];

    // Get the updated email value from the input field
    let newEmail = document.getElementById('sposti1').value;

    // Get the updated 'kerro itsestäsi' value from the input field
    let newAbout = document.getElementById('uuskerro').value;

    // Update the 'sahkoposti' and 'kerro' fields for the logged-in user with the new values
    loggedUser.sahkoposti = newEmail;
    loggedUser.kerro = newAbout;

    // Get all input elements of type file for profile pictures
    const inputElements = document.querySelectorAll('input[type="file"][id^="uuskuva"]');

    // Loop through each input file element
    inputElements.forEach((input, index) => {
        if (input.files && input.files[0] && index < 3) { // Consider only the first three inputs
            const image = input.files[0];
            const reader = new FileReader();
            var profile = JSON.parse(localStorage.getItem('yourProfile'));

            reader.onload = function(event) {
                // Save the image URLs directly at the respective indexes
                loggedUser.images[index] = event.target.result;

                // Update the corresponding preview image if needed
                const previewImage = document.getElementById(`kuva${index + 1}`);
                if (previewImage) {
                    previewImage.setAttribute('src', loggedUser.images[index]);
                }
                profile[0].images[0] = loggedUser.images[0];
                localStorage.setItem('yourProfile', JSON.stringify(profile));
                console.log(`Profile picture ${index + 1} updated for ${loggedUserName}`);

                // Store the modified user data back in the 'käyttäjät' array
                käyttäjät[loggedUserIndex] = loggedUser;

                // Update the 'käyttäjät' array in the local storage
                localStorage.setItem('käyttäjät', JSON.stringify(käyttäjät));
            };

            reader.readAsDataURL(image);
        }
    });

    // Update other user data as needed...

    // Store the 'käyttäjät' array back in local storage after all updates
    localStorage.setItem('käyttäjät', JSON.stringify(käyttäjät));
}