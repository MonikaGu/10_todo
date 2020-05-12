"use strict";

const mygtukai = document.querySelectorAll('.btn');

for (let i = 0; i < mygtukai.length; i++) {
    mygtukai[i].addEventListener('click', paspaudimas)
}

let paspaudimuKiekis = Array(mygtukai.length).fill(0);

function paspaudimas( event ) {
    const paspaustasElementas = event.target;
    const duomenys = paspaustasElementas.dataset;
    const index = parseInt( duomenys.number );
    console.log(paspaudimuKiekis);
    
    paspaudimuKiekis[ index - 1 ]++;
    return console.log(`Paspaustas ${duomenys.number}: ${paspaudimuKiekis[ index -1 ]} kartu.`); 
}

console.log(paspaudimuKiekis);



