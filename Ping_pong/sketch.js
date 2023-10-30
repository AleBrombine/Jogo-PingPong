//Enemy paddle miss chance variables
let missEnemy = 0;
let missDelta = 5;

// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Velocidade da Bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

let colidiu = false

// Raquete oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;
let chanceDeErrar = 20


//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo 
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaLimiteborda();
  mostraRaquete (xRaquete, yRaquete);
  movimentoMinharaquete();
  //verificacolisaoMinharaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponenteA();
  //movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBolinha (){
    fill (255)
    circle(xBolinha , yBolinha, diametro);
}

function mostraRaquete (x, y){
    fill (255)
    rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaBolinha (){
  xBolinha += velocidadeXbolinha
  yBolinha += velocidadeYbolinha
}

function verificaLimiteborda (){
  
    if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadeXbolinha *= - 1; 
    }
    if (yBolinha + raio > height || yBolinha - raio < 0){
      velocidadeYbolinha *= - 1;
    }
 yRaquete = constrain(yRaquete, 10, 310);
}

function movimentoMinharaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function verificacolisaoMinharaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

if (colidiu){velocidadeXbolinha *= -1
    raquetada.play();
     }
}

function colisaoRaqueteOponenteBiblioteca(){
  colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

if (colidiu){velocidadeXbolinha *= -1
     }
}

function movimentaRaqueteOponenteA (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
    //yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 10
    if (chanceDeErrar >= 39){
    chanceDeErrar = 45
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 25
    }
  }
}
function movimentaRaqueteOponente() {
  if (keyIsDown(87)){
    yRaqueteOponente -= 10
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10
  }
  
}
function incluiPlacar(){
  stroke(0)
  textAlign(CENTER);
  textSize(16);
  fill(color(242,79,0));
  rect(150, 10, 40, 20)
  fill(255);
  text (meusPontos, 170, 26);
  fill(color (242,79,0));
  rect(450, 10, 40, 20);
  fill(255);
  text (pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1
    ponto.play()
  }
  if (xBolinha < 10){
    pontosOponente += 1
    ponto.play()
  }
}
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

