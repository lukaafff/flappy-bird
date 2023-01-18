
//retornar no navegador informações
console.log('[Luiza] Flappy Bird');

//carregar sprites na memoria do computador
const sprites = new Image();
sprites.src = './img/sprites.png';

//definindo jogo como 2d
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//constante para definir a sprite do passaro
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha () {
        contexto.drawImage(
            sprites, //imagem
            flappyBird.spriteX, flappyBird.spriteY, //qual espaçamento x e y a sprite está no arquivo
            flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, //posição onde começa a sprite x e y
            flappyBird.largura, flappyBird.altura //dentro do canvas qual o tamanho da imagem
        );
    }
}

//constante para definir a sprite do chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha () {
        contexto.drawImage(
            sprites, //imagem
            chao.spriteX, chao.spriteY, //qual espaçamento x e y a sprite está no arquivo
            chao.largura, chao.altura, //tamanho do recorte na sprite
            chao.x, chao.y, //posição onde começa a sprite x e y
            chao.largura, chao.altura //dentro do canvas qual o tamanho da imagem
        );
        
        //repetindo para completar a imagem do chão
        contexto.drawImage(
            sprites, //imagem
            chao.spriteX, chao.spriteY, //qual espaçamento x e y a sprite está no arquivo
            chao.largura, chao.altura, //tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, //posição onde começa a sprite x e y
            chao.largura, chao.altura //dentro do canvas qual o tamanho da imagem
        );
    
    }
}

//constante para definir a sprite do fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha () {
        //preencher o fundo de ponta a ponta
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0 ,canvas.width, canvas.height);

        contexto.drawImage(
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //qual espaçamento x e y a sprite está no arquivo
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y, //posição onde começa a sprite x e y
            planoDeFundo.largura, planoDeFundo.altura //dentro do canvas qual o tamanho da imagem
        );

        //repetindo para completar a imagem do fundo
        contexto.drawImage(
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //qual espaçamento x e y a sprite está no arquivo
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //posição onde começa a sprite x e y
            planoDeFundo.largura, planoDeFundo.altura //dentro do canvas qual o tamanho da imagem
        );
    }
}

//função para repetir tudo
function loop () {
    flappyBird.atualiza();

    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);
};

loop (); //executando função