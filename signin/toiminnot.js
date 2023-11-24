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
    let sana = document.getElementById("uusiSalasana").value;
    if(nimi.length < 3 || nimi.length > 20 || nimi.includes(" ") || nimi.includes(";") || nimi.includes("&") || nimi.includes("*") || nimi.includes("¤")){
        inforuutu.innerHTML = " Nimen minimipituus on 3 ja maksimipituus 20 merkkiä. Älä käytä välilyöntiä, puolipistettä, &-, ¤- tai *-merkkejä.";
        document.getElementById("uusiKayttajaNimi").value = "";
    }  else if(sana.length < 3 || sana.includes(";")){
        inforuutu.innerHTML = "Salasanassa tulee olla vähintään 3 merkkiä eikä se saa sisältää puolipisteitä. Sen maksimipituus on 10 merkkiä.";
        document.getElementById("uusiSalasana").value = "";
    } else {
        localStorage.setItem(nimi, nimi);
        localStorage.setItem(nimi + ";&", rooli);
        localStorage.setItem(nimi + ";*", sana);
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
    document.getElementById("aanestajanEtusivu").style.display = "none";
    document.getElementById("yllapitajanEtusivu").style.display = "none";
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
