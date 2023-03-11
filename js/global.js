console.log("global.js successfully loaded from desn2023.");


// UTILITY

function shuffleArray(array) { // randomizes order of items in an array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


// SHOWCASE ITEMS

function showcase() { // shuffle, reduce, split and populate

    // get elements

    let showcaseItems = Array.from(document.querySelectorAll(".showcase__item:not(.is--placeholder)"));
    let showcaseRows = document.querySelectorAll(".showcase__row"); // change class name if necessary

    showcaseItems.forEach(function (item, i) {
        item.id = "item-" + i;
    });

    if (showcaseItems.length > 0 && showcaseRows.length > 0) {

        // randomize order

        showcaseItems = shuffleArray(showcaseItems);


        // reduce items

        let quantity = 9; // number of items to show

        while (showcaseItems.length > quantity) { // reduce array length to 9
            showcaseItems.pop();
        }


        // split into groups

        let rowGroups = new Array();

        showcaseRows.forEach(function () { // rowGroups will have an array for each row
            rowGroups.push(new Array());
        });

        showcaseItems.forEach(function (node, i) {

            let group = Math.floor(i / showcaseRows.length);

            // if showcaseRows.length == 3
            // i:           0 1 2 3 4 5 6 7 8
            // group:       0 0 0 1 1 1 2 2 2

            rowGroups[group].push(node);

        });

        showcaseRows.forEach(function (row, i) {

            rowGroups[i].forEach(function (item) {
                row.appendChild(item);
            });

        });

    }
}


// RUNNING

let placeholders = document.querySelectorAll(".is--placeholder");
placeholders.forEach(function (element) { // remove placeholders
    element.remove();
});

window.onload = function () {
    showcase(); // populate showcase
}