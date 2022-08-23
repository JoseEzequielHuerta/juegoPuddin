let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');

const imagen ={
    portada:'assets/imagenes/portada.png',
    instrucciones:'assets/imagenes/instrucciones.png',
    dinero: 'assets/imagenes/dinero.png',
    botom: 'assets/imagenes/botom.png',
    fondoPrincipal:'assets/imagenes/fondoPrincipal.png',
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
//coloco valores de mi escnario
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
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    //limpio mi escenario y coloco el siguiente
    cambiarImg(img){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.img.src=img
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}
const fondo = new background();

window.onload = ()=> {
    document.getElementById('boton-start').onclick=() =>{
        fondo.cambiarImg(imagen.instrucciones)
        const menu = document.getElementById('boton-start');
        menu.style.display='none'        

    }                                                                                                                                                                                                                                                                                       
}

//se añade comandos (f continuar , espacio-disparar, arriba-saltar, etc)
//se manda a llamar siguiente escenario con case 70
window.addEventListener('keydown',({keyCode}) => {
    switch(keyCode){
        case 70:
            fondo.cambiarImg(imagen.fondoPrincipal)
            break;
        case 32:
            harley.dispara()
            break;
        case 38:
            harley.saltar()
            break;
        case 40:
            harley.agacha()
            break;
        case 37:
            harley.voltea()
            break;
        case 39:
            harley.avanza()
            break;
        
    }
    console.log(32)
})
