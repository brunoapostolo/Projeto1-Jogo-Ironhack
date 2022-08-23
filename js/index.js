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

const startBtn = document.getElementById("start-btn"); /// criei variável sendo que podia usar uma função em vez de criar
const nivelFacil = document.getElementById("diff-1");/// criei variável sendo que podia usar uma função em vez de criar
const nivelMedio = document.getElementById("diff-2");/// criei variável sendo que podia usar uma função em vez de criar
const nivelDificil = document.getElementById("diff-3");/// criei variável sendo que podia usar uma função em vez de criar

startBtn.addEventListener("click",startGame, lives=10);

function startGame(){
    let board;
    let gabarito;
    if(nivelFacil.checked) {
        board= facil[0];
        gabarito = facil[1];
    }
    else if (nivelMedio.checked){
        board =  medio[0]
        gabarito = medio[1];
    }
    else if (nivelDificil.checked){
        board = dificil[0];
        gabarito = dificil[1];
    }
    disableSelect=false;
    generateBoard(board,gabarito);
    id("game").classList.remove("hidden")
    return board, gabarito
}

function generateBoard(board,gabarito){
    clearPrevious()
    let idCount =0
    for (let i=0; i<81;i++){
        let tile= document.createElement("input")
        if (board.charAt(i)!="-"){
            tile.value = board.charAt(i);
            tile.readOnly=true;
            tile.disabled=true;
        }
        else{
            tile.textContent="";
        }
        tile.id = idCount;
        idCount++;
        tile.classList.add("tile")
        if ((tile.id>17 && tile.id<27)||(tile.id>44 && tile.id<54)){
            tile.classList.add("bottom-border")
        }
        if ((tile.id%9===2)||(tile.id%9===5)){
            tile.classList.add("right-border")
        }
        id("board").appendChild(tile);
    } 



    const variavel = document.querySelectorAll(".tile"); // podia muito bem ter usado o qsa()
    variavel.forEach((element)=>{
        element.addEventListener("keyup",(event)=>{
            let a = element.value;
            if(a===gabarito[element.id]){
                console.log("Você digitou certo");
                element.classList.remove("incorrect");
                element.classList.add("correct");
            }    
            else if(isNaN(a) || a===" "||a.length===2){
                alert("Digite um numero de 0 a 9")
            }        
            else if (a.length===1 && a!==""&& a!==gabarito[element.id]){
                element.classList.remove("correct");
                element.classList.add("incorrect");
                lives--
                console.log("Você digitou errado");
                id("lives").innerText= `Você ainda tem ${lives} vidas`
            }
            let corretos = qsa(".correct");
            let faltamAcertar
            if(board===facil[0]){
                faltamAcertar=47-corretos.length;
                console.log("faltam acertar "+faltamAcertar);
            }
            if(board===medio[0]){
                faltamAcertar=51-corretos.length;
                console.log("Faltam acertar "+ faltamAcertar);
            }
            else if (board===dificil[0]){
                faltamAcertar=56-corretos.length;
                console.log("Faltam acertar "+ faltamAcertar);
            }
            if (faltamAcertar===0){
                id("board").classList.add("hidden");
                id("congratulations").classList.remove("hidden");
            }
        })
    })

}

function checkIfGameisDone(board){
    let contador =0
    for (let a=0; a<81;a++){
        if(board[a]==="-"){
            contador++
        }
    }
    console.log(lives)
    console.log(qsa(".correct"))
}


/// consertar essa função que é para limpar o tabuleiro toda vez que eu quiser começar um jogo novo   
function clearPrevious(){
    let tiles =qsa(".tile"); // query selector all
    tiles.forEach((element)=>{
        element.remove();
    })
    lives =10;
    id("lives").innerText= `Você tem ${lives} vidas`

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
