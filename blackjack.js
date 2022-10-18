let deck = [ [2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11]
];

let handPlayer = [];
let handDealer = [];

let bet = document.getElementById('bet');
let moneyToBet = 0;
let youMoney = 0;
let dealerMoney = 0;


let cardsEl = document.getElementById('cards-el');
let dealerCardsEl = document.getElementById('dealer-cards-el');

let infoEl = document.getElementById('info-el');
let dealerInfoEl = document.getElementById('dealer-info-el');

let vinnerEl = document.getElementById('vinner-el');


function newDeck(){
    deck = [ [2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11],
[2,3,4,5,6,7,8,9,10,10,10,10,11]
];

handPlayer = [];
handDealer = [];

document.getElementById('cards-el').innerHTML = " ";
document.getElementById('dealer-cards-el').innerHTML = " ";
document.getElementById('info-el').innerHTML = " ";
document.getElementById('dealer-info-el').innerHTML = " ";
vinnerEl.innerHTML = "";



}


function startGame(){

   

    handPlayer = [];
    handDealer = [];
    vinnerEl.innerHTML = "";
    
    handPlayer.push(drawCard(handPlayer));
    handPlayer.push(drawCard(handPlayer));

    if(handSum(handPlayer, false) > 21 && containsEleven(handPlayer)){
        console.log("> 21 & Contains eleven");
        changeElevenToOne(handPlayer);
    }

    cardsEl.innerHTML = handToString(handPlayer);
    infoEl.innerHTML = "SUM: " + handSum(handPlayer, false);
    handDealer.push(drawCard(handDealer));
    handDealer.push(drawCard(handDealer));
    dealerCardsEl.innerHTML = dealerHandToString(handDealer, true);
    dealerInfoEl.innerHTML = "SUM: " + handSum(handDealer, true);


}

function drawCard(hand){


    let color = Math.floor(Math.random() * 4);
    //console.log("Color:" + color);
    
    console.log("deck: " + deck[color]);
    let cardIndex = Math.floor(Math.random() * 13);
    //console.log("Card index:" + cardIndex);

    let card = deck[color][cardIndex];
    //console.log("Card:" + card);


    
    while(deck[color].length < cardIndex + 1){
        console.log("Den er udefinert...");
        
        color = Math.floor(Math.random() * 4);
        cardIndex = Math.floor(Math.random() * 13);
        card = deck[color][cardIndex];

        if(!(deck[color][cardIndex] == undefined)){
            console.log("Nå er den definert");
            break;

        }

        if(deck[0].length < 1){
            console.log("Nesten ingen kort igjen!");
            document.getElementById('info-el').innerHTML = "Finn ny kortstokk";
            //newDeck();//hmm...
            break;
            
        }
    }
    
    
    deck[color].splice(cardIndex,1);
    return card;

}

//her maa ordentlig for løkke inn i stedet for of
function handToString(hand){
    let handString = "";
    for( card of hand){
        handString += card;
        handString += " - ";
    }
    return handString;

}

function dealerHandToString(hand, isHidden){
    let handString = "";
    for( card of hand){
        handString += card;
        
        handString += " - ";

        if(hand.length == 2 && isHidden == true){
            handString += "X";
            break;

        }
    }
    return handString;

}

function handSum(hand, isDealer){
    let theSum = 0;
    for(value of hand){
        //console.log("value from hand:" + value);
        theSum += parseInt(value);
        //console.log("sum_ = " + theSum);
    }
    if (isDealer && hand.length == 2){
        return "X";
    }
    else
    return theSum;

}
//Dealer sum må vises som X..

function newCard(){
    handPlayer.push(drawCard(handPlayer));

    while(handSum(handPlayer, false) > 21 && containsEleven(handPlayer)){
        console.log("WHILE > 21 & Contains eleven");
        changeElevenToOne(handPlayer);


    }

    cardsEl.innerHTML = handToString(handPlayer);
    infoEl.innerHTML = "SUM: " + handSum(handPlayer, false);


}

function startDealer(){

    dealerCardsEl.innerHTML = dealerHandToString(handDealer, false);
    dealerInfoEl.innerHTML = "SUM: " + handSum(handDealer, false);

    if(handSum(handPlayer, false) > 21 ){
        vinnerEl.innerHTML = "DEALER WINS!";
        giveDealerMoney();
        //videre kode for dealer som vinner
        return;
        
    }
    
    //console.log('handSum(handDealer)' + handSum(handDealer, false));
    while( handSum(handDealer, false) < 17 && handSum(handPlayer, false) >= handSum(handDealer, false)){
        handDealer.push(drawCard(handDealer));

        if(handSum(handDealer, false) > 21 && containsEleven(handDealer)){
            console.log("> 21 & Contains eleven");
            changeElevenToOne(handDealer);
        }

        dealerCardsEl.innerHTML = dealerHandToString(handDealer, false);
        dealerInfoEl.innerHTML = "SUM: " + handSum(handDealer, true);
        test();

    }
    if(handSum(handDealer, false) == handSum(handPlayer, false)){
        vinnerEl.innerHTML = "YOU DRAW!";
        return;

    }
    if((handSum(handDealer, false) > 21) && (handSum(handPlayer, false) > 21) ){
        vinnerEl.innerHTML = "YOU DRAW!";
        return;

    }

    if((handSum(handDealer, false) > 21) && (handSum(handPlayer, false) < 22) ){
        vinnerEl.innerHTML = "YOU WIN!";
        giveYouMoney();
        return;

    }
    if((handSum(handDealer, false) < 22) && (handSum(handPlayer, false) < 22) ){
        if (handSum(handDealer, false) > handSum(handPlayer, false)){
            vinnerEl.innerHTML = "DEALER WIN!";
            giveDealerMoney();
        }
        else {
            vinnerEl.innerHTML = "YOU WIN!";
            giveYouMoney();
        }
        return;

    }



}



async function test() {
    //console.log('start timer');
    await new Promise(resolve => setTimeout(resolve, 3000));
    //console.log('after 1 second');
  }
//---------------------------------------------------------

  function hasElevenAt(hand){
    for(let i = 0; i < hand.length; i++){
        if (hand[i] == 11){
            console.log("hasElevenAt() gjoer om en 11-er");
            return i;
        }
    }

}

function changeElevenToOne(hand){
    hand[hasElevenAt(hand)] = 1;
}

function containsEleven(hand){
    for(let i = 0; i < hand.length; i++){
        if (hand[i] == 11){    
            return true;
        }
             
    }
    return false;

}

function getBet(){
    moneyToBet = parseInt(bet.value);
    document.getElementById('dealer-money').innerHTML = "Dealer has " + dealerMoney;
    document.getElementById('money').innerHTML = "You have " + youMoney;

}

function giveDealerMoney(){
    dealerMoney += moneyToBet;
    youMoney -= moneyToBet;
    document.getElementById('dealer-money').innerHTML = "Dealer has " + dealerMoney;
    document.getElementById('money').innerHTML = "You have " + youMoney;

}

function giveYouMoney(){
    youMoney += moneyToBet;
    dealerMoney -= moneyToBet;
    document.getElementById('money').innerHTML = "You have " + youMoney;
    document.getElementById('dealer-money').innerHTML = "Dealer has " + dealerMoney;

}