import testingProfiles, { getMessageCount } from './shared.js';
import {findProfileByIndex} from './shared.js';
import {pushNotify} from './userHandle.js';
import {updateChatMessagesDisplay} from './logic.js';
import { getLatestMessage } from './shared.js';
import {storedYourProfile} from './shared.js';
import {enableAttention} from './shared.js';
import {enableLogs} from './shared.js';

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
            `et varmaan ole sinkku kun noin komia olet, ${storedYourProfile[0].username} :)`
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
    console.log("hihihh", testingProfiles.findIndex(contact));
    if (enableAttention){
        attentionCheck(contact);
    }
    
}
export {startConversation}
// TODO: LOGIC TO DETERMINE STUFF

function attentionCheck(contact){
    const attentionTime = 5;
    let yourMsgCount = getMessageCount(contact,storedYourProfile[0].username);
    let contactMsgCount = getMessageCount(contact);
    setTimeout(() => {
            if (yourMsgCount !== contactMsgCount){
                if (enableLogs){
                    console.log("yourmsgCount:",getMessageCount(contact,storedYourProfile[0].username));
                    console.log("contactmsgCount:",getMessageCount(contact));
                }
                
                sendBotMsg(contact,insultsTable[Math.floor(Math.random() * insultsTable.length)]);
                return
            }    


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
    
    return  randomAnswer[Math.floor(Math.random() * randomAnswer.length)]     //"En ole varma, miten vastata tähän.";
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
    if (enableAttention){
        return testingProfiles[0].username;
    }
    return testingProfiles[Math.floor(Math.random() * testingProfiles.length)].username;
    
    
}
export {determineContact};

function botMessages(contact) {
   // let contact = //determineContact();
    var message = determineMessage(getLatestMessage(contact,storedYourProfile[0].username),);
    if (enableAttention){
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

    
    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));

    updateChatMessagesDisplay(contact);
    pushNotify(contact, message);
}
export {botMessages}