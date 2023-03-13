console.log("global.js successfully loaded from desn2023.");





// IMPORTANT VARIABLES

let underscoreParams = { // underscore-related variables
    class: ".underscore", // class of underscore span
    endWidth: "7vw", // width of underscore span at the end of initial animation
    delay: 7000, // when to start flashing
    interval: 750 // length of flash
}

let showcaseParams = { // showcase-related variables
    quantity: 9 // number of items to show
}




// UTILITY

function shuffleArray(array) { // randomizes order of items in an array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}




// COUNTDOWN CLOCK

function countdown() {

    var deadline = '2023/04/20 16:00';

    function pad(num, size) {
        var s = "0" + num;
        return s.substring(s.length - size);
    }

    // fixes "Date.parse(date)" on safari
    function parseDate(date) {
        const parsed = Date.parse(date);
        if (!isNaN(parsed)) return parsed
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
    }

    function getTimeRemaining(endtime) {
        let total = parseDate(endtime) - Date.parse(new Date())
        let seconds = Math.floor((total / 1000) % 60)
        let minutes = Math.floor((total / 1000 / 60) % 60)
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        let days = Math.floor(total / (1000 * 60 * 60 * 24))

        return { total, days, hours, minutes, seconds };
    }

    function clock(id, endtime) {
        let days = document.getElementById(id + '-days')
        let hours = document.getElementById(id + '-hours')
        let minutes = document.getElementById(id + '-minutes')
        let seconds = document.getElementById(id + '-seconds')

        var timeinterval = setInterval(function() {
            var time = getTimeRemaining(endtime);

            if (time.total <= 0) {
                clearInterval(timeinterval);
            } else {
                days.innerHTML = pad(time.days, 2);
                hours.innerHTML = pad(time.hours, 2);
                minutes.innerHTML = pad(time.minutes, 2);
                seconds.innerHTML = pad(time.seconds, 2);
            }
        }, 1000);
    }

    clock('js-clock', deadline);
}




// SHOWCASE ITEMS

function showcase() { // shuffle, reduce, split and populate

    // get elements

    let showcaseItems = Array.from(document.querySelectorAll(".showcase__item:not(.is--placeholder)"));
    let showcaseRows = document.querySelectorAll(".showcase__row"); // change class name if necessary

    showcaseItems.forEach(function(item, i) {
        item.id = "item-" + i;
    });

    if (showcaseItems.length > 0 && showcaseRows.length > 0) {

        // randomize order

        showcaseItems = shuffleArray(showcaseItems);


        // reduce items

        let quantity = showcaseParams.quantity; // number of items to show

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




// UNDERSCORE FLASH

function underscore() {

    setTimeout(underscoreCheck, underscoreParams.delay);

}

function underscoreCheck(underscore = document.querySelector(underscoreParams.class)) {
        
    if (underscore.style.width == underscoreParams.endWidth) {
            setInterval(underscoreFlash, underscoreParams.interval);
            underscore.style.height = "";
    } else {
        setTimeout(underscoreCheck, 2000);
    }

}

function underscoreFlash(underscore = document.querySelector(underscoreParams.class)) {

    if (underscore.style.opacity == 1) {
        underscore.style.opacity = 0;
    } else {
        underscore.style.opacity = 1;
    }
}




// RUNNING

let placeholders = document.querySelectorAll(".is--placeholder");
placeholders.forEach(function(element) { // remove placeholders
    element.remove();
});

window.onload = function() {
    underscore();
    countdown();
    showcase();
}

window.onresize = function() {
    underscoreCheck();
}