import testingProfiles from './shared.js';
import {findProfileByIndex} from './shared.js';
import {pushNotify} from './userHandle.js';
import {updateChatMessagesDisplay} from './logic.js';
import { getLatestMessage } from './shared.js';
import {yourProfile} from './shared.js';

const greetingsTable = [
    "moiksuuu",
    "ootpäs sä komee :O",
    "kiva bio sulla :)",
    "moiii mite menee?",
];

const insultsTable = [
    "vastaaks?",
    "huhuu onkos sielä ketään?",
    "ei sitte ku ignoraat. En ois sunkaa halunnukkaa jutella!",
];


let triggers = [
    [
        new RegExp(".*miten (päiväsi? on mennyt|päiväs meni).*|.*oliko (hyvä|kiva) päivä.*|.*kuis sun päivä.*", 'gi'),
        [
            "Päiväni on mennyt hyvin, kiitos kysymästä!", 
            "Melko kiireinen, mutta kaikki hyvin!"
        ]
    ],
    [
        new RegExp(".*miten voit.*|.*kaikki hyvin.*|.*voitko hyvin.*|.*kuis menee.*", 'gi'),
        [   "Voin hyvin, kiitos! Entä sinä?", 
            "Kaikki hyvin, kiitos kysymästä!"
        ]
    ],
    [
        new RegExp(".*mitä suunnitelmia (sinulla on|sulla on).*|.*onko (sinulla|sulla) suunnitelmia (tänään|tänä päivänä).*|.*mitäs tänään.*", 'gi'),
        [   "Vain tavallista työtä. Entä sinä?", 
            "Ei paljon, vain rentoutumista. Entä sinulla?"
        ]
    ],
    [
        new RegExp(".*miltä sää (näyttää|vaikuttaa).*|.*onko ulkona (kylmä|kuuma).*|.*sataako (ulkona|siellä).*|.*millanen sää on.*", 'gi'),
        [
            "Sää näyttää melko mukavalta. Aurinkoista ja lämmintä!", 
            "Näyttäisi siltä, että saattaa sataa myöhemmin."
        ]
    ],
    [
        new RegExp(".*oletko kiireinen.*|.*onko (sulla|sinulla) paljon tekemistä.*|.*pystytkö juttelemaan.*", 'gi'),
        [
            "Hieman kiireinen juuri nyt, mutta mitä halusit?", 
            "Ei kovin kiire, mitä mietit?"
        ]
    ],
    
];


function startConversation(contact){
    var message = greetingsTable[Math.floor(Math.random() * greetingsTable.length)];
    
    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');

    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    
    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));

    updateChatMessagesDisplay(contact);

    pushNotify(contact, message);
    attentionCheck(contact);
}
export {startConversation}
// TODO: LOGIC TO DETERMINE STUFF

function attentionCheck(contact){
    const attentionTime = 5;
    setTimeout(() => {
        if (getLatestMessage(contact,yourProfile[0].username) === undefined){
            sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
            //console.log("no past messages from juha");
            return
        }

        setTimeout(() => {
            if (getLatestMessage(contact,yourProfile[0].username) !== getLatestMessage(contact)){
                sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
                return
            }    
        }, attentionTime * 1000);
        




        //console.log("HIHII",getLatestMessage(contact,yourProfile[0].username));
    }, attentionTime * 1000);
    
}
export {attentionCheck}


function determineMessage(message) {
    for (let i = 0; i < triggers.length; i++) {
        let [regex, responses] = triggers[i];

        if (regex.test(message)) {
            let responseIndex = Math.floor(Math.random() * responses.length);
            
            return responses[responseIndex];
        }
    }
    
    return "En ole varma, miten vastata tähän.";
}
export {determineMessage};


function sendBotMsg(contact,msg){
    var message = msg;
    
    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');

    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    
    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));

    updateChatMessagesDisplay(contact);

    pushNotify(contact, message);
}
export {sendBotMsg};

function determineContact() {
    //testingProfiles[Math.floor(Math.random() * testingProfiles.length)].username;
    return testingProfiles[0].username;
    
}
export {determineContact};

function botMessages() {
    let contact = determineContact();
    var message = determineMessage(getLatestMessage(contact,yourProfile[0].username),);
    attentionCheck(contact);
    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');

    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    
    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));

    updateChatMessagesDisplay(contact);

    pushNotify(contact, message);
}
export {botMessages}