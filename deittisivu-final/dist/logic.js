let testButton = document.getElementById('test');
import testingProfiles, { enableAttention } from './shared.js';
import { storedProfiles } from './shared.js';
import {findProfileByIndex} from './shared.js';
import {filterChatByName} from './shared.js';
import { getLatestMessage } from './shared.js';
import {botMessages} from './botLogic.js'
import { storedYourProfile } from './shared.js';
import {enableLogs} from './shared.js';
import { getMessageCount } from './shared.js';
import {test,userHasRespondedSinceCheck} from './shared.js';


// This function opens the chat window for a specific contact.
function openChat(contact) {
  // Get the chat window for the specified contact.
  var chatWindow = document.getElementById(storedYourProfile[0].nimi+'-chat-' + contact);

  // Hide all other chat windows.
  const chatWindows = document.getElementsByClassName('chat-window');
  for (let i = 0; i < chatWindows.length; i++) {
    chatWindows[i].style.display = 'none';
  }

  // Show the chat window for the specified contact.
  chatWindow.style.display = 'block';

  // Update the chat messages display.
  updateChatMessagesDisplay(contact);

  if (enableLogs) {
    console.log(filterChatByName(contact,`${storedYourProfile[0].nimi}`));
    //console.log(getLatestMessage(contact,yourProfile[0].username))
    //console.log(getMessageCount(contact));
  }
}
export {openChat};

// This function loads the chats for a specific contact.
function loadChats(contact){

  // Get the chat window for the specified contact.
  var chatWindow = document.getElementById('chat-' + contact);

  // If the chat window does not exist, create it.
  if (!chatWindow) {
    chatWindow = document.createElement('div');
    chatWindow.setAttribute('id', storedYourProfile[0].nimi+'-chat-' + contact);
    chatWindow.classList.add('chat-window');

    // Create a header for the chat window.
    var chatHeader = document.createElement("h2");
    chatHeader.textContent = "Keskustelu - " + contact;
    chatWindow.appendChild(chatHeader);

    // Create a div to hold the chat messages.
    var chatMessagesDiv = document.createElement("div");
    chatMessagesDiv.classList.add('chat-messages');
    chatMessagesDiv.id = storedYourProfile[0].nimi + '-chatMessages-' + contact;
    chatWindow.appendChild(chatMessagesDiv);

    // Create a div to hold the chat input.
    var chatInput = document.createElement("div");
    chatInput.classList.add("search-label");

    // Create a form to hold the chat input and send button.
    var formElement = document.createElement("form"); 

    // Create an input element for the chat input.
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "text";
    inputElement.classList.add("input");
    inputElement.id = storedYourProfile[0].nimi + '-chatInput-' + contact;
    inputElement.placeholder = "Kirjoita tähän...";

    // Create a send button for the chat input.
    var sendButton = document.createElement("button");
    sendButton.textContent = "→";
    sendButton.type = "submit"; 
    sendButton.classList.add("sendBtn");

    // Add an onclick event listener to the send button.
    sendButton.onclick = function() {
      event.preventDefault();
      if (inputElement.value.length > 0){
        appendMessage(contact);
        botMessages(contact);
      }
      else {
        console.log("empty input");
      }
      
    };

    // Add the input element and send button to the form.
    formElement.appendChild(inputElement); 
    formElement.appendChild(sendButton); 

    // Add the form to the chat input div.
    chatInput.appendChild(formElement);

    // Add the chat input div to the chat window.
    chatWindow.appendChild(chatInput);

    // Add the chat window to the chat container.
    document.getElementById('chat-container').appendChild(chatWindow);
  }

  // Display the latest contact chat if it is the last contact in the storedProfiles array.
  if(findProfileByIndex(contact) == storedProfiles.length -1){
    chatWindow.style.display = 'block';

    updateChatMessagesDisplay(contact);
  }
}
export {loadChats}



// This function appends a new message to the chat window for a specific contact.
function appendMessage(contact) {
  // Get the input element for the chat input.
  var inputElement = document.getElementById(storedYourProfile[0].nimi+'-chatInput-' + contact);
  // Get the message from the input element.
  var message = inputElement.value;

  inputElement.value = '';

  if (message.trim() === '') return;

  // Get the chat data for the specified contact.
  var chatData = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact) || '[]');

  // Add the new message to the chat data.
  chatData.push({
    sender: `${storedYourProfile[0].nimi}`,
    message: message,
    timestamp: new Date().toISOString()
  });

  // Save the updated chat data to localStorage.
  localStorage.setItem(storedYourProfile[0].nimi+'-chat-' + contact, JSON.stringify(chatData));

  // Update the chat messages display.
  updateChatMessagesDisplay(contact);
  if (enableAttention){
    test.bool = true;
  }
  
}

// Update messages
function updateChatMessagesDisplay(contact) {
  // Get the current date.
  var today = new Date();

  // Get the date string for the current day.
  var todayStr = today.toDateString();

  // Get the chat messages div for the specified contact.
  var chatMessagesDiv = document.getElementById(storedYourProfile[0].nimi+'-chatMessages-' + contact);

  // Get the chat data for the specified contact.
  var chatData = JSON.parse(localStorage.getItem(storedYourProfile[0].nimi+'-chat-' + contact) || '[]');

  // Create an HTML string for each chat message in the chatData array.
  chatMessagesDiv.innerHTML = chatData.map(msg => {
    var msgDate = new Date(msg.timestamp);
    var displayTime;

    if (msgDate.toDateString() === todayStr) {
      
      displayTime = 'Tänään klo ' + msgDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      
      displayTime = msgDate.toLocaleString();
    }
            var pfpUrl, messageClass;
    if (msg.sender === `${storedYourProfile[0].nimi}`) {
      pfpUrl = storedYourProfile[0].images[0];
      messageClass = 'my-message'; 
    } else {
      pfpUrl = storedProfiles[findProfileByIndex(contact)].pics[0];
      messageClass = 'contact-message';
    }

    return `<div class="${messageClass}">
            <p>
                <small class="date">${displayTime}</small><br>
                ${msg.sender !== `${storedYourProfile[0].nimi}` ? `<img src="${pfpUrl}" class="chatPfp">` : ''}

                ${msg.sender === `${storedYourProfile[0].nimi}` ? ` ${msg.message} ` : `${contact}: ${msg.message}`}
                ${msg.sender === `${storedYourProfile[0].nimi}` ? `<img  src="${pfpUrl}" class="chatPfp">` : ''}
            </p>
        </div>`;
        
            
    }).join('');

  // Scroll the chat messages div to the bottom.
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}


export {updateChatMessagesDisplay}
