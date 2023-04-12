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

function sortIntoArrays(categoryTxt, items, randomize) {

    let twoGroups = {
        topItems: new Array(),
        bottomItems: new Array()
    }

    // sort into two groups based on top category
    items.forEach(function(grad) {
        let gradTop = grad.querySelector(".grads__td");

        if (gradTop == categoryTxt) {
            twoGroups.topItems.push(grad);
        } else {
            twoGroups.bottomItems.push(grad);
        }
    });

    // randomize
    if (randomize) {
        twoGroups.topItems = shuffleArray(twoGroups.topItems);
        twoGroups.bottomItems = shuffleArray(twoGroups.bottomItems);
    }

    return twoGroups;
}

    // // sort and randomize both arrays
    // let twoGroups = sortIntoArrays(categoryTxt, gradsItems, true);

    // // remove the elements the HTML
    // gradsItems.forEach(function(grad) {
    //     grad.remove();
    // });
    
    // // re-append in a randomized order

    // for (let i=0; i<twoGroups.topItems.length; i++){
    //     gradsList.append(twoGroups.topItems[i]);
    // };

    // for (let i=0; i<twoGroups.bottomItems.length; i++){
    //     gradsList.append(twoGroups.bottomItems[i]);
    // };


    function shuffleArray(array) { // shuffle items in array

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    
        return array;
    }
    
    function alphabetArray(node) {
    
    }