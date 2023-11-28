
import testingProfiles from './shared.js';
import logic from './logic.js';
const openChat = logic.openChat;



import { determineMessage} from './botLogic.js';
import { determineContact} from './botLogic.js';
import { updateChatMessagesDisplay } from './logic.js';







for (var i = 0; i < testingProfiles.length; i++) {
    createContact(testingProfiles[i].username, testingProfiles[i].pfp);
}

function createContact(username, pfp) {
    
    let contact = document.createElement('div');
    contact.classList.add('contact');

    let img = document.createElement('img');
    img.src = pfp;
    img.style.width = '40px';
    img.style.height = '45px';
    img.style.borderRadius = '15px';
    

    let usernameSpan = document.createElement('span');
    usernameSpan.textContent = username;
    usernameSpan.style.paddingLeft = '15px';

    
    contact.onclick = function() {
        openChat(username);
    };
    openChat(username);
    contact.appendChild(img);
    contact.appendChild(usernameSpan);
    
    document.getElementById('sidebar').appendChild(contact);
}

let testButton = document.getElementById('test');


function botMessages() {
    let contact = determineContact();
    var message = determineMessage();

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
export default {botMessages};

testButton.onclick = function() {
    botMessages();
}


function pushNotify(username,message) {
    new Notify({
      status: 'info',
      title: 'Uusi viesti!',
      text: `${username}: ${message}`,
      effect: 'fade',
      speed: 3,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 5000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'x-center '
    })
  }