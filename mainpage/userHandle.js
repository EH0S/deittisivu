const testingProfiles = [
    { username: 'Pekka', pfp: 'https://media.discordapp.net/attachments/433293359054979073/1176216959306711090/9b9f5fad41266773.png?ex=656e1068&is=655b9b68&hm=0fde4c573f381801c9cdf217ea9db0e0215ed4a8b52a7e366215872a701874e6&=&format=webp' },
    { username: 'Alrefo', pfp: 'https://cdn.discordapp.com/attachments/433293359054979073/1177707711748649063/9k.png?' },
    { username: 'Jussi', pfp: 'https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701' },
];
export default testingProfiles;
import logic from './logic.js';
const openChat = logic.openChat;

import { determineMessage} from './botLogic.js';
import { determineContact} from './botLogic.js';




for (var i = 0; i < testingProfiles.length; i++) {
    createContact(testingProfiles[i].username, testingProfiles[i].pfp);
}

function createContact(username, pfp) {
    
    let contact = document.createElement('div');
    contact.classList.add('contact');

    let img = document.createElement('img');
    img.src = pfp;
    img.style.width = '50px';
    img.style.height = '60px';
    img.style.borderRadius = '10px';
    

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


function botMessages(){
    let contact = determineContact();


    var chatMessages = document.getElementById('chatMessages-' + contact);
    var message = determineMessage();
    chatMessages.innerHTML += `
    <p>${contact}: ${message}</p>`;

    localStorage.setItem('chat-' + contact, chatMessages.innerHTML);
    pushNotify(contact,message);
}
testButton.onclick = function () {
    botMessages();

};
export {botMessages};


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