// pegando o elemento da imagem do mario e do cano
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const ambience_sound = document.getElementById('ambience_sound');
var score_number = document.getElementById('score_number');
var high_score_number = document.getElementById('high_score_number');
const restart_button = document.getElementsByClassName('restart_button');
const jump_sound = document.getElementById('jump_sound');

// if para a criação de uma key de um objeto JSON no localStorage.
if(localStorage.getItem("score") == null){
	localStorage.setItem("score", 0);
}

//variavel da finalização do pulo para conseguir arrumar o bug de trocar a imagem quando já se deu game over
var jump_animation_completion ;

// adicionando a class jump a imagem do mario
function jump() {
  mario.classList.add('jump');
  sound();
  jump_sound.volume = 0.09;
  jump_sound.play();
  mario.src = "./imagens/mario-jump.png";
  mario.style.width = '60px';

  jump_animation_completion = setTimeout(() => {
    mario.classList.remove('jump');
    mario.src = "./imagens/mario-gif6-cut.gif";
    mario.style.width = '65px';
  }, 550);

}

//função para calcular o "score", pego o movimento em pixels e divido por 100 para fazer a pontuação
let previous_position = pipe.offsetLeft;
let displacement = 0;
var full_displacement = 0;

const running_mario_score = setInterval(() => {
  const current_position = pipe.offsetLeft;
  displacement = (current_position - previous_position);
  if (displacement < 0) {
    full_displacement = (full_displacement + (displacement) * -1) / 100;
  } else {
    full_displacement = (full_displacement + displacement) / 100;
  }
  animation_score(parseInt(full_displacement));
  previous_position = current_position;
}, 1000);


//animação do text de pontuação em tempo real
score = 0;
function animation_score(pontuacao) {
  //parte do from{} to{} da animação
  $({ score: 0 }).animate({ score: pontuacao }, {
    duration: 1000,
    easing: "linear",
    step: function (pontuacao_atual, fx) {
      $("#score_number").html(score + Math.floor(pontuacao_atual));
    },
    queue: false,
    complete: function (pontuacao_atual, fx) {
      score += pontuacao;
    }
  });
}

//definindo o som ambiente do jogo dessa forma pois o proprio navegador barra autoplay de coisas que o user não interagiu :(
function sound() {
  ambience_sound.play();
}

//pegando as imagens das nuvens para conseguir parar elas quando acontece o game_over
const array_clouds = document.querySelectorAll(".cloud-01,.cloud-02,.cloud-03,.cloud-04,.cloud-05")
//função para parar as nuvens 
function game_over_stop_cloud_animation(){
  for(let i = 0;i <array_clouds.length; i++){
    const cloud_Position = array_clouds[i].offsetLeft;
    array_clouds[i].style.animation = 'none';
    array_clouds[i].style.left = cloud_Position + 'px';
  }
}

//colocando a maior pontuação na tela
high_score_number.innerText = localStorage.getItem('score');


// definindo o hitbox para game-over
const loop = setInterval(() => {
  
  // pegando o valor posição do cano
  const pipePosition = pipe.offsetLeft;

  //pegando a posição de pulo do mario
  //          #colocando o "+" na frente da string tranforma em numero
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');//posição computada no estilo da imagem

  ///*
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    //tirando a segunda fase da animação de pulo, para naõ trocar a imagem quando der game over
    clearInterval(jump_animation_completion);
    game_over_stop_cloud_animation();
    
    
    //tirando o event de pulo para não bugar a imagem quando morre
    document.removeEventListener('keydown', jump);

    //clearInterval(jump);
    clearInterval(running_mario_score);

    //pausando a musica ambiente
    ambience_sound.pause();
    ambience_sound.muted = true;

    //parando a animação do cano
    pipe.style.animation = 'none';
    pipe.style.left = pipePosition + 'px';

    //parando a animação do mario
    //mario.style.animation = 'none';
    mario.style.bottom = marioPosition + 'px';

    //trocando o mario normal pelo mario quando dá game over
    mario.src = "./imagens/mario-gameover.png";
    mario.style.width = '70px'
    mario.style.marginLeft = '50px';

    //adicionando a animação de game over
    mario.classList.add('game_over_mario');


    //adicionando a musica quando dá game over
    const gameoverSound = document.querySelector('audio');
    gameoverSound.play().then(setTimeout(() => {
      clearInterval(loop);
    }, 3000)).then(setTimeout(() => {
      full_black_tv();

      //precisei desse "setInterval" para a animação do game-over sair no momento certo.
      setInterval(()=>{
        animation_over_image();
        animation_game_image();
      },1000);
      setInterval(()=>{
        
        restart_button[0].style.visibility =  "visible";
      },2500);
      
    }, 4000));
    //if para verificar a se a pontuação realizada é maior que a guardada no localStorage
    if(localStorage.getItem('score') < +score_number.innerText){
      console.log("entrou no if");
      localStorage.setItem('score', +score_number.innerText);
    }
   
  }
  //*/
  
}, 10);


// contrução da animação de "apagar" da tela de game over do jogo
const tv_board_div = document.getElementById('tv-board');
var opacity = 0;

function full_black_tv() {
  const intervalo = setInterval(function () {
    opacity += 0.01;
    tv_board_div.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(intervalo);
    }
  }, 175);  // intervalo em milissegundos
}


// funções para fazer a animação do game-over; basicamente transformei uma imagem em duas e só junto as duas partes para formar a final e fazer a animação.
function animation_over_image() {
  const over_image = document.getElementsByClassName("over_image");
  over_image[0].classList.add("animation");
  over_image[0].style.opacity = 1;
}

function animation_game_image(){
  const game_image = document.getElementsByClassName("game_image");
  game_image[0].classList.add("animation");
  game_image[0].style.opacity = 1;
}


function restart_game(){
  window.location.reload(false);
}



restart_button[0].addEventListener('click', restart_game);
document.addEventListener('keydown', jump);