const scrolldem0 = new Object();

scrolldem0.offset = 150; // default distance to scroll past [+] or short of [-] destination element
scrolldem0.playhead = 0; // which scrolldem0.list animation to play on first keydown event
scrolldem0.running = false; // whether a scrolldem0.list animation is currently in progress

scrolldem0.anims = { // gsap animation parameters
    default: {
        duration: 1,
        ease: "power4.inOut"
    }
}

scrolldem0.list = [ // list of animations to play
    /* {
        selector: ""
        params: {}
        offset: undefined || null || integer
    } */
]

scrolldem0.init = function () { // start scrolldem0 engine

    document.addEventListener('keydown', function (event) {
        if (event.key === 'k' && !scrolldem0.running) {
            scrolldem0.play();
        }
    });
}

scrolldem0.play = function (playhead = scrolldem0.playhead, movePlayhead = true) { // on keydown

    scrolldem0.running = true;

    const playItem = new Object();

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

    const destBound = document.querySelector(playItem.selector).getBoundingClientRect();
    const scrollDist = destBound.top + playItem.offset;

    playItem.params.scrollTo = scrollDist;
    playItem.params.onComplete = function () {
        scrolldem0.running = false;
    }

    gsap.to(window, playItem.params);

    if (movePlayhead) {
        scrolldem0.playhead++;
    }
} 