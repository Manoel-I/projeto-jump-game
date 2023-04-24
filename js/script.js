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

// definindo o hitbox para game-over
const loop = setInterval(()=>{
    const pipePosition = pipe.offsetLeft
    console.log(pipePosition);

    if(pipePosition <= 120){
        pipe.style.animation = 'none';
        pipe.style.left = pipePosition+'px';
    } 

}, 10);


document.addEventListener('keydown', jump);