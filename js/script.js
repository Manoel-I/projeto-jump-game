// pegando o elemento da imagem do mario e do cano
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const ambience_sound = document.getElementById('ambience_sound');
var score_number = document.getElementById('score_number');

// adicionando a class jump a imagem do mario
const jump = () => {
    mario.classList.add('jump');
    sound();

    setTimeout( () =>{
        mario.classList.remove('jump');
    } , 500);

}

//função para calcular o "score", pego o movimento em pixels e divido por 100 para fazer a pontuação
let previous_position = pipe.offsetLeft; 
let displacement = 0; 
var full_displacement = 0;

const running_mario_score = setInterval(() => {
  const current_position = pipe.offsetLeft;
  displacement = (current_position - previous_position);
  if(displacement < 0){
    full_displacement = (full_displacement + (displacement)*-1)/100;
  }else{ 
    full_displacement = (full_displacement + displacement)/100;
  }
  animation_score(parseInt(full_displacement));
  previous_position = current_position;
}, 1000); 


//animação do text de pontuação em tempo real
score = 0;
function animation_score(pontuacao){
    //parte do from{} to{} da animação
  $({score: 0}).animate({score: pontuacao},{
    duration: 1000,
    easing:"linear",
    step: function(pontuacao_atual, fx){
      $("#score_number").html(score + Math.floor(pontuacao_atual));
    },
    queue:false,
    complete: function(pontuacao_atual, fx){
     score += pontuacao;
    }
  });
}


//definindo o som ambiente do jogo dessa forma pois o proprio navegador barra autoplay de coisas que o user não interagiu :(
function sound (){
    ambience_sound.play();
}

// definindo o hitbox para game-over
const loop = setInterval(()=>{
  
  // pegando o valor posição do cano
  const pipePosition = pipe.offsetLeft;
   
    
  //console.log("teminou");

  //pegando a posição de pulo do mario
  //          #colocando o "+" na frente da string tranforma em numero
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');//posição computada no estilo da imagem
    

  if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
      full_black_tv()
      clearInterval(running_mario_score); 
      ambience_sound.pause();
      ambience_sound.muted = true;

      //parando a animação do cano
      pipe.style.animation = 'none';
      pipe.style.left = pipePosition+'px';

      //parando a animação do mario
      //mario.style.animation = 'none';
      mario.style.bottom = marioPosition+'px';

      //trocando o mario normal pelo mario quando dá game over
      mario.src = "./imagens/mario-gameover.png";
      mario.style.width = '70px'
      mario.style.marginLeft = '50px';

      //adicionando a animação de game over
      mario.classList.add('game_over_mario');
        

      //adicionando a musica quando dá game over
      const gameoverSound = document.querySelector('audio');
      gameoverSound.play().then(setTimeout(()=>{
        gameoverSound.pause();
        clearInterval(loop);
              
      }, 7000));
    
    } 

}, 10);

// contrução do "apagar" da tela de game over do jogo
const tv_board_div = document.getElementById('tv-board');
var opacity = 0;
console.log("divzinha", tv_board_div)

function full_black_tv() { 
  const intervalo = setInterval(function() {
    opacity += 0.01;
    tv_board_div.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(intervalo);
    }
  }, 400);  // intervalo em milissegundos
}




document.addEventListener('keydown', jump);