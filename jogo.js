let frames = 0;

//carregar sons na memoria do computador
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

//carregar sprites na memoria do computador
const sprites = new Image();
sprites.src = './img/sprites.png';

//definindo jogo como 2d
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function criaFlappyBird () {
    //constante para definir a sprite do passaro
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.8,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            //colisão
            if(fazColisao(flappyBird, globais.chao)) {
                som_HIT.play();

            setTimeout(() => {
                mudaParaTela(Telas.INICIO); //volta para a tela inicial
            }, 500);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        //sprites
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
          ],
          frameatual: 0,
          atualizaFrameAtual () {
            //controle de frames
            const intervaloFrames = 10;
            const passouIntervalo = frames % intervaloFrames === 0;
            if (passouIntervalo) {
                const baseDoIncremento = 1; //base para somar frame
                const incremento = baseDoIncremento +flappyBird.frameatual; //o que ja tem + a base
                const baseRepeticao = flappyBird.movimentos.length; //tamanho da quantidades de movimentos
                flappyBird.frameatual = incremento % baseRepeticao;
            }
          },
        desenha () {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameatual]; //desestrututar (abrir o objeto)
            
            contexto.drawImage(
                sprites, //imagem
                spriteX, spriteY, //qual espaçamento x e y a sprite está no arquivo
                flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
                flappyBird.x, flappyBird.y, //posição onde começa a sprite x e y
                flappyBird.largura, flappyBird.altura //dentro do canvas qual o tamanho da imagem
            );
        }
    }
    return flappyBird;
}

//chao
function criaChao () {
    //constante para definir a sprite do chao
    const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza (){
        const movimentoChao = 1;
        const repeteEM = chao.largura / 2;
        const movimemtacao = chao.x = chao.x - movimentoChao;

        //repetir chao com o mod(%) (resto) da divisão
        chao.x = movimemtacao % repeteEM;

    },
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
    return chao;
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

//constante para definir a sprite da tela inicial
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) -174 / 2,
    y: 50,
    desenha () {
        contexto.drawImage(
            sprites, //imagem
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, //qual espaçamento x e y a sprite está no arquivo
            mensagemGetReady.largura, mensagemGetReady.altura, //tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y, //posição onde começa a sprite x e y
            mensagemGetReady.largura, mensagemGetReady.altura //dentro do canvas qual o tamanho da imagem
        );
    }
}

//canos
function criaCanos () {
    //constante para definir os canos
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha () {
            //para cada par de canos, desenha os canos
                canos.pares.forEach(function(par){

                    const yRamdom = par.y; //definir alaeatoriedade
                    const espacamentoCanos = 90;
    
                    //cano ceu
                    const canoCeuX = par.x;
                    const canoCeuY = yRamdom;
                    
                    contexto.drawImage(
                        sprites, //imagem
                        canos.ceu.spriteX, canos.ceu.spriteY, //qual espaçamento x e y a sprite está no arquivo
                        canos.largura, canos.altura, //tamanho do recorte na sprite
                        canoCeuX, canoCeuY, //posição onde começa a sprite x e y
                        canos.largura, canos.altura //dentro do canvas qual o tamanho da imagem
                    );
        
                    //cano chao
                    const canoChaoX = par.x;
                    const canoChaoY = canos.altura + espacamentoCanos + yRamdom;
            
                    contexto.drawImage(
                        sprites, //imagem
                        canos.chao.spriteX, canos.chao.spriteY, //qual espaçamento x e y a sprite está no arquivo
                        canos.largura, canos.altura, //tamanho do recorte na sprite
                        canoChaoX, canoChaoY, //posição onde começa a sprite x e y
                        canos.largura, canos.altura //dentro do canvas qual o tamanho da imagem
                    );
                    par.canoCeu = {
                        x: canoCeuX,
                        y: canos.altura + canoCeuY
                      }
                      par.canoChao = {
                        x: canoChaoX,
                        y: canoChaoY
                      }
                })  
        },

        colisaoComFlappy(par){
            const cabecaFlappy = globais.flappyBird.y;
            const peFlappy = globais.flappyBird.y + globais.flappyBird.altura;
           
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if(cabecaFlappy <= par.canoCeu.y) {
                  return true;
                }
        
                if(peFlappy >= par.canoChao.y) {
                  return true;
                }
              }
              return false;
            },
        //lista de canos a serem desenhadas
        pares : [],
        atualiza() {
            const passou100frames = frames % 100 === 0;
            if(passou100frames){
                canos.pares.push({
                    x: canvas.width, //começar no fim da tela
                    y: -150 * (Math.random() + 1), //calculo da aleatoriedade
                });
            }

            //movimerntação
            canos.pares.forEach(function(par){
                par.x = par.x -2;

                if(canos.colisaoComFlappy(par)) {
                    //som_HIT.play();
                    mudaParaTela(Telas.INICIO);
                  }

                //remover canos da memoria
                if(par.x +canos.largura <= 0){
                    canos.pares.shift();
                }
            });
        }
    }
    return canos;
}

//colisao chao
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    }

    else {
        return false;
    }
}

//TELAS
const globais = {};
let telaAtiva = {};
function mudaParaTela (novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa () {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
            globais.canos.atualiza();
        }
    }
};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
    }
};


//função para repetir tudo
function loop () {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
};

//reconhecer click para iniciar jogo
window.addEventListener('click', function(){
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

//executando funções
mudaParaTela(Telas.INICIO);
loop (); 