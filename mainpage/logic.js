

let testButton = document.getElementById('test');




const yourProfile = [
{username: 'juha', bio: 'rauhallisesti elämässä eteenpäi!', pfp: ''}
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

    // Load chat data from localStorage
    var chatData = localStorage.getItem('chat-' + contact) || '';
    document.getElementById('chatMessages-' + contact).innerHTML = chatData;
   console.log("Selected", contact);
   
}
export default {openChat};





function appendMessage(contact) {
    var message = document.getElementById('chatInput-' + contact).value;
    var chatMessages = document.getElementById('chatMessages-' + contact);

    chatMessages.innerHTML += `
    
    <p>Sinä: ${message}</p>`;
    document.getElementById('chatInput-' + contact).value = '';

    // Save the updated chat data to localStorage
    localStorage.setItem('chat-' + contact, chatMessages.innerHTML);
}

