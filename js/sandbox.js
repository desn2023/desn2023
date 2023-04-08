// old shuffle-randomize jQuery function

(function($) {
    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function() {
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });

        this.each(function(i) {
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);
    };
})(jQuery);

$(".showcase__item").shuffle();


window.onload = function () {
    document.querySelector(".underscore").style.height = "";
}

// penrose svg get sector coordinates

penrose.getSectCoords = function () {
    penrose.sects.forEach(function (sect) {

        let bounding = sect.getBoundingClientRect();
        
        let cx = Math.round(bounding.x + (bounding.width / 2));
        let cy = Math.round(bounding.y + (bounding.height / 2));

        sect.setAttribute("coordX", cx);
        sect.setAttribute("coordY", cy);
    });
}