document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function(){
        if (sobreFestival.getBoundingClientRect().bottom < 1){ //si es menor a 1 (ya lo pasaste)
            header.classList.add('fixed'); 
        }else{
            header.classList.remove('fixed'); 
        }
    });
}
function scrollNav(){
    const navLinks  = document.querySelectorAll('.navegacion-principal a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionscroll= e.target.getAttribute('href'); //selecciona el link por el atributo href
            const section = document.querySelector(sectionscroll); 

            section.scrollIntoView({behavior: 'smooth'}); //hace el efcto scroll
        })
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    const cantidad_imagenes = 16;

    for (let i = 1; i <= cantidad_imagenes; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt= `imagen ${i}`;

        //Event Handler
        imagen.onclick = function(){
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);

        // console.log(imagen);
    }
};

function mostrarImagen(i){
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt= `imagen ${i}`;


    //Generar Modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.onclick = cerrarModal
    

    //boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.classList.add('close');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
    
    console.log(modal);
    
}

function cerrarModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fadeOut');
    
    setTimeout(() => {
        modal?.remove(); //modal? verifica si existe

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace(){
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop; //distancia de la section al body
            const sectionHeight = section.clientHeight; //mide cuanto mide cada section

            if (window.scrollY >=(sectionTop-sectionHeight / 3))  //detectar cual esta mas visible
            { 
                actual = section.id; //guarda el id de la section visible
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');  //remueve la clase active de todos los enlaces
            if (link.getAttribute('href') === '#'+ actual ) {
                link.classList.add('active');
            }
        });
    })
}


