import testingProfiles from './shared.js';
import {findProfileByIndex} from './shared.js';



const greetingsTable = [
    "moiksuuu",
    "ootpäs sä komee :O",
    "kiva bio sulla :)",
    "moiii mite menee?",
];

const insultsTable = [
    
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

