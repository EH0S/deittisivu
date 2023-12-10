import testingProfiles, { getMessageCount, storedProfiles } from './shared.js';
import {findProfileByIndex} from './shared.js';
import {pushNotify} from './userHandle.js';
import {updateChatMessagesDisplay} from './logic.js';
import { getLatestMessage } from './shared.js';
import {storedYourProfile} from './shared.js';
import {enableAttention} from './shared.js';
import {enableLogs} from './shared.js';

let isAttentionCheckInProgress = false;

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

const randomAnswer = [
    "kiva",
    "selvä juttu",
    "lol okei",
    "joo",
    "juup",
    "asia selvä",
    "ju",
];


let triggers = [
    [
        new RegExp("moi|hei|moro|terve", 'gi'),
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
        new RegExp("kyllä|joo|hyvin|huonosti|ihan|tässä|ei|voi|mikä|just|menossa", 'gi'),
        [   
            "okeeiii",
            "sama!",
            "uu okeii",
            "juu",
            "jups",
            "kiva kuulla :D",
        ]
    ],
    [
        new RegExp("mitäs|mitä sä|^mitäs", 'gi'),
        [   "En kummosta", 
            "Kattelen et kui komee sä oot :)",
            
        ]
    ],
    [
        new RegExp("kiitos|^kii|thx", 'gi'),
        [
            "no annatkos sun puhelinnumeron", 
            `et varmaan ole sinkku kun noin komia olet, ${storedYourProfile[0].firstname} :)`
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
    pushNotify(contact,message)
    
    //console.log("hihihh", storedProfiles.findIndex(contact));
    if (enableAttention && isAttentionCheckInProgress === false){
        attentionCheck(contact);
    }
    
}
export {startConversation}
// TODO: LOGIC TO DETERMINE STUFF

function attentionCheck(contact){
    
    const attentionTime = 20;
    
    
    isAttentionCheckInProgress = true;
    setTimeout(() => {
        let contactMsgCount = getMessageCount(contact);
        let yourMsgCount = getMessageCount(contact,storedYourProfile[0].nimi);
            if (yourMsgCount === contactMsgCount || yourMsgCount < contactMsgCount){
                if (enableLogs){
                    console.log("yourmsgCount:",getMessageCount(contact,storedYourProfile[0].nimi));
                    console.log("contactmsgCount:",getMessageCount(contact));
                }
                
                sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
                contactMsgCount += 1;
                console.log("yourmsgCount:",yourMsgCount);
                    console.log("contactmsgCount:",contactMsgCount);
                isAttentionCheckInProgress = false; 
                setTimeout(() => {

                    if (yourMsgCount === contactMsgCount || yourMsgCount < contactMsgCount){
                        for (var i = 0; i < Math.floor(Math.random() * 15) + 4; i++) {
                            setTimeout(() => {
                                sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
                            }, Math.floor(Math.random() * 10000) + 3000);
                            
                        }
                    }
                }, 5000); 
                return
            }   

            if (yourMsgCount < contactMsgCount){

            }            

            isAttentionCheckInProgress = false; 
            
              
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
    
    return  randomAnswer[Math.floor(Math.random() * randomAnswer.length)]    
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
    let storedProfiles = JSON.parse(localStorage.getItem('Profiles'));
    //testingProfiles[Math.floor(Math.random() * testingProfiles.length)].username;
    if (enableAttention){
        return storedProfiles[0].firstname;
    }
    console.log(storedProfiles)
    // selects the latest profile that you have matched with.

    if (storedProfiles.length > 1){
        return storedProfiles[storedProfiles.length -1].firstname;
    }
    else {
        return storedProfiles[0].firstname; 
    }

    // selects random one
    //storedProfiles[Math.floor(Math.random() * storedProfiles.length)].firstname;
    
    
}
export {determineContact};

function botMessages(contact) {
   // let contact = //determineContact();
    var message = determineMessage(getLatestMessage(contact,storedYourProfile[0].nimi),);
    if (enableAttention && isAttentionCheckInProgress === false){
        if (enableLogs){
        console.log("triggered attentionCheck");
        }
        attentionCheck(contact);
    }
    
    
    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');

    chatData.push({
        sender: contact,
        message: message,
        timestamp: new Date().toISOString()
    });

    
    
    
    
    setTimeout(() => {
        const contactMessageDiv = document.createElement('div');
        contactMessageDiv.classList.add('contact-message');
    
        const dotsContainer = document.createElement('section');
        dotsContainer.classList.add('dots-container');
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dotsContainer.appendChild(dot);
        }
    
        var chatMessagesDiv = document.getElementById('chatMessages-' + contact);
        chatMessagesDiv.appendChild(contactMessageDiv);
        contactMessageDiv.appendChild(dotsContainer);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }, 1500);

    setTimeout(() => {
    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));
    updateChatMessagesDisplay(contact);
    pushNotify(contact, message);
    }, Math.floor(Math.random() * 7000) + 2000);
    
    
}
export {botMessages}

