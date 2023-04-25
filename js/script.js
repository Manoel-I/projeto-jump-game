// pegando o elemento da imagem do mario e do cano
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');



// adicionando a class jump a imagem do mario
const jump = () => {
    mario.classList.add('jump');

    setTimeout( () =>{
        mario.classList.remove('jump');
    } , 500);

}

//definindo o som ambiente do jogo
const ambience_sound = document.getElementById('ambience_sound');
ambience_sound.play();


// definindo o hitbox para game-over
const loop = setInterval(()=>{
    // pegando o valor posição do cano
    const pipePosition = pipe.offsetLeft

    //pegando a posição de pulo do mario
    //          #colocando o "+" na frente da string tranforma em numero
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');//posição computada no estilo da imagem
    

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        ambience_sound.pause();
        
        pipe.style.animation = 'none';
        pipe.style.left = pipePosition+'px';

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



document.addEventListener('keydown', jump);