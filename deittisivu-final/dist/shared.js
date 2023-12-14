let testingProfiles = [
    { firstname: 'Teppo', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216959306711090/9b9f5fad41266773.png?ex=656e1068&is=655b9b68&hm=0fde4c573f381801c9cdf217ea9db0e0215ed4a8b52a7e366215872a701874e6&=&format=webp'] },
    { firstname: 'Alrefo', pics: ['https://cdn.discordapp.com/attachments/433293359054979073/1177707711748649063/9k.png?'] },
    { firstname: 'Jussi', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
    { firstname: 'Matti', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
    { firstname: 'Matias', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
];
export default testingProfiles;

// enable testingProfiles:
//localStorage.setItem('Profiles', JSON.stringify(testingProfiles));
let storedYourProfile = JSON.parse(localStorage.getItem('yourProfile'));




export {storedYourProfile}

let storedProfiles = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-Profiles'));




export {storedProfiles};


// enable attentionCheck for contact
const enableAttention = false; 
export {enableAttention}
const enableLogs = true;
export {enableLogs}




//disable this when linking your actual profile
// enable to enable the premade profile for your account
//localStorage.setItem('yourProfile', JSON.stringify(yourProfile));
//





function findProfileByIndex(contact){
    return storedProfiles.findIndex(item => item.firstname === contact);
}
export {findProfileByIndex};

function filterChatByName(contact,victim){
    let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);
    
    if (storedData) {
        let loadMessages = JSON.parse(storedData);
        
        if (Array.isArray(loadMessages)) {
            let filteredMessages = loadMessages.filter(message => message.sender === contact);
            
            let messages = filteredMessages.map(msg => msg.message);
            let sentMessages = `${contact} has sent ` + (loadMessages.filter(message => message.sender === contact).length) + ` messages \n----------\n${contact}'s messages: \n${messages} \n----------\n\n`
            
           let yourMessages = loadMessages.filter(message => message.sender === victim);
           let yourSentMessagesString = yourMessages.map(msg => msg.message)
           let yourLatestMessage = yourSentMessagesString[yourSentMessagesString.length - 1]
           if (yourSentMessagesString.length < 1){
            yourSentMessagesString = 'NONE';
            return sentMessages;
           }
           let yourSentMessages = `${victim}'s messages: \n----------\n${yourSentMessagesString}\n----------\nLatest message:\n----------\n` + yourLatestMessage
            return sentMessages + yourSentMessages;
        } else {
            console.log('Loaded data is not an array');
            return []; 
        }
    } else {
        console.log('No chat data found for', contact);
        return []; 
    }
}
export {filterChatByName}
function getLatestMessage(contact,victim){
    let target;
    let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);
    if (storedData){
        let loadMessages = JSON.parse(storedData);
        if (victim === undefined){
            target = contact;
        }
        else {
            target = victim;
        }
        let yourMessages = loadMessages.filter(message => message.sender === target);
        let yourSentMessagesString = yourMessages.map(msg => msg.message)
        let yourLatestMessage = yourSentMessagesString[yourSentMessagesString.length - 1]
    return yourLatestMessage;
    }
    
}
export {getLatestMessage}

function getMessageCount(contact,victim){
    let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);
    let target;
    if (storedData){
        let loadMessages = JSON.parse(storedData);
        if (victim === undefined){
            target = contact;
        }
        else{
            target = victim;
        }
        let messageCount = loadMessages.filter(message => message.sender === target).length;
    return messageCount;
    }
}
export {getMessageCount}
