

let testButton = document.getElementById('test');
import testingProfiles from './shared.js';
import { storedProfiles } from './shared.js';
import {findProfileByIndex} from './shared.js';
import {filterChatByName} from './shared.js';
import { getLatestMessage } from './shared.js';
import {botMessages} from './botLogic.js'
import { storedYourProfile } from './shared.js';
import {enableLogs} from './shared.js';
import { getMessageCount } from './shared.js';


function openChat(contact) {
   
    var chatWindow = document.getElementById('chat-' + contact);
    const chatWindows = document.getElementsByClassName('chat-window');
    for (let i = 0; i < chatWindows.length; i++) {
        chatWindows[i].style.display = 'none';
        //console.log("hiding chat window...",chatWindows[i])
    }

    chatWindow.style.display = 'block';
    //console.log(contact+"'s index in array is",findProfileByIndex(contact));
   
    updateChatMessagesDisplay(contact);
    if (enableLogs){
    
    console.log(filterChatByName(contact,`${storedYourProfile[0].nimi}`));
    //console.log(getLatestMessage(contact,yourProfile[0].username))
    //console.log(getMessageCount(contact));
    }
}
export {openChat};

function loadChats(contact){

        var chatWindow = document.getElementById('chat-' + contact);

        if (!chatWindow) {
            chatWindow = document.createElement('div');
            chatWindow.setAttribute('id', 'chat-' + contact);
            chatWindow.classList.add('chat-window');
    
            var chatHeader = document.createElement("h2");
            chatHeader.textContent = "Keskustelu - " + contact;
            chatWindow.appendChild(chatHeader);
    
            var chatMessagesDiv = document.createElement("div");
            chatMessagesDiv.classList.add('chat-messages');
            chatMessagesDiv.id = 'chatMessages-' + contact;
            chatWindow.appendChild(chatMessagesDiv);
    

            
            var chatInput = document.createElement("div");
            chatInput.classList.add("search-label");

            var formElement = document.createElement("form"); 

            var inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.name = "text";
            inputElement.classList.add("input");
            inputElement.id = 'chatInput-' + contact;
            inputElement.placeholder = "Kirjoita tähän...";
            
            

            var sendButton = document.createElement("button");
            sendButton.textContent = "→";
            sendButton.type = "submit"; 
            sendButton.classList.add("sendBtn");
           
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
            

            formElement.appendChild(inputElement); 
            formElement.appendChild(sendButton); 

            chatInput.appendChild(formElement);

            chatWindow.appendChild(chatInput);
    
            document.getElementById('chat-container').appendChild(chatWindow);
            
        }
    
        console.log(contact+"'s index in array is",findProfileByIndex(contact));

        // display latest contact chat
        if(findProfileByIndex(contact) == storedProfiles.length -1){
            chatWindow.style.display = 'block';

            updateChatMessagesDisplay(contact);
        }
       
}
export {loadChats}

// OLD CODE
// function appendMessage(contact) {
//     var message = document.getElementById('chatInput-' + contact).value;
//     var chatMessages = document.getElementById('chatMessages-' + contact);

//     chatMessages.innerHTML += `
    
//     <p>Sinä: ${message}</p>`;
//     document.getElementById('chatInput-' + contact).value = '';

//     // Save the updated chat data to localStorage
//     localStorage.setItem('chat-' + contact, chatMessages.innerHTML);
// }


function appendMessage(contact) {
    var inputElement = document.getElementById('chatInput-' + contact);
    var message = inputElement.value;
    inputElement.value = '';

    if (message.trim() === '') return;

    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');
    chatData.push({
        sender: `${storedYourProfile[0].nimi}`,
        message: message,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem('chat-' + contact, JSON.stringify(chatData));
    updateChatMessagesDisplay(contact);
    
}


function updateChatMessagesDisplay(contact) {
    
    var today = new Date();
    var todayStr = today.toDateString();
    var chatMessagesDiv = document.getElementById('chatMessages-' + contact);
    var chatData = JSON.parse(localStorage.getItem('chat-' + contact) || '[]');
    
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
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}


export {updateChatMessagesDisplay}