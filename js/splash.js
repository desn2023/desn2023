console.log("global.js successfully loaded from desn2023.");





// GLOBAL NO BARBA

let body = document.querySelector("body");






// SPLASH PAGE STUFF: EVERYTHING BELOW --> BARBA AFTER ENTER

let splashParams = { // all variables for underscore animation, showcase, and countdown
    underscore: {
        class: ".old__underscore", // class of underscore span
        endWidth: "7vw", // width of underscore span at the end of initial animation
        delay: 4000, // when to start flashing
        interval: 750 // length of flash
    },
    showcase: {
        quantity: 9 // number of items to show
    },
    countdown: {
        deadline: "2023/04/20 16:00"
    }
}






// UTILITY

function shuffleArray(array) { // randomizes order of items in an array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}






// SHOWCASE ITEMS

function showcaseInit() { // shuffle, reduce, split and populate

    showcaseRemovePlaceholders(); // remove placeholder items

    // get elements

    let showcaseItems = Array.from(document.querySelectorAll(".old__showcase__item:not(.is--placeholder)"));
    let showcaseRows = document.querySelectorAll(".old__showcase__row"); // change class name if necessary

    showcaseItems.forEach(function(item, i) {
        item.id = "item-" + i;
    });

    if (showcaseItems.length > 0 && showcaseRows.length > 0) {

        // randomize order

        showcaseItems = shuffleArray(showcaseItems);


        // reduce items

        let quantity = splashParams.showcase.quantity; // number of items to show

        while (showcaseItems.length > quantity) { // reduce array length to 9
            showcaseItems.pop();
        }


        // split into groups

        let rowGroups = new Array();

        showcaseRows.forEach(function() { // rowGroups will have an array for each row
            rowGroups.push(new Array());
        });

        showcaseItems.forEach(function(node, i) {

            let group = Math.floor(i / showcaseRows.length);

            // if showcaseRows.length == 3
            // i:           0 1 2 3 4 5 6 7 8
            // group:       0 0 0 1 1 1 2 2 2

            rowGroups[group].push(node);

        });

        showcaseRows.forEach(function(row, i) {

            rowGroups[i].forEach(function(item) {
                row.appendChild(item);
            });

        });

    }
}

function showcaseRemovePlaceholders() {
    let placeholders = document.querySelectorAll(".is--placeholder");
    placeholders.forEach(function(element) { // remove placeholders
        element.remove();
    });
}





// UNDERSCORE FLASH

let underscore = document.querySelector(splashParams.underscore.class);
let flashInterval;
let removeHeightInterval;

function underscoreInit() {
    setTimeout(underscoreCheck, splashParams.underscore.delay);
}

function underscoreCheck() {

    if (underscore.style.width == splashParams.underscore.endWidth) {
        flashInterval = setInterval(underscoreFlash, splashParams.underscore.interval);
    } else {
        setTimeout(underscoreCheck, 2000);
    }

}

function underscoreFlash() {

    if (underscore.style.opacity == 1) {
        underscore.style.opacity = 0;
    } else {
        underscore.style.opacity = 1;
    }
}

function underscoreRemoveHeight() {
    if (underscore.style.height !== "") {
        underscore.style.height = "";
    }
}





// RUNNING

window.onload = function() {
    underscoreInit();
    countdownInit();
    showcaseInit();
    underscoreRemoveHeight();
    removeHeightInterval = setInterval(underscoreRemoveHeight, 250);
}