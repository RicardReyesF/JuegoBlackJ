let deck = [];
let tipos =['C','D','H','S'];
let especiales = ['A','J','Q','K'];
let contJugador = 0,
    contMaquina = 0;
const pedirC            = document.querySelector('#btnCartaN');
const marcador          = document.querySelector('small');
const cartasHTMLJugador = document.querySelector('#jugador-cartas');


const crearDeck = () => {
    
    for (let i = 2; i <= 10; i++) {
        for ( tipo of tipos) {
            deck.push(i+ tipo);
        }
    }
    for (tipo of tipos) {
        for (esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    
}

crearDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        throw "La baraja esta vacia";
    }
    const carta = deck.pop();
    return carta;
}

//pedirCarta();


const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length -1);
    return (isNaN(valor)) ? 
            (valor === 'A')   ? 11 : 10
            : valor * 1;
}

pedirC.addEventListener('click',function () {
    const carta = pedirCarta();

    contJugador = contJugador + valorCarta( carta );
    marcador.innerText = contJugador;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    cartasHTMLJugador.append(imgCarta);

    if(contJugador > 21){
        pedirC.disabled = true;
        console.warn("Valio Berga Chuek!")
    }else if ( contJugador === 21){
        console.warn('Ah perro, 21!!!');
    }
});

