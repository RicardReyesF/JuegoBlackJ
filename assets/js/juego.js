let deck = [];
let tipos =['C','D','H','S'];
let especiales = ['A','J','Q','K'];
let contJugador = 0,
    contMaquina = 0;
const pedirC            = document.querySelector('#btnCartaN');
const marcador          = document.querySelectorAll('small');
const cartasHTMLJugador = document.querySelector('#jugador-cartas');
const cartasHTMLMaquina = document.querySelector('#maquina-cartas');
const terminar          = document.querySelector('#btnTerminar');
const nuevo             = document.querySelector('#btnNuevo');

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

const turnoMaquina = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        contMaquina = contMaquina + valorCarta( carta );

        marcador[1].innerText = contMaquina;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        cartasHTMLMaquina.append(imgCarta); 
        if (puntosMinimos > 21) {
            break;
            
        }

    } while ((contMaquina < puntosMinimos ) && (puntosMinimos <= 21 ));
    
    setTimeout(() => {
        if (contJugador === contMaquina) {
            alert (' Valen nepe los dos ');
        }else if ((contJugador < contMaquina) && (contJugador <= 21 ) ) {
            alert('Ganaste verga!!')
        }else if ((contJugador > contMaquina) && (contMaquina >= 21 )) {
            alert('Perdiste chuerk')
        }else{
            alert('Perdiste chuerk')
        }
    }, 20);
    
}

pedirC.addEventListener('click',function () {
    const carta = pedirCarta();

    contJugador = contJugador + valorCarta( carta );
    marcador[0].innerText = contJugador;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    cartasHTMLJugador.append(imgCarta);

    if(contJugador > 21){
        pedirC.disabled = true;
        terminar.disabled = true;
        turnoMaquina(contJugador);
        console.warn("Valio Berga Chuek!")
    }else if ( contJugador === 21){
        turnoMaquina(contJugador);
        pedirC.disabled = true;
        terminar.disabled = true;
        console.warn('Ah perro, 21!!!');
    }
});

terminar.addEventListener('click',function(){
    pedirC.disabled = true;
    terminar.disabled = true;
    turnoMaquina(contJugador);
});

nuevo.addEventListener('click', function () {
    deck = [];
    deck = crearDeck();
    marcador[1].innerText = 0;
    marcador[0].innerText = 0;
    pedirC.disabled = false;
    terminar.disabled = false;
    cartasHTMLJugador.innerHTML = '';
    cartasHTMLMaquina.innerHTML = '';
    contJugador =0;
    contMaquina=0;
})


