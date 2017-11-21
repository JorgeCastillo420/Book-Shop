$.getJSON("https://api.myjson.com/bins/udbm5", function (json) {

    books = json.books;

    activeisotope();
   
    crearlibro(books);


});




function crearlibro() {

//    var libro = document.getElementById("libro");


    for (var i = 0; i < books.length; i++) {
        //crear div
        var portada = books[i].portada;
        var deta = books[i].detalle;
        var descripcion = books[i].descripcion;
        var titulo = books[i].titulo;
        
        var padre = $("<div/>").addClass("flip-container");
        var midiv = $("<div/>").addClass("flipper");
        //crear div para la animacion
        var front = $("<div/>").addClass("front");
        var back = $("<div/>").addClass("back");

        var titulo1 = $("<div/>").addClass("titulo1");
        var desc = $("<div/>").addClass("desc");
        var botton = $("<button/>").addClass("botton").attr("href",deta).attr("data-fancybox", "gallery");
        
        var imgPortada = $("<img/>").addClass("lbr").attr("src", portada);
        
        front.append(imgPortada);

        back.append(titulo1);
        back.append(desc);
        back.append(botton);
        botton.append("GALLERY");

        midiv.append(front);
        midiv.append(back);

        padre.append(midiv);

        $("#libro").append(padre).isotope("addItems", padre);
        
        desc.html(descripcion);
        titulo1.html(titulo);
        
//        libro.append(padre);
        

        // variable para la otra portada
//        desc.textContent = books[i].descripcion;
//        titulo1.textContent = books[i].titulo;


//        imgPortada.setAttribute("src", portada);
//        imgPortada.setAttribute("class", "lbr");

//        botton.attr("data-fancybox", "gallery");
//        botton.attr("href", deta);
//        botton.attr("class", "botton");

//        titulo1.attr("class", "titulo1");
//        desc.attr("class", "desxc");
//
//        midiv.attr("class", "flipper");
//        padre.attr("class", "flip-container");
//
//        front.attr("class", "front");
//        back.attr("class", "back");

        //meter titulo en div
        //coger el div del html
        //meter el div credo en el del html
        //        midiv.innerHTML = imgPortada


    }

}
//

var qsRegex;

function activeisotope() {
    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.flip-container',
        layoutMode: 'fitRows',
        filter: function () {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        }
    });
    
    $(document).ready(debounce(function(){
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }, 10));

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
        console.log("hola");
    }, 200));
}

function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
        if (timeout) {
            clearTimeout(timeout);
        }

        function delayed() {
            fn();
            timeout = null;
        }
        timeout = setTimeout(delayed, threshold || 100);
    }
}
