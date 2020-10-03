

class Logo{
    constructor(key,img){
        this.key = key
        this.img = img
    }

    obtenerArrayKey(){
        return this.key.split('')
    }
}


class Juego {
    constructor(){
        this.load_game()
        this.inicilizar()
    }

    load_game(){
        
        this.secuencia =2
        this.puntos=140
        this.intentos = 7
        this.nivel =1
        this.inicilizar=this.inicilizar.bind(this)
        this.mostrarMensaje = this.mostrarMensaje.bind(this)
        this.generarSecuencia = this.generarSecuencia.bind(this)
        this.palabras=this.generarPalabra()
    }

    
    inicilizar(){
        this.cargarPuntaje()
        this.palabraElegida=this.palabraElegida.bind(this)
        this.palabraAdivinar = this.generarPalabrasAleatorias()
        this.arrKeyLogo = this.palabraAGenerar.obtenerArrayKey()
        this.palabraElegida = this.palabraElegida.bind(this)
        this.cargarImagen()
        this.cargarPalabra(this.palabraAdivinar)
        this.crearPalabraEnCuadro()
    }

    cargarPuntaje(){
        var puntaje = document.getElementById('puntaje')
        puntaje.innerText =`Puntaje: ${this.puntos}`
    }

    generarPalabra(){
        var nike = new Logo('NIKE','https://brandemia.org/sites/default/files/logo_nike_principal.jpg')
        var adidas = new Logo('ADIDAS','https://img2.freepng.es/20180330/soe/kisspng-adidas-originals-logo-puma-adidas-5abdfa52d684d8.8595369215223998268787.jpg')
        this.palabras = [nike,adidas]
        var palabrasArray = this.palabras
        return palabrasArray
   }

    generarPalabrasAleatorias() {
        
        this.palabraAGenerar = this.obtenerPalabra(this.generarSecuencia)
        var abecedario = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
        var palabra = this.palabraAGenerar.obtenerArrayKey();
        const indice = 15
        
        for(var i=palabra.length; i < indice ;i++){
            palabra[i]= abecedario.charAt(Math.floor(Math.random() *28))
            if(!palabra[i]){
                palabra[i]='X'
            }
        }
        var palabra2 = palabra.sort(()=> Math.random()-0.5)
        return palabra2;
    }


    generarSecuencia() {
        var indicePalabra=Math.floor(Math.random() * this.secuencia)
        return indicePalabra
    }

    obtenerPalabra(fn){
        var indice= fn()
        var palabra =this.palabras[indice]
        this.palabras.splice(indice,1)
        if(this.secuencia < 1){
            this.secuencia =0
        }else{
            this.secuencia -=1
        }
        
        return palabra
    }

    cargarImagen(){
        var img = document.getElementById('imagen-adivinar')
        img.src = this.palabraAGenerar.img
    }

    cargarPalabra(palabraCreada){
        
        for(var i=0; i < palabraCreada.length;i++){
            this.creaBotones(i,palabraCreada)
        }
    }

    creaBotones(indice,palabraCreada){
        var divButton = document.getElementById('buttons')
        let button = document.createElement('button')
        button.id=indice+1
        button.innerHTML = palabraCreada[indice].toUpperCase()
        divButton.appendChild(button)
        this.agregarEventos(button);
    }

    crearPalabraEnCuadro() {
        var parrafo = document.querySelector('.palabras-letras')
        for(var i=0;i < this.palabraAGenerar.key.length;i++){
            let span = document.createElement('span')
            span.className='span1'
            parrafo.appendChild(span)
        }
    }

    agregarEventos(elemento){
        elemento.addEventListener('click',this.palabraElegida)
    }

    palabraElegida(event){
        this.arrAux = this.arrKeyLogo
        this.palabraSeleccionada = event.target.innerHTML;
        var spans = document.querySelectorAll('.span1')
        var flag=false
        
        for(var i=0; i< this.arrKeyLogo.length;i++){
            
            if(this.arrKeyLogo[i] === this.palabraSeleccionada){
                spans[i].innerHTML = this.palabraSeleccionada
                this.arrAux[i]=''
                flag =true
                this.puntos +=20
                this.cargarPuntaje()
            }
        }

        if(!flag){
            this.intentos -= 1
            this.puntos -=20
            this.verificaNivel()
            this.cargarPuntaje()
        }

        var validaPalabraEncontrada  = this.arrAux.filter(function(chara){
            if(chara !== ''){
                return chara
            }
        })
        
        if(validaPalabraEncontrada.length === 0){
            this.nivel +=1
            if (!this.verificaNivel())this.mostrarMensaje('level')
            
        }
        
    }

    verificaNivel(){
        
        if (this.nivel === 3){
            this.mostrarMensaje('success')
            return true
        }
        if((this.intentos === 0) || (this.puntos <=0)){
            this.mostrarMensaje('error')
            return true
        }

        return false
    }

    mostrarMensaje(tipo){
        if(tipo == 'success'){
            swal('Juego', 'Felicitaciones, ganaste el juego!', 'success')
        }
        
        if(tipo=='level'){
            swal('Juego', 'Pasaste al siguiente nivel', 'success')
            .then(() => {
                this.eliminarEventos()
                this.inicilizar()
            })
        }

        if(tipo=='error'){
            swal('Platzi', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => {
                this.eliminarEventos()
                this.load_game()
                this.inicilizar()
            })
        }
    }

    eliminarEventos(){
        var parrafo = document.querySelectorAll('.palabras-letras')
        parrafo.forEach(n => n.innerHTML='')

        var divButton = document.querySelectorAll('.container-buttons')
        divButton.forEach(b => b.innerHTML='')
    }
    
    

 
}

var juego = new Juego()