const testingProfiles = [
    { username: 'Pekka', pfp: 'https://media.discordapp.net/attachments/433293359054979073/1176216959306711090/9b9f5fad41266773.png?ex=656e1068&is=655b9b68&hm=0fde4c573f381801c9cdf217ea9db0e0215ed4a8b52a7e366215872a701874e6&=&format=webp' },
    { username: 'Alrefo', pfp: 'https://cdn.discordapp.com/attachments/433293359054979073/1177707711748649063/9k.png?' },
    { username: 'Jussi', pfp: 'https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701' },
    { username: 'Matti', pfp: 'https://media.discordapp.net/attachments/433293359054979073/1176216917430779975/635273e5eaa0bb13.png?ex=656e105e&is=655b9b5e&hm=31e444cd791a4de62d45009d82772d47426d942ee9c67784c772a634488ae4dc&=&format=webp&width=662&height=701' },
];
export default testingProfiles;


function findProfileByIndex(contact){
    return testingProfiles.findIndex(item => item.username === contact);
}
export {findProfileByIndex};

function filterChatByName(contact,victim){
    let storedData = localStorage.getItem('chat-' + contact);
    
    if (storedData) {
        let loadMessages = JSON.parse(storedData);
        
        if (Array.isArray(loadMessages)) {
            let filteredMessages = loadMessages.filter(message => message.sender === contact);
            
            let messages = filteredMessages.map(msg => msg.message);
            let sentMessages = `${contact} has sent ` + (loadMessages.filter(message => message.sender === contact).length) + ` messages \n----------\n${contact}'s messages: \n${messages} \n----------\n\n`
            
           let yourMessages = loadMessages.filter(message => message.sender === victim);
           let yourSentMessagesString = yourMessages.map(msg => msg.message)
           if (yourSentMessagesString.length < 1){
            yourSentMessagesString = 'NONE';
            return sentMessages;
           }
           let yourSentMessages = `${victim}'s messages: \n----------\n${yourSentMessagesString}\n----------\n`
           
            return sentMessages + yourSentMessages;
        } else {
            console.log('Loaded data is not an array');
            return []; 
        }
    } else {
        console.log('No chat data found for', contact);
        return []; 
    }
}

export {filterChatByName};