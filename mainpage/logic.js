

let testButton = document.getElementById('test');
import testingProfiles from './shared.js';
import {findProfileByIndex} from './shared.js';
import { filterChatByName } from './shared.js';




const yourProfile = [
{username: 'juha', bio: 'rauhallisesti elämässä eteenpäi!', pfp: 'https://cdn.discordapp.com/attachments/952836235708235780/1095536926724997210/download.jpg?ex=656fdd45&is=655d6845&hm=e3c52f54eb263e62f90bf0d26ea7a48f4331dfc7f883b5d034d727203d350537&'}
];


function openChat(contact) {
   
    var chatWindow = document.getElementById('chat-' + contact);

    if (!chatWindow) {
        chatWindow = document.createElement('div');
        chatWindow.setAttribute('id', 'chat-' + contact);
        chatWindow.classList.add('chat-window');

        var chatHeader = document.createElement("h2");
        chatHeader.textContent = "Chat with " + contact;
        chatWindow.appendChild(chatHeader);

        var chatMessagesDiv = document.createElement("div");
        chatMessagesDiv.id = 'chatMessages-' + contact;
        chatWindow.appendChild(chatMessagesDiv);

        var chatInput = document.createElement("input");
        chatInput.type = "text";
        chatInput.id = 'chatInput-' + contact;
        chatInput.setAttribute('maxlength',60);
        chatInput.placeholder = "Type a message...";
        chatWindow.appendChild(chatInput);

        var sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.onclick = function() { appendMessage(contact); };
        chatWindow.appendChild(sendButton);

        document.getElementById('chat-container').appendChild(chatWindow);
        
    }

    const chatWindows = document.getElementsByClassName('chat-window');
    for (let i = 0; i < chatWindows.length; i++) {
        chatWindows[i].style.display = 'none';
    }

    chatWindow.style.display = 'block';

   
    updateChatMessagesDisplay(contact);
    console.log(contact+"'s index in array is",findProfileByIndex(contact));
    console.log(filterChatByName(contact,`${yourProfile[0].username}`));
}
export default {openChat};




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
        sender: `${yourProfile[0].username}`,
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
        if (msg.sender === `${yourProfile[0].username}`) {
            pfpUrl = yourProfile[0].pfp;
            messageClass = 'my-message'; 
        } else {
            pfpUrl = testingProfiles[findProfileByIndex(contact)].pfp;
            messageClass = 'contact-message';
        }
        return `<div class="${messageClass}">
            <p>
                <small class="date">${displayTime}</small><br>
                ${msg.sender !== `${yourProfile[0].username}` ? `<img src="${pfpUrl}" class="chatPfp">` : ''}
                
                ${msg.sender === `${yourProfile[0].username}` ? ` ${msg.message} ` : `${contact}: ${msg.message}`}
                ${msg.sender === `${yourProfile[0].username}` ? `<img  src="${pfpUrl}" class="chatPfp">` : ''}
            </p>
        </div>`;

            
    }).join('');
}


export {updateChatMessagesDisplay}