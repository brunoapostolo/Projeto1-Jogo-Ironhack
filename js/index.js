const facil = ["6--375-14-4-----73--8-2----4-796--2--8-----9--2--514-6----9-1--97-----3-26-537--8",
               "692375814145689273738124659417968325586243791329751486853492167974816532261537948",
]
const medio = ["78----------72---3913--4----67-----5--897-6313---5---75--2---8-----17-----6--51-4",
               "782139456645728913913564728167483295458972631329651847571246389894317562236895174"]
const dificil = ["46-2----1-8---9---7-9---2-5--5-8--------327--------56--26-------4-----76---4-39--",
                 "463257891582319647719846235275684319691532784834791562926178453348925176157463928"]

let lives;

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
    generateBoard(board,gabarito);
    id("game").classList.remove("hidden")
    
     
    
    
    
    let minutos =0;
    if(id("time-1").checked){
        minutos = 5;
    }
    else if(id("time-2").checked){
        minutos = 7;
    }
    else if (id("time-3").checked) {
        minutos = 10;
    }
    let time = minutos * 60
    setTimer(time); 

    return board, gabarito, time
}

function generateBoard(board,gabarito){
    clearPrevious()
    let idCount =0
    for (let i=0; i<81;i++){
        let tile= document.createElement("input")
        tile.autocomplete="off"
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
                alert("Digite um numero de 1 a 9")
                element.classList.remove("correct");
                element.classList.add("incorrect");
            }        
            else if (a.length===1 && a!==""&& a!==gabarito[element.id]){
                element.classList.remove("correct");
                element.classList.add("incorrect");
                lives--
                console.log("Você digitou errado");
                id("lives").innerText= `Você ainda tem ${lives} vidas`
            }
            if (lives===0){
                id("lamentacao").classList.remove("hidden");
                qsa(".tile").forEach((element)=>{
                    element.classList.add("incorrect");
                    element.disabled=true
                })
                id("lives").innerText=`Você gastou todas as suas vidas`
                id("perdeu").innerText=`Infelizmente você perdeu o jogo, o número de vezes que você acertou foi ${qsa(".correct").length}. Para começar um novo jogo clique em "começar o seu jogo"`
            }
            
            let numeroIncognitas=0   //numero de numeros que faltam acertar para completar o Sudoku
            for (let c =0; c<board.length;c++){
                if(board[c]==="-"){
                    numeroIncognitas++
                }
            }

            let corretos = qsa(".correct");
            let faltamAcertar
            faltamAcertar=numeroIncognitas-corretos.length;
            if (faltamAcertar===0){
                id("board").classList.add("hidden");
                id("timer").innerText=`Você consegui completar o jogo de Sudoku`
                qsa(".tile").forEach((element)=>{
                    element.classList.add("correct")
                    element.disabled=true

                })
                id("congratulations").classList.remove("hidden");
            }




            return faltamAcertar;
        })
    })

}




/// consertar essa função que é para limpar o tabuleiro toda vez que eu quiser começar um jogo novo   
function clearPrevious(){
    let tiles =qsa(".tile"); // query selector all
    tiles.forEach((element)=>{
        element.remove();
    })
    lives =10;
    id("lives").innerText= `Você tem ${lives} vidas`
    id("congratulations").classList.add("hidden");
    id("lamentacao").classList.add("hidden");




       

}

function setTimer(time){
    const acabouTempo = qsa(".tile");
    let cronometro = setInterval(()=>{

        let minutes = Math.floor(time/60);
        let seconds = time%60;
        if (seconds<10){
            seconds = "0"+seconds
        }
        if (qsa(".correct").length===81 || (qsa(".incorrect").length===81)){

        }
        else{
            time --;
        }
        id("timer").innerText = `Tempo restante: ${minutes}:${seconds}`
        id("start-btn").addEventListener("click",()=>{
            clearInterval(cronometro);
        })
        if (time===-1){
            clearInterval(cronometro);

            acabouTempo.forEach((element)=>{
                element.classList.add('incorrect')
                element.disabled=true
                id("timer").innerText=`Acabou o seu tempo`
                id("lamentacao").classList.remove("hidden")
                id("perdeu").innerText = `Você perdeu o jogo porque acabou o seu tempo`
            })
        }


    },1000)
    

    
}
function stop(arg){
    return clearInterval(arg);
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
