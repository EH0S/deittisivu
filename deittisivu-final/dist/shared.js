let testingProfiles = [
    { firstname: 'Teppo', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216959306773.png?ex=656e1068&is=655b9b68&hm=0fde4c573f381801c9cdf217ea9db0e215ed4a8b52a7e366215872a701874e6&=&format=webp'] },
    { firstname: 'Alrefo', pics: ['https://cdn.discordapp.com/attachments/433293359054979073/1177707711748649063/9k.png?'] },
    { firstname: 'Jussi', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
    { firstname: 'Matti', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
    { firstname: 'Matias', pics: ['https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701'] },
];
export default testingProfiles;

let startButton = document.getElementById('start');
let attentionCheckBox = document.getElementById('checkAttention');

document.addEventListener("DOMContentLoaded", function() {
   
    if (window.location.href.endsWith("chat.html")) {
        attentionCheckBox.addEventListener('change', () =>{
            enableAttention = attentionCheckBox.checked;
        });
    }

    
});

let userHasRespondedSinceCheck  = false;
const test = {
    get bool(){
        return userHasRespondedSinceCheck;
    },
    set bool(value) {
        userHasRespondedSinceCheck  = value;
    }
}
export {test,userHasRespondedSinceCheck}
// This variable stores the current user's profile information.
let storedYourProfile = JSON.parse(localStorage.getItem('yourProfile'));

export {storedYourProfile}

// This variable stores the list of profiles that the current user has matched with.
let storedProfiles = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-Profiles'));

export {storedProfiles}

let enableAttention = false;
export {enableAttention}

const enableLogs = true;
export {enableLogs}

const audioPath = "./sounds/notification.mp3";


function playSound() {
  var audio = new Audio(audioPath);
  audio.play();
}
export {playSound}


// This function finds the index of a contact in the storedProfiles array.
function findProfileByIndex(contact){
  // Get the index of the contact in the storedProfiles array.
  const index = storedProfiles.findIndex(item => item.firstname === contact);

  return index;
}
export {findProfileByIndex};

// This function filters the chat messages for a specific contact by a specific victim.
function filterChatByName(contact,victim){
  // Get the stored chat data for the specified contact.
  let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);

  // If there is stored chat data, parse it into a JSON object.
  if (storedData) {
    let loadMessages = JSON.parse(storedData);

    // If the loadMessages object is an array, filter the messages by the specified contact and victim.
    if (Array.isArray(loadMessages)) {
      let filteredMessages = loadMessages.filter(message => message.sender === contact);

      // Get the messages from the filtered messages.
      let messages = filteredMessages.map(msg => msg.message);

      // Create a string that contains the number of messages sent by the contact, the contact's messages, and a separator.
      let sentMessages = `${contact} has sent ` + (loadMessages.filter(message => message.sender === contact).length) + ` messages \n----------\n${contact}'s messages: \n${messages} \n----------\n\n`;

      // Get the messages from the victim (you).
      let yourMessages = loadMessages.filter(message => message.sender === victim);

      // Get the latest message from the victim (you).
      let yourSentMessagesString = yourMessages.map(msg => msg.message);
      let yourLatestMessage = yourSentMessagesString[yourSentMessagesString.length -1];

      // If there are no messages from the victim (you), return the sent messages.
      if (yourSentMessagesString.length <1){
        yourSentMessagesString = 'NONE';
        return sentMessages;
      }

      // Create a string that contains the victim's (you) messages and a separator.
      let yourSentMessages = `${victim}'s messages: \n----------\n${yourSentMessagesString}\n----------\nLatest message:\n----------\n` + yourLatestMessage;

      // Return the sent messages and the victim's messages.
      return sentMessages + yourSentMessages;
    } else {
      // If the loadMessages object is not an array, log an error.
      console.log('Loaded data is not an array');
      return [];
    }
  } else {
    // If there is no stored chat data for the specified contact, log an error.
    console.log('No chat data found for', contact);
    return [];
  }
}
export {filterChatByName}

// This function gets the latest message from a chat for a specific contact.
function getLatestMessage(contact,victim){
  // Get the stored chat data for the specified contact.
  let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);

  // If there is stored chat data, parse it into a JSON object.
  if (storedData){
    let loadMessages = JSON.parse(storedData);

    let target;

    // If the victim is undefined, set the target to the contact.
    if (victim === undefined){
      target = contact;
    } else {
      // Otherwise, set the target to the victim.
      target = victim;
    }

    // Get the messages from the target.
    let yourMessages = loadMessages.filter(message => message.sender === target);

    // Get the latest message from the target.
    let yourSentMessagesString = yourMessages.map(msg => msg.message)
    let yourLatestMessage = yourSentMessagesString[yourSentMessagesString.length -1]

    // Return the latest message.
    return yourLatestMessage;
  }
  
}
export {getLatestMessage}

// This function gets the number of messages in a chat for a specific contact.
function getMessageCount(contact,victim){
  // Get the stored chat data for the specified contact.
  let storedData = localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact);

  // If there is stored chat data, parse it into a JSON object.
  let target;
  if (storedData){
    let loadMessages = JSON.parse(storedData);

    // Get the target contact.
    if (victim === undefined){
      target = contact;
    } else {
      target = victim;
    }

    // Get the number of messages from the target.
    let messageCount = loadMessages.filter(message => message.sender === target).length;

    // Return the number of messages.
    return messageCount;
  }
}
export {getMessageCount}


