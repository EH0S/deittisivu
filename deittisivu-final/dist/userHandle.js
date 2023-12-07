
import testingProfiles from './shared.js';
import { storedProfiles } from './shared.js';
import {openChat} from './logic.js'


import { determineMessage} from './botLogic.js';
import { determineContact} from './botLogic.js';
import { updateChatMessagesDisplay } from './logic.js';

import { getLatestMessage } from './shared.js';
import { storedYourProfile } from './shared.js';
import { startConversation } from './botLogic.js';
import { botMessages } from './botLogic.js';
import {loadChats} from './logic.js';





document.addEventListener("DOMContentLoaded", function() {
   
    if (window.location.href.endsWith("chat.html")) {
       
        console.log("This is chat.html");
        // reversing array
        for (var i = storedProfiles.length - 1; i >= 0; i--) {
            loadChats(storedProfiles[i].firstname);
            createContact(storedProfiles[i].firstname, storedProfiles[i].pics);
        
        }
        let testButton = document.getElementById('test');
        let startButton = document.getElementById('start');






testButton.onclick = function() {
    
    
}
startButton.onclick = function(){
    // this function will execute when new match is found
    startConversation(determineContact());
}
    }

    
});




function createContact(firstname, pics) {
    
    let contact = document.createElement('div');
    contact.classList.add('contact');

    let img = document.createElement('img');
    img.src = pics[0];
    img.style.width = '40px';
    img.style.height = '45px';
    img.style.borderRadius = '15px';

    
    

    let usernameSpan = document.createElement('span');
    usernameSpan.textContent = firstname;
    usernameSpan.style.paddingLeft = '15px';

    
    contact.onclick = function() {
        openChat(firstname);
        //loadChats(username)
    };
    //openChat(username);
    contact.appendChild(img);
    contact.appendChild(usernameSpan);
    
    document.getElementById('sidebar').appendChild(contact);
}




function pushNotify(firstname,message) {
    new Notify({
      status: 'info',
      title: 'Uusi viesti!',
      text: `${firstname}: ${message}`,
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
