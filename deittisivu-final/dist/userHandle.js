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
        // Reversing the array of stored profiles so that the most recently added profiles are displayed first.
        for (var i = storedProfiles.length - 1; i >= 0; i--) {
            loadChats(storedProfiles[i].firstname);
            createContact(storedProfiles[i].firstname, storedProfiles[i].pics);
        
        }
        let testButton = document.getElementById('test');
        let startButton = document.getElementById('start');

    }

    
});




function createContact(firstname, pics) {
    
    // Create a div element to represent the contact.
    let contact = document.createElement('div');
    contact.classList.add('contact');

    // Create an img element to display the contact's profile picture.
    let img = document.createElement('img');
    img.src = pics[0];
    img.style.width = '40px';
    img.style.height = '45px';
    img.style.borderRadius = '15px';

    
    

    // Create a span element to display the contact's username.
    let usernameSpan = document.createElement('span');
    usernameSpan.textContent = firstname;
    usernameSpan.style.paddingLeft = '15px';

    
    // Add an onclick event listener to the contact div so that it opens the chat window for the corresponding contact when clicked.
    contact.onclick = function() {
        openChat(firstname);
        //loadChats(username)
    };
    //openChat(username);
    // Append the img and username span elements to the contact div.
    contact.appendChild(img);
    contact.appendChild(usernameSpan);
    
    // Append the contact div to the sidebar div.
    document.getElementById('sidebar').appendChild(contact);
}




function pushNotify(firstname,message) {
    
    const popup = new Notify({
      status: 'info',
      title: 'Uusi viesti!',
      text: `${firstname}: ${message}`,
      effect: 'fade',
      speed: 3,
      customClass: 'notify',
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 5000,
      gap: 20,
      distance: 20,
      type: 1,
      position: 'x-center '
    });

    const notifyDivs = document.querySelectorAll('.notify');
    notifyDivs.forEach(div => {
        div.addEventListener('click', () => {
          console.log("opening chat for",firstname)
          openChat(firstname);
        });
      });
  }

export {pushNotify}



