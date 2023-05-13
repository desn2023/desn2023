/*

QUICK START INSTRUCTIONS

1. For each element you want to scroll to, set its id to "scrolldem0-0", "scrolldem0-1", "scrolldem0-2" etc.
2. Initialize scrolldem0 by running scrolldem0.init(); in the browser console.
3. Press 'k' to play scroll animation.


FUTURE FEATURES
- Back/forward
- Skipping numbers
- Starting from a number not 0
- Use JavaScript classes instead
- Specify animation index for list object
- Import gsap?

*/

const scrolldem0 = new Object();

scrolldem0.trigger = 'k'; // keyboard key which triggers scroll animation
scrolldem0.offset = -150; // default distance to scroll past [+] or short of [-] destination element
scrolldem0.playhead = 0; // which scrolldem0.list animation to play on first keydown event
scrolldem0.running = false; // whether a scrolldem0.list animation is currently in progress

scrolldem0.anims = { // gsap animation parameters
    default: {
        duration: 0.8,
        ease: "power4.inOut"
    }
}

scrolldem0.list = [ // list of animations to play
    {
        offset: -80,
        selector: "#test"
    },
    {}, {},
    {
        offset: -115
    },
    {},
    {
        offset: -240
    },
    {
        offset: 500
    },
    {
        offset: 1800
    },
    {
        offset: 3100
    },
    {}, {}, {},
    {
        offset: 570
    },
    {
        offset: -70
    }, {
        offset: 100
    }, {
        offset: 600
    }, {
        offset: 1200
    }
]

scrolldem0.ancestorList = function(element) {
    var ancestors = [];
    var currentElement = element.parentNode;
    while (currentElement !== null) {
        ancestors.push(currentElement);
        currentElement = currentElement.parentNode;
    }
    return ancestors;
}

scrolldem0.play = function(playhead = scrolldem0.playhead, movePlayhead = true) { // on keydown

    scrolldem0.running = true;

    let playItem = new Object();

    if (scrolldem0.list[playhead] !== undefined) {
        playItem = scrolldem0.list[playhead];
    }

    if (playItem.selector == null || playItem.selector == undefined) {
        playItem.selector = "#scrolldem0-" + playhead;
    }

    if (playItem.params == null || playItem.params == undefined) {
        playItem.params = scrolldem0.anims.default;
    }

    if (playItem.offset == null || playItem.offset == undefined) {
        playItem.offset = scrolldem0.offset;
    }

    const destElem = document.querySelector(playItem.selector);

    if (destElem !== null) {
        const destBound = destElem.getBoundingClientRect();
        const scrollDist = window.scrollY + destBound.top + playItem.offset;

        playItem.params.scrollTo = scrollDist;
        playItem.params.onComplete = function() {
            scrolldem0.running = false;
        }

        gsap.to(window, playItem.params);
        console.log("scrolldem0 scrolling");
        console.log(scrolldem0.ancestorList(destElem));

        if (movePlayhead) {
            scrolldem0.playhead++;
        }
    } else {
        scrolldem0.reinit();
    }
}

scrolldem0.init = function() { // start scrolldem0 engine

    document.addEventListener('keydown', function(event) {
        if (event.key === scrolldem0.trigger && !scrolldem0.running) {
            scrolldem0.play();
        } else if (event.key === "r") {
            scrolldem0.reinit();
        }
    });

    console.log("scrolldem0 initialized");
}

scrolldem0.reinit = function() {
    scrolldem0.playhead = 0;
    scrolldem0.running = false;
    console.log("scrolldem0 reinitialized");
}

scrolldem0.init();