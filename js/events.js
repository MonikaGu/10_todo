"use strict";

// event - pavyzdys be ciklo panaudojimo

const pirmas = document.querySelector('.btn.pirmas');
const antras = document.querySelector('.btn.antras');

pirmas.addEventListener('click', pirmosiosVeiksmas);
antras.addEventListener('click', antrosiosVeiksmas);

let pirmosiosPaspaudimuKiekis = 0;
function pirmosiosVeiksmas(params) {
    pirmosiosPaspaudimuKiekis++;
    return console.log('Pirmasis buvo paspaustas:', pirmosiosPaspaudimuKiekis);
}

let antrosiosPaspaudimuKiekis = 0;
function antrosiosVeiksmas(params) {
    antrosiosPaspaudimuKiekis++;
    return console.log('Antra:', antrosiosPaspaudimuKiekis);
}