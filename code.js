let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

let iniciar = false; //variable para controlar inicio
let inteval ; //controla velocidad de videojuego

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
class harley {
    constructor(){
        this.x = 25;
        this.y = 365;
        this.width = 90;
        this.height = 90;
        this.vida = 3;              //pendiente
        this.puntuacion = 0;          //pendiente
        this.velocidad = 8;            //le digo a que velocidad se mueve mi personaje
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
        this.img.src=imagen.harley     //inserto imagen para que actualize dependiendo el comando
        this.x += this.velocidad
    }
    moverIzquierda(){
        this.img.src=imagen.joker     //inserto imagen para que actualize dependiendo el comando
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
//se inicializa fondo y personaje
const fondo = new background();
const personaje  = new harley() 

//se crea click para borrar y mostrar instrucciones
window.onload = ()=> {
    document.getElementById('boton-start').onclick=() =>{
        fondo.cambiarImg(imagen.instrucciones)
        const menu = document.getElementById('boton-start');
        menu.style.display='none' 
        iniciar = true;     
    }                                                                                                                                                                                                                                                                                       
}

//se añade comando de keycode tecla f 
//se manda a llamar siguiente escenario con case 70
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

//funcion para actualizar el juego y pintar 
const update =()=>{
    fondo.cambiarImg(imagen.fondoPrincipal);
    setInterval(()=>{
        personaje.dibujarHarley()
    })
}
//se inicializa el juego
const iniciarJuego =()=>{

// se actualiza juego 800 fotogramas x segundo
    interval = setInterval(update,1000/800)
}


