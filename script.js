//selecionar o dinossauro
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
  let position = 0;

function handleKeyUp(event){
  if (event.keyCode === 32){
    if(!isJumping){
      jump();
    }
  }
}

// Fazer o dinossauro pular
function jump(){
  isJumping = true;

  let upInterval = setInterval(() => {
    if(position >= 150){
      clearInterval(upInterval);

      //Descendo
      let downInterval = setInterval(() => {
        if(position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        }else{
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      },20);
    }else{
//Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  },20);
}

//Criar os Cactos do jogo
function createCactus(){
  //gera uma div html
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    //velocidade que ele se move para a esquerda
    if(cactusPosition < -60){
      clearInterval(leftInterval);
      background.removeChild(cactus);
    }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
      //Fim de Jogo
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class = "game-over">Fim de Jogo </h1>'
    }else{
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  },20);

  setTimeout(createCactus, randomTime);
}

createCactus();
//identificará quando as teclas forem pressionadas
document.addEventListener('keyup', handleKeyUp);
