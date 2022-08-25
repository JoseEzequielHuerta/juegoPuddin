let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

let iniciar = false; //variable para controlar inicio
let inteval ; //controla velocidad de videojuego , actualizacion
let martillos =[]  //se crea array martillo
let enemigos = []   // array enemigos
let frames = 0;     //indica cada que tiempo se actualiza enemigos
let pudines =[]
let batmanArray =[]



// se crea objeto con todas las imagenes
const imagen ={
    portada:'assets/imagenes/portada.png',
    instrucciones:'assets/imagenes/instrucciones.png',
    dinero: 'assets/imagenes/dinero.png',
    botom: 'assets/imagenes/botom.png',
    fondoPrincipal:'assets/imagenes/fondoPrincipal.png',
    harley:'assets/imagenes/harleyPer.png',
    harleyIzq:'assets/imagenes/harleyIzq.png',
    joker: 'assets/imagenes/joker.png',
    logo: 'assets/imagenes/logo.png',
    martilloDer: 'assets/imagenes/martilloDer.png',
    martilloIzq: 'assets/imagenes/martilloIzq.png',
    murcielago: 'assets/imagenes/murcielago.jpg',
    pantallaFinal: 'assets/imagenes/pantallaFinal.png',
    pinguiDerecha: 'assets/imagenes/pinguinoDerecha.png',
    pinguino: 'assets/imagenes/pinguino.png',
    pistola: 'assets/imagenes/pistola.png',
    espantapajaro: 'assets/imagenes/espantapajaro.png', 
    pudin: 'assets/imagenes/pudin.png',

}
// creo personaje
class harley {
    constructor(){
        this.x = 25;
        this.y = 395;
        this.width = 90;
        this.height = 90;
        this.vida = 3;              //pendiente
        this.puntuacion = 0;          //pendiente
        this.velocidad = 5;            //le digo a que velocidad se mueve mi personaje
        this.direccion = false        //le indico que mi personaje aviente martillo der
        this.img= new Image()
        this.img.src = imagen.harley;
        this.img.onload=()=>{
            this.dibujarHarley();
        }        
    }

    dibujarHarley(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
    moverDerecha(){
        this.direccion= false          //si te mueves a la derecha va hacer falso
        this.img.src=imagen.harley     //inserto imagen para que actualize dependiendo el comando
        this.x += this.velocidad
    }
    moverIzquierda(){
        this.direccion = true             // si te mueves a la izq es verdadero
        this.img.src=imagen.harleyIzq     //inserto imagen para que actualize dependiendo el comando
        this.x -= this.velocidad
    }
    chocarEnemigo(enemigo){                     //se crea chocar enemigo
        if(this.x<enemigo.x+enemigo.width &&
            this.x + this.width>enemigo.x &&
            this.y < enemigo.y +enemigo.height &&
            this.y + this.height > enemigo.y){
                return true
            }
        else{
            return false
            }
    }
}  
const golpeaEnemigo =()=>{
    enemigos.forEach((ene,index)=>{
        if(personaje.chocarEnemigo(ene)){
            enemigos.splice(index,1)
            personaje.vida -=1
        }
    })
}        

class enemigo{                               //se crea enemigos
    constructor(posicion,velocidad){
        this.posicion =posicion
        this.x = posicion
        this.y = 400
        this.width = 70
        this.height = 70
        this.velocidad = velocidad
        this.img = new Image();
        this.dibujarEnemigo()
    }
    dibujarEnemigo(){
        if(this.posicion == 0){
            this.img.src = imagen.pinguino
            this.x += this.velocidad
        }
        else{
            this.height= 90
            this.y =400
            this.img.src = imagen.espantapajaro

            this.x -= this.velocidad
        }
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }    
}

const generarEnemigo = ()=> {    
    if(frames %  30 === 0){                                        //indica cada cuanto
        let aux = Math.floor((Math.random() * 2));                
        let velocidad = Math.random() *  (0.09 -0.0) +0.05          //velocidad
        if(aux === 0){
            enemigos.push(new enemigo(0,velocidad))
        }
        else{
            enemigos.push(new enemigo(1000,velocidad))
        }
    }
}
const dibujarEnemigo  =() =>{
    enemigos.forEach((enemi)=>{
        enemi.dibujarEnemigo()
    })
}
const borrarEnemigo = () =>{                   //borra 
    enemigos.forEach((enemi,index)=>{
        if( enemi.x <= 0 || enemi.x>= 1000){
            enemigos.splice(index , 1)
        }
    })
}

class pudin{                               //se crea postre que da vida a harley
    constructor(posicion ,velocidad){
        this.posicion =posicion
        this.x = posicion
        this.y = 0
        this.width = 25
        this.height = 25
        this.velocidad = velocidad
        this.img = new Image();
        this.dibujarPudin()
    }
    dibujarPudin(){
            this.img.src = imagen.pudin
            this.y -= this.velocidad
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }    
}

const tocarPudin =()=>{                         // se realiza que al tocar al personaje le sume
    pudines.forEach((pudi,index)=>{
        if(personaje.chocarEnemigo(pudi)){
            pudines.splice(index,1)
            personaje.puntuacion += 1
        }
    })
    
}

const generarPudin = ()=> {    
    if(frames %  60 === 0){                                        
        let auxx = Math.floor((Math.random() *(930-70+1))+70);       // indica aleatorio la salida de imagen que dara vida     
        let velocidad = Math.random() * (0.09 -0.07) -0.05          //velocidad
            pudines.push(new pudin(auxx,velocidad))
    }
}
const dibujarPudin =() =>{
    pudines.forEach((pudi)=>{
        pudi.dibujarPudin()
    
    })
}
const borrarPudin = () =>{                   //borra 
    pudines.forEach((pudi,index)=>{
        if( pudi.y >= 500){
            pudines.splice(index , 1)
        }
    })
}

class batman{                               //se crea imagen que le restara puntos a harley
    constructor(posicion ,velocidad){
        this.posicion =posicion
        this.x = posicion
        this.y = 0
        this.width = 25
        this.height = 25
        this.velocidad = velocidad
        this.img = new Image();
        this.dibujarBatman()
    }
    dibujarBatman(){
            this.img.src = imagen.murcielago               //se pasa imagen
            this.y -= this.velocidad
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }    
}

const tocarBatman =()=>{                      // se realiza que al tocar al personaje le reste
    batmanArray.forEach((batma,index)=>{
        if(personaje.chocarEnemigo(batma)){
            batmanArray.splice(index,1)
            personaje.puntuacion -= 1
        }
    })
    
}

const generarBatman = ()=> {    
    if(frames %  32 === 0){                                        
        let aus = Math.floor((Math.random() *(930-70+1))+70);        // indica aleatorio la salida de imagen que hara restara puntos al personaje        
        let velocidad = Math.random() * (0.09 -0.07) -0.05          //velocidad de imagen
        batmanArray.push(new batman(aus,velocidad))
    }
}
const dibujarBatman =() =>{
    batmanArray.forEach((batman)=>{                       
        batman.dibujarBatman()
    
    })
}
const borrarBatman = () =>{                   //borra 
    batmanArray.forEach((batman,index)=>{
        if( batman.y >= 500){
            batmanArray.splice(index , 1)
        }
    })
}

//coloco valores de mi escenario
class background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;    
        this.height = canvas.height;
        this.img = new Image()
        this.img.src = imagen.portada; 
        this.img.onload = ()=> {
            this.dibujar();
        }
    }
    //dibujo mi escenario
    dibujar(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);

    }
    //limpio mi escenario y coloco el siguiente
    cambiarImg(img){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.img.src=img
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}
class martillo{                              //creo arma
    constructor(posicion,direccion){
        this.x = posicion;
        this.y = 400;
        this.width = 50;
        this.height =45;
        this.direccion = direccion
        this.img= new Image()
        if(direccion){
            this.img.src= imagen.martilloIzq
        }
    else{
        this.img.src= imagen.martilloDer
    }
    }
    dibujarMartillo(){
        if(this.direccion){       //indica direccion de martillo
            this.x -= 0.07    
        }
        else{
            this.x +=  0.07      //indica velocidad de martillo
        }
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
    matarEnemigo(enemigo){                       //se crea matar enemigo
        if(this.x<enemigo.x+enemigo.width &&
            this.x + this.width>enemigo.x &&
            this.y < enemigo.y +enemigo.height &&
            this.y + this.height > enemigo.y){
                return true
            }
        else{
            return false
            }
    }
}

const tocaEnemigo =()=>{                    //se hace que el enemigo muera al disparar
    enemigos.forEach((ene, index)=>{
        martillos.forEach((mart, index2)=>{
            if(mart.matarEnemigo(ene)){
                martillos.splice(index2,1)
                enemigos.splice(index, 1)
                personaje.puntuacion+= 30
            }
        })
    })
}
const generaMartillo =() =>{
    if(personaje.direccion){
        martillos.push(new martillo(personaje.x-30, personaje.direccion)) //indico direccion y la posicion donde sale el martillo
    }
    else{
        martillos.push(new martillo(personaje.x+60, personaje.direccion))
    }
}

const dibujarMartillo =() =>{          //se dibuja arma  que se genera en array martillos
    martillos.forEach((martillo)=>{
        martillo.dibujarMartillo()
    })
}
const borraMartillo =() =>{                         //indico que si mi marrtillo sale de mi canvas lo borre
    martillos.forEach((martillo, index)=>{
        if(martillo.x + personaje.width<=0  || martillo.x>=1000){
            martillos.splice(index,1)
        }
    })
}

const fondo = new background(); //se inicializa fondo y personaje
const personaje  = new harley() 

//se crea click para borrar y mostrar instrucciones
window.onload = ()=> {
    document.getElementById('boton-start').onclick=() =>{
        fondo.cambiarImg(imagen.instrucciones)
        const menu = document.getElementById('boton-start');
        menu.style.display='none'                       //esconde boton
        iniciar = true;     
    }                                                                                                                                                                                                                                                                                       
}

//se añade comando de keycode tecla f 
//se manda a llamar siguiente escenario con case 70 ,añado teclas de juego
window.addEventListener('keydown',({keyCode}) => {
    if(iniciar){
        switch(keyCode){
            case 70:
                iniciarJuego()
                break;
            case 39:
                personaje.moverDerecha();
                break;
            case 37:
                personaje.moverIzquierda();
                break;
        }
    }    
})

// hace que el arma se genene una vez dejando de presionar tecla espacio
window.addEventListener('keyup',({keyCode}) =>{
    switch(keyCode){
        case 32:
            generaMartillo()
        break;
    }
})

//funcion para actualizar el juego y pintar 
const update =()=>{
    frames++
    
    fondo.cambiarImg(imagen.fondoPrincipal);
    generarEnemigo()
    borraMartillo()
    borrarEnemigo()
    generarPudin()
    generarBatman()
    tocaEnemigo()
    golpeaEnemigo()
    tocarBatman()
    tocarPudin()
    setInterval(()=>{
        personaje.dibujarHarley()
        dibujarEnemigo()
        dibujarMartillo()
       dibujarPudin() 
       dibujarBatman()       
    })    
}

//se inicializa el juego
const iniciarJuego =()=>{

// se actualiza juego 800 fotogramas x segundo
    interval = setInterval(update,1000/800)
}


