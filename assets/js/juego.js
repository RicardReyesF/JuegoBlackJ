let deck = [];
let tipos =['C','D','H','S'];
let especiales = ['A','J','Q','K'];


const crearDeck = () => {
    
    for (let i = 2; i <= 10; i++) {
        for ( tipo of tipos) {
            deck.push(i+ tipo);
        }
    }
    for (tipo of tipos) {
        for (esp of especiales) {
            deck.push(tipo + esp);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
}

crearDeck();