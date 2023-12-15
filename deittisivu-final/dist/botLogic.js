import testingProfiles, { getMessageCount, storedProfiles } from './shared.js';
import {findProfileByIndex} from './shared.js';
import {pushNotify} from './userHandle.js';
import {updateChatMessagesDisplay} from './logic.js';
import { getLatestMessage } from './shared.js';
import {storedYourProfile} from './shared.js';
import {enableAttention} from './shared.js';
import {enableLogs} from './shared.js';
import {playSound} from './shared.js';
import {test,userHasRespondedSinceCheck} from './shared.js';
let isAttentionCheckInProgress = false;

const greetingsTable = [
    "moiksuuu",
    "ootpäs sä komee :O",
    "kiva bio sulla :)",
    "moiii mite menee?",
    "hei sinä siellä!",
    "moikka, mitä kuuluu?",
    "hauska nähdä sinut täällä!",
    "hei, miten päiväsi on sujunut?",
    "tere! miten menee?",
    "moi, ootpa pirteän näköinen tänään!",
    "no moi! mitäs sinulle?",
    "tervehdys!",
    "heippa, miten voit?",
    "moikka moi, kaikki hyvin?",
];


const insultsTable = [
    "vastaaks?",
    "huhuu onkos sielä ketään?",
    "ei sitte ku ignoraat. En ois sunkaa halunnukkaa jutella!",
    "no voi harmi, ei sitten vastata.",
    "näyttää siltä että ollaan hiljaa.",
    "no huh, kylmä vastaanotto!",
    "ei sitten jakseta jutella?",
    "joo joo, ei sitten kiinnosta.",
    "miks ei voi vaan vastata?",
    "no ei sitten, olkoon.",
];


const randomAnswer = [
    "kiva",
    "selvä juttu",
    "lol okei",
    "joo",
    "juup",
    "asia selvä",
    "ju",
    "okei sitten",
    "no niinpä",
    "juu juu",
    "ihan jees",
    "selvä homma",
    "ai jaa",
    "totta kai",
    "mielenkiintoista",
    "voi olla",
    "niinpä niin",
    "hmm, enpä tiedä",
    "mitä mieltä itse olet?",
    "no voihan pyhä mänty",
    "aivan",
    "no huhhuh",
    "hmm, pohdittavaa",
    "mielenkiintoinen näkökulma",
    "ehkäpä, ehkäpä",
    "täytyy miettiä tuota",
    "jaa-a, saa nähdä",
    "mielenkiintoista, kerro lisää",
    "voi että, nyt on jännää",
    "tuo on uusi juttu mulle",
    "voisitko selventää?",
    "hmm, en ole varma",
    "voi olla, voi olla",
    "siinäpä vasta pulma",
    "tuo on hyvä pointti",
    "en ole ihan varma, mitä ajat takaa",
    "no katsotaan miten käy",
    "täytyy miettiä tätä",
    "vai niin, mielenkiintoista",
    "no sepä kummallista",
    "ei voi tietää",
    "kyllä maailma on ihmeellinen",
    "no onpa erikoinen juttu",
    "jaa, vai että sellaista",
    "kyllä maailmassa kaikenlaista sattuu",
    "no voi, että voikin olla",
    "ei ikinä tiedä mitä elämä tuo tullessaan",
    "totta, totta",
    "no voihan vitsi",
    "joo, näinhän se menee",
    "voi juku, kylläpä nyt",
    "vai että semmoista",
    "niin kai, niin kai",
    "no niin no, mitäpä siihen sanoisi",
    "siinähän se, siinähän se",
    "no nyt on kyllä mielenkiintoiset puheet",
    "voi jessus, nyt on kyllä jännä juttu",
    "no huh, tämäpä uutta",
    "jep, jep",
    "no tottakai",
    "niinpä, niinpä",
    "kyllähän se niin menee",
    "no sepäs jotain",
    "joo-o, niin varmaan",
    "ai että, kyllä maailma yllättää",
    "no niin no, mitäs tästä nyt sanoisi",
    "niinpä tietenkin",
    "juu, niin kai se on",
    "voi, voi, mitä vielä",
    "jaa, niin se menee",
    "no niin, no niin",
    "kyllä, kyllä",
    "voi, että nyt on mielenkiintoista",
    "kappas vaan",
    "no kylläpä nyt",
    "jaa, että sellaista",
    "voi että, kyllä maailma on ihmeellinen",
    "no niinpä tietenkin",
    "ai niinkö?",
    "no jopas jotakin",
    "juu, näinhän se menee",
    "niin se on, niin se on",
    "kyllä, kyllä",
    "voi kuule, kaikenlaista",
    "jaa, niin kai",
    "no voi sentään",
    "voi, että nyt on juttu",
    "no niin, no niin",
    "jaa, sellaista",
    "kyllähän se niin menee",
    "no niin, no niin",
    "juu, niin kai",
    "voi että, kylläpä nyt",
    "no voi vitsi",
    "joo, niin varmaan",
    "ai että, kyllä maailma yllättää",
    "no niin no, mitäs tästä nyt sanoisi",
    "niinpä tietenkin",
    "juu, niin kai se on",
    "voi, voi, mitä vielä",
    "jaa, niin se menee",
    "no niin, no niin",
    "kyllä, kyllä",
    "voi, että nyt on mielenkiintoista",
    "kappas vaan",
    "no kylläpä nyt",
    "jaa, että sellaista",
    "voi että, kyllä maailma on ihmeellinen",
    "no niinpä tietenkin",
    "ai niinkö?",
    "no jopas jotakin",
];




let triggers = [
    [
        new RegExp("\\b(moi|hei|moro|terve|moikkuu|heipsulihei)\\b", 'gi'),
        [
            "miten siul menee?", 
            "miten sul menee?",
            "mitä kuuluu?",
            "kaikki hyvin?",
            "miten päiväsi on mennyt?",
            "kuinka voit?",
            "mikä meno?",
            "mikä fiilis?",
            "hauska tavata sinut!",
            "mikä sinut tuo tänne?",
            "kuinka viikonloppusi meni?",
            "mitä suunnitelmia tälle päivälle?",
            "mikä on päivän agenda?",
        ]
    ],
    [
        new RegExp("\\b(kyllä|joo|hyvin|ihan|tässä|ei|voi|mikä|just|menossa)\\b", 'gi'),
        [
            "okeeiii",
            "sama!",
            "uu okeii",
            "juu",
            "jups",
            "kiva kuulla :D",
            "vai niin, mielenkiintoista",
            "ai jaa, kerro lisää",
            "hmm, ymmärrän",
            "no niinpä",
            "okei, kiva kuulla",
            "selvä homma",
            "ai sellaista",
            "juu, jatketaan",
            "niinpä niin, elämä on",
            "ahaa, okei",
            "no sepä jännää",
            "siis mitä, kerro lisää",
            "hmm, mietitään",
            "no huh, kuulostaa jännältä",
            "jaa, kiinnostavaa",
            "okei, ymmärrän",
            "no huhhuh",
            "selvä, kuulostaa hyvältä",
            "ai niinkö, kiva kuulla",
            "hmm, enpä ollut ajatellutkaan",
            "jep, jep",
            "no se on hyvä juttu",
            "voi, ymmärrän",
            "hmm, kuulostaa haastavalta",
            "no niin, jatketaan",
            "ai että, toivottavasti asiat järjestyvät",
            "joo, aika mielenkiintoista",
            "hmm, pitää miettiä",
            "juu, kuulostaa hyvältä",
            "okei, pidetään mielessä",
            "juu, jatketaan siitä",
            "selvä, otetaan huomioon",
            "jep, näin on",
            "no niin, mielenkiintoista",
            "juu, ymmärrän kyllä",
            "okei, kuulostaa järkevältä",
            "hmm, mielenkiintoisia ajatuksia",
            "joo, pidetään mielessä",
            "selvä, kuulostaa hyvältä",
            "okei, ymmärrän kyllä",
            "juu, kuulostaa järkevältä",
            "hmm, mielenkiintoista",
            "joo, ymmärrän",
            "selvä, kuulostaa järkevältä",
            "okei, mielenkiintoista",
        ]
    ],
    [
        new RegExp("\\b(mitäs|mitä sä|miten)\\b", 'gi'),
        [
            "En kummosta", 
            "Kattelen et kui komee sä oot :)",
        ]
    ],
    [
        new RegExp("\\b(kiitos|kii|thx)\\b", 'gi'),
        [
            "no annatkos sun puhelinnumeron", 
            `et varmaan ole sinkku kun noin komia olet, ${storedYourProfile[0].nimi} :)`
        ]
    ],
    [
        new RegExp("\\b(söpö|komea|kaunis|ihana)\\b", 'gi'),
        [
            "Voi kiitos, säkin!",
            "Lisää noita kohteliaisuuksia, tykkään!",
            "Sä oot aika suloinen itekin 😊",
            "Stop it, you're making me blush! 😄",
            "Aww, kiitos, oot ihana!",
        ]
    ],
    [
        new RegExp("\\b(harrastus|harrastaks|harrastatko|vapaa-aika|lemppari)\\b", 'gi'),
        [
            "Mä rakastan tanssimista, entä sä?",
            "Luen paljon kirjoja, mitä sä tykkäät tehdä?",
            "Elokuvat on mun juttu, sulla lempielokuva?",
            "Mä teen paljon joogaa, miten sä pidät ittes kunnossa?",
            "Ruuanlaitto on mun intohimo, osaatko kokata?",
        ]
    ],
    [
        new RegExp("\\b(hauska|vitsi|nauraa|naurattaa|lol|haha|xd)\\b", 'gi'),
        [
            "Sä oot aika hupaisa, tiedätkö sen?",
            "No toi oli hauska, missä sä opit noin hyviä vitsejä?",
            "Sä saat mut nauramaan, se on harvinaista!",
            "Ootko aina noin vitsikäs vai vain mun seurassa?",
            "Voi että, sun huumorintaju on kyllä 10/10!",
        ]
    ],
    [
        new RegExp("\\b(kaunis|upee|fantastinen|mahtava|kuuma|seksikäs)\\b", 'gi'),
        [
            "Oot niin imartelevan kohtelias, kiitos!",
            "Sinäpä vasta oot upea!",
            "Vau, sä osaat kyllä saada tytön punastumaan!",
            "Kiitos, säkin oot aika fantastinen!",
            "Olet kyllä charmikas, tiedätkö sen?",
        ]
    ],
    [
        new RegExp("\\b(väsynyt|surullinen|yksinäinen|stressaantunut|ahistaa)\\b", 'gi'),
        [
            "Halit sinulle, toivottavasti olot paranee 💕",
            "Kuulostaa rankalta, oon täällä sua varten.",
            "Jos tarvitset juttuseuraa, mä oon täällä.",
            "Voi raukka, anna kun mä piristän sua!",
            "Yhdessä me selvitään mistä vaan, muista se!",
        ]
    ],
    [
        new RegExp("\\b(suosikki|lempi|lemppari|unelma|toive)\\b", 'gi'),
        [
            "Mikä on sun suosikkiruoka? Mä rakastan pasta carbonaraa!",
            "Onko sulla lempikirjaa? Mä voisin lukea vaikka koko päivän!",
            "Mikä sun unelma-ammatin olis? Mä haaveilen kirjailijan urasta.",
            "Jos saisit yhden toiveen, mikä se olisi?",
            "Mikä on sun lempimusiikkia? Mä kuuntelen paljon poppia.",
        ]
    ],
    [
        new RegExp("\\b(uskallatko|pystytkö|voitko|voikko|haaste)\\b", 'gi'),
        [
            "Uskallatko kertoa mulle salaisen unelmasi?",
            "Pystytkö olemaan päivän ilman kännykkää? Mä en varmaan!",
            "Voitko olla nauramatta kun mä alan vitsailemaan?",
            "Haaste: kerro mulle kolme asiaa itsestäsi!",
            "Uskallatko lähteä spontaanille seikkailulle?",
        ]
    ],
    [
        new RegExp("\\b(sää|viikonloppu|päivä|ilta)\\b", 'gi'),
        [
            "Onpa tänään ihana sää, eikö? Mitä sä teet ulkona?",
            "Miten suunnittelet viettäväsi viikonlopun?",
            "Miten sun päivä on mennyt? Toivottavasti hyvin!",
            "Mitä suunnitelmia sulla on tälle illalle?",
            "Toivottavasti sää pysyy hyvänä, mitä mieltä oot?",
        ]
    ],
    [
        new RegExp("\\b(söpö|viehättävä|ihastuttava)\\b", 'gi'),
        [
            "Voi, sä olet niin söpö, kun noin sanot!",
            "Oot todella viehättävä, tiedätkö sen?",
            "Sinäpä vasta ihastuttava olet, aivan kuin auringonpaiste!",
            "Sulla on tapa saada mut hymyilemään, oot ihana!",
            "Olet niin charmikas, se on söpöä!",
        ]
    ],
    [
        new RegExp("\\b(miten menee|kuinka|kui|mitä kuuluu|kaikki hyvin)\\b", 'gi'),
        [
            "Hyvää menee, kiitos kysymästä! Entä sulle?",
            "Ihan jees, päivä on sujunut mukavasti. Mites sun päivä?",
            "Kaikki bueno, elämä hymyilee! Mitenkäs sinä?",
            "Voisin valittaa, mutta kuka jaksaa kuunnella? 😄 Entä sä?",
            "Ihan ok, kiirettä pitää. Mitenkäs sun päivät menee?",
            "Elämä on, niin kuin on. Mitä uutta sulle?",
            "Tavallista arkea, mutta se on ihan jees. Miten sä?",
            "Kyllähän tässä, selviydytään päivästä toiseen. Mitenkäs sinä?",
            "Hyvällä fiiliksellä mennään! Mitäs sinulle?",
        ]
    ],
];


// The `startConversation` function is used to start a conversation with the user.
function startConversation(contact){
    // The `var message` variable is used to store the message that the bot will send to the user.
    var message = greetingsTable[Math.floor(Math.random() * greetingsTable.length)];

    // The `var chatData` variable is used to store the chat data.
    var chatData = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact) || '[]');

    // The `chatData.push()` method is used to add a new message to the chat data.
    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    // The `localStorage.setItem()` method is used to store the chat data in local storage.
    localStorage.setItem(storedYourProfile[0].nimi+'-chat-' + contact, JSON.stringify(chatData));

    //updateChatMessagesDisplay(contact); // disable when project is completed
    setTimeout(() => {
        pushNotify(contact,message);
        playSound();
    }, 5000)

    if (enableAttention && isAttentionCheckInProgress === false){
        attentionCheck(contact);
    }
    
}
export {startConversation}

// The `attentionCheck()` function is used to check if the user is paying attention to the conversation.
function attentionCheck(contact){
    const attentionTime = 20;
    test.bool = false;
    isAttentionCheckInProgress = true;

    setTimeout(() => {
        // The `let contactMsgCount` variable is used to store the number of messages that the contact has sent.
        let contactMsgCount = getMessageCount(contact);

        // The `let yourMsgCount` variable is used to store the number of messages that the user has sent.
        let yourMsgCount = getMessageCount(contact,storedYourProfile[0].nimi);

        // The `if` statement is used to check if the number of messages that the contact has sent is greater than or equal to the number of messages that the user has sent.
        if (getMessageCount(contact,storedYourProfile[0].nimi) === getMessageCount(contact) || getMessageCount(contact,storedYourProfile[0].nimi) < getMessageCount(contact)){
            if (enableLogs){
                console.log("yourmsgCount:",getMessageCount(contact,storedYourProfile[0].nimi));
                console.log("contactmsgCount:",getMessageCount(contact));
            }
            
            // The `sendBotMsg()` function is used to send a message to the user.
            sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
            //contactMsgCount += 1;
            console.log("yourmsgCount:",getMessageCount(contact,storedYourProfile[0].nimi));
                console.log("contactmsgCount:",getMessageCount(contact));
            setTimeout(() => {
                if (test.bool === true) {
                    isAttentionCheckInProgress = false;
                    console.log("paused further checks")
                    attentionCheck(contact);
                    return;
                }
                console.log("spam go brr");
                // The `if` statement is used to check if the number of messages that the contact has sent is greater than or equal to the number of messages that the user has sent.
                if (getMessageCount(contact,storedYourProfile[0].nimi) === getMessageCount(contact) || getMessageCount(contact) > getMessageCount(contact,storedYourProfile[0].nimi)){
                    // The `for` loop is used to send a message to the user.
                    for (var i = 0; i < Math.floor(Math.random() * 15) + 3; i++) {
                        setTimeout(() => {
                            sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
                        }, Math.floor(Math.random() * 10000) + 3000);
                        
                    }
                    isAttentionCheckInProgress = false;
                }
            }, 5000); 
            return
        }   
       
        isAttentionCheckInProgress = false; 
        
          
    }, attentionTime * 1000);
    
}
export {attentionCheck}

function determineMessage(message) {
    // The `for` loop is used to iterate over the triggers array.
    for (let i = 0; i < triggers.length; i++) {
        // The `let [regex, responses]` variable is used to destructure the trigger at the current index.
        let [regex, responses] = triggers[i];

        // The `if` statement is used to check if the regex matches the message.
        if (regex.test(message)) {
            // The `let responseIndex` variable is used to store the index of the response that will be sent to the user.
            let responseIndex = Math.floor(Math.random() * responses.length);

            // The `return` statement is used to return the response that will be sent to the user.
            return responses[responseIndex];
        }
    }

    
    if (enableLogs){
        console.log("random answer triggered");
    }
    // The `return` statement is used to return a random answer.
    return  randomAnswer[Math.floor(Math.random() * randomAnswer.length)]    
}
export {determineMessage};


// The `sendBotMsg()` function is used to send a message to the user.
function sendBotMsg(contact,msg){
    var message = msg;

    // The `var chatData` variable is used to store the chat data.
    var chatData = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact) || '[]');

    // The `chatData.push()` method is used to add a new message to the chat data.
    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    // The `localStorage.setItem()` method is used to store the chat data in local storage.
    localStorage.setItem(storedYourProfile[0].nimi+'-chat-' + contact, JSON.stringify(chatData));

    // The `updateChatMessagesDisplay()` function is used to update the display of the chat messages.
    updateChatMessagesDisplay(contact);
    
    pushNotify(contact, message);
    playSound();
}
export {sendBotMsg};

// The `determineContact()` function is used to determine which contact to send a message to.
function determineContact() {
    // The `let storedProfiles` variable is used to store the list of profiles.
    let storedProfiles = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-Profiles'));

    if (enableAttention){
        return storedProfiles[0].firstname;
    }

    console.log(storedProfiles)

    if (storedProfiles.length > 1){
        return storedProfiles[storedProfiles.length -1].firstname;
    }
    else {
        return storedProfiles[0].firstname; 
    }

    //storedProfiles[Math.floor(Math.random() * storedProfiles.length)].firstname;
    
    
}
export {determineContact};

// The `botMessages()` function is used to send a message to the user.
function botMessages(contact) {
   //let contact = //determineContact();

   // The `var message` variable is used to store the message that will be sent to the user.
   var message = determineMessage(getLatestMessage(contact,storedYourProfile[0].nimi),);

   // The `if` statement is used to check if the enableAttention variable is true and if the attention check is not in progress.
   if (enableAttention && isAttentionCheckInProgress === false){
       if (enableLogs){
           console.log("triggered attentionCheck");
       }

       attentionCheck(contact);
   }
    
    // The `var chatData` variable is used to store the chat data.
    var chatData = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact) || '[]');

    // The `chatData.push()` method is used to add a new message to the chat data.
    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    
    
    
    
    setTimeout(() => {
        // The `const contactMessageDiv` variable is used to create a div element that will contain the message that will be sent to the user.
        const contactMessageDiv = document.createElement('div');
        contactMessageDiv.classList.add('contact-message');
    
        // The `const dotsContainer` variable is used to create a div element that will contain the dots that will be displayed while the message is being sent.
        const dotsContainer = document.createElement('section');
        dotsContainer.classList.add('dots-container');
        for (let i = 0; i < 5; i++) {
            // The `const dot` variable is used to create a div element that will represent a dot.
            const dot = document.createElement('div');
            dot.classList.add('dot');
            // The `dotsContainer.appendChild()` method is used to add the dot to the dots container.
            dotsContainer.appendChild(dot);
        }
    
        // The `var chatMessagesDiv` variable is used to store the div element that contains the chat messages.
        var chatMessagesDiv = document.getElementById(storedYourProfile[0].nimi+'-chatMessages-' + contact);
        // The `chatMessagesDiv.appendChild()` method is used to add the contact message div to the chat messages div.
        chatMessagesDiv.appendChild(contactMessageDiv);
        // The `contactMessageDiv.appendChild()` method is used to add the dots container to the contact message div.
        contactMessageDiv.appendChild(dotsContainer);
        // The `chatMessagesDiv.scrollTop` property is used to set the scroll position of the chat messages div to the bottom.
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }, 1500);

    setTimeout(() => {
        // The `localStorage.setItem()` method is used to store the chat data in local storage.
        localStorage.setItem(storedYourProfile[0].nimi+'-chat-' + contact, JSON.stringify(chatData));
        // The `updateChatMessagesDisplay()` function is used to update the display of the chat messages.
        updateChatMessagesDisplay(contact);
        pushNotify(contact, message);
        playSound();
    }, Math.floor(Math.random() * 7000) + 2000);
    
    
}
export {botMessages}
