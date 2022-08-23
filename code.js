let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

const imagen ={
    portada:'assets/imagenes/portada.png',
    instrucciones:'assets/imagenes/instrucciones.png',
    dinero: 'assets/imagenes/dinero.png',
    botom: 'assets/imagenes/botom.png',
    fondoPrincipal:'assets/imagenes/fondoPrincipal',
    harley:'assets/imagenes/harley.png',
    joker: 'assets/imagenes/joker.png',
    logo: 'assets/imagenes/logo.png',
    martillo:  'assets/imagenes/martillo.png',
    murcielago: 'assets/imagenes/murcielago.png',
    pantallaFinal: 'assets/imagenes/pantallaFinal',
    pinguiDerecha: 'assets/imagenes/pinguiDerecha',
    pinguino: 'assets/imagenes/pinguino',
    pistola: 'assets/imagenes/pistola.png',
    espantapajaro: 'assets/imagenes/espantapajaro.png',        

}

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
    dibujar(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    cambiarImg(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.img.src=imagen.instrucciones;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}
const fondo = new background();

window.onload = ()=> {
    document.getElementById('boton-start').onclick=() =>{
        fondo.cambiarImg()
        const menu = document.getElementById('boton-start');
        menu.style.display='none'
        
    }
}