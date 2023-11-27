import testingProfiles from './userHandle.js';




const greetingsTable = [
    "moiksuuu",
    "ootpäs sä komee :O",
    "kiva bio sulla :)",
    "moiii mite menee?",
];

const insultsTable = [
    // ... your insults messages
];


// TODO: LOGIC TO DETERMINE STUFF

function determineMessage() {
    return greetingsTable[Math.floor(Math.random() * greetingsTable.length)];
}
export {determineMessage};

function determineContact() {
    return testingProfiles[Math.floor(Math.random() * testingProfiles.length)].username;
    
}
export {determineContact};

