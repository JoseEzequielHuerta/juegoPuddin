let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

let iniciar = false; //variable para controlar inicio
let inteval ; //controla velocidad de videojuego
let martillos=[]  //se crea array martillo

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
    murcielago: 'assets/imagenes/murcielago.png',
    pantallaFinal: 'assets/imagenes/pantallaFinal',
    pinguiDerecha: 'assets/imagenes/pinguiDerecha',
    pinguino: 'assets/imagenes/pinguino',
    pistola: 'assets/imagenes/pistola.png',
    espantapajaro: 'assets/imagenes/espantapajaro.png',        

}
// creo personaje
class harley {
    constructor(){
        this.x = 25;
        this.y = 365;
        this.width = 90;
        this.height = 90;
        this.vida = 3;              //pendiente
        this.puntuacion = 0;          //pendiente
        this.velocidad = 8;            //le digo a que velocidad se mueve mi personaje
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
    fondo.cambiarImg(imagen.fondoPrincipal);
    setInterval(()=>{
        personaje.dibujarHarley()
        dibujarMartillo()
    })
    borraMartillo()
}
//se inicializa el juego
const iniciarJuego =()=>{

// se actualiza juego 800 fotogramas x segundo
    interval = setInterval(update,1000/800)
}


