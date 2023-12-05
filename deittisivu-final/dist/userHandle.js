
import testingProfiles from './shared.js';

import {openChat} from './logic.js'


import { determineMessage} from './botLogic.js';
import { determineContact} from './botLogic.js';
import { updateChatMessagesDisplay } from './logic.js';

import { getLatestMessage } from './shared.js';
import { yourProfile } from './shared.js';
import { startConversation } from './botLogic.js';
import { botMessages } from './botLogic.js';
import {loadChats} from './logic.js';


// reversing array
for (var i = testingProfiles.length - 1; i >= 0; i--) {
    loadChats(testingProfiles[i].username);
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
        //loadChats(username)
    };
    //openChat(username);
    contact.appendChild(img);
    contact.appendChild(usernameSpan);
    
    document.getElementById('sidebar').appendChild(contact);
}

let testButton = document.getElementById('test');
let startButton = document.getElementById('start');






testButton.onclick = function() {
    //botMessages();
    
}
startButton.onclick = function(){
    // this function will execute when new match is found
    startConversation(determineContact());
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

export {pushNotify}
