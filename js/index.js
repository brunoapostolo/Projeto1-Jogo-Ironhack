const facil = ["6--375-14-4-----73--8-2----4-796--2--8-----9--2--514-6----9-1--97-----3-26-537--8",
               "692375814145689273738124659417968325586243791329751486853492167974816532261537948",
]
const medio = ["78----------72---3913--4----67-----5--897-6313---5---75--2---8-----17-----6--51-4",
               "782139456645728913913564728167483295458972631329651847571246389894317562236895174"]
const dificil = ["46-2----1-8---9---7-9---2-5--5-8--------327--------56--26-------4-----76---4-39--",
                 "463257891582319647719846235275684319691532784834791562926178453348925176157463928"]

let timer;
let timeRemaining;
let lives;
let selectedNum;
let selectedTile;
let disableSelect;

const startBtn = document.getElementById("start-btn"); /// criei variável sendo que pudia usar uma função em vez de criar
const nivelFacil = document.getElementById("diff-1");/// criei variável sendo que pudia usar uma função em vez de criar
const nivelMedio = document.getElementById("diff-2");/// criei variável sendo que pudia usar uma função em vez de criar
const nivelDificil = document.getElementById("diff-3");/// criei variável sendo que pudia usar uma função em vez de criar

startBtn.addEventListener("click",startGame);

function startGame(){
    let board;
    if(nivelFacil.checked) {
        board= facil[0];}
    else if (nivelMedio.checked){
        board =  medio[0];
    }
    else if (nivelDificil.checked){
        board = dificil[0];
    }
    generateBoard(board);
}

function generateBoard(board){
    clearPrevious()
    let idCount =0
    for (let i=0; i<81;i++){
        let tile= document.createElement("p")
        if (board.charAt(i)!="-"){
            tile.textContent = board.charAt(i);
        }
        else{
            tile.textContent="";
        }
        tile.id = idCount;
        idCount++;
        tile.classList.add("tile")
        id("board").appendChild(tile);
    } 
}

/// consertar essa função que é para limpar o tabuleiro toda vez que eu quiser começar um jogo novo   
function clearPrevious(){
    let tiles =qsa(".tile");
    for (let i =0 ; a<tiles.length;i++){
        tiles[i].remove();
    }
}


/// Essa função tem o papel de me poupar de criar variáveis toda vez que eu precisar escrever getElementById
function id(id){
    return document.getElementById(id)
}
// Essa função tem o papel de me poupar de criar variáveis para o querySelector
function qs(selector){
    return document.querySelector(selector);
}

// Essa função tem o papel de poupar-me de criar uma nova variável no querySelectorAll
function qsa(selector){
    return document.querySelectorAll(selector)
}
