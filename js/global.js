console.log("v07");

let body = document.querySelector("body");
let global;

global = {
    invertSelector: ".logo__wordmark, .nav__links, .nav__search, .menu__mobile",
    invertNav: function (pct, dur = 0) {
        gsap.to(global.invertSelector, {
            filter: "invert(" + pct + ")",
            duration: dur
        });
    },

    navBg: function (colour, dur = 0) {
        gsap.to(".nav", {
            backgroundColor: colour,
            duration: dur
        });
    },

    blackPages: ["home", "about", "profile", "events"],

    blackBetween: function (data) {
        if (
            global.blackPages.indexOf(data.current.namespace) !== -1 &&
            global.blackPages.indexOf(data.next.namespace) !== -1
        ) {
            body.style.backgroundColor = "black";
        }
    },

    elementNext: function (nodelist) {
        let element;

        if (nodelist.length > 1) {
            element = nodelist[1];
        } else {
            element = nodelist[0];
        }

        return element;
    },

    navScroll: function () {

        let options = {
            root: null,
            rootMargin: "-44px 0px 0px 0px",
            threshold: 0
        }
    
        if (global.observer !== undefined) {
            global.observer.unobserve(global.marker);
        }

        let container = global.elementNext(document.querySelectorAll(".wrapper"));

        let callback = function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let namespace = container.getAttribute("data-barba-namespace");
                    // gsap.to(".nav", {
                    //     backgroundColor: "transparent",
                    //     duration: 0
                    // });
                    global.navBg("transparent");

                    if (
                        global.blackPages.indexOf(namespace) == -1
                    ) {
                        // gsap.to(global.invertSelector, {
                        //     filter: "invert(100%)",
                        //     duration: 0
                        // });
                        global.invertNav(100);
                    } else {
                        // gsap.to(global.invertSelector, {
                        //     filter: "invert(0%)",
                        //     duration: 0
                        // });
                        global.invertNav(0);
                    }
                } else {
                    let namespace = container.getAttribute("data-barba-namespace");
                    if (global.blackPages.indexOf(namespace) == -1 || namespace == "home"
                    ) {
                        // gsap.to(".nav", {
                        //     backgroundColor: "white",
                        //     duration: 0,
                        // });
                        global.navBg("white");
                        // gsap.to(global.invertSelector, {
                        //     filter: "invert(100%)",
                        //     duration: 0
                        // });
                        global.invertNav(100);
                    } else {
                        // gsap.to(".nav", {
                        //     backgroundColor: "black",
                        //     duration: 0,
                        // });
                        global.navBg("black");
                    }
                }
            });
        }

        global.observer = new IntersectionObserver(callback, options);
        global.marker = global.elementNext(document.querySelectorAll(".marker"));

        if (global.marker !== undefined) {
            global.observer.observe(global.marker);
        }
    }
}

barba.init ({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',
        afterOnce(data) {
            if (global.blackPages.indexOf(data.current.namespace) == -1) {
                // gsap.to(global.invertSelector, {
                //     duration: 0,
                //     filter: "invert(100%)"
                // });
                global.invertNav(100);
            }
        },
        beforeLeave(data) {
            window.onscroll = "";
        },
        leave(data) {
            return gsap.to(data.current.container, {
                // delay: 0.5,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        },
        beforeEnter(data) {
            window.scrollTo(0,0);
            gsap.to(".nav", {
                backgroundColor: "transparent",
                duration: 0.4
            });
            penrose.counter = 0;
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        },
        afterEnter(data) {
            global.navScroll();
            body.style.backgroundColor = "transparent";
        }
    }],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(0%)",
                //     duration: 0.4
                // });    
                global.invertNav(0, 0.4);
            },
            afterEnter() {
                penrose.init();
                window.onresize = function() {
                    penrose.setSize();
                }
            },
            beforeLeave() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(100%)",
                //     duration: 0.4
                // }); 
                global.invertNav(100, 0.4);
            }
        },
        {
            namespace: 'graduates',
            beforeEnter() {
            },
            afterEnter() {
                grads.init();
            }
        },
        {
            namespace: 'work'
        },
        {
            namespace: 'events',
            beforeEnter() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(0%)",
                //     duration: 0.4
                // });
                global.invertNav(0, 0.4);     
            },
            beforeLeave() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(100%)",
                //     duration: 0.4
                // });
                global.invertNav(100, 0.4);
            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(0%)",
                //     duration: 0.4
                // });
                global.invertNav(0, 0.4); 
            },
            beforeLeave() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(100%)",
                //     duration: 0.4
                // }); 
                global.invertNav(100, 0.4);
            }
        },
        {
            namespace: 'profile',
            beforeEnter() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(0%)",
                //     duration: 0.4
                // });
                global.invertNav(0, 0.4);    
            },
            beforeLeave() {
                // gsap.to(global.invertSelector, {
                //     filter: "invert(100%)",
                //     duration: 0.4
                // });
                global.invertNav(100, 0.4);
            }
        }
    ]
});

let initialNamespace = document.querySelector(".wrapper").getAttribute("data-barba-namespace");

if (global.blackPages.indexOf(initialNamespace) == -1) {
    // gsap.to(global.invertSelector, {
    //     duration: 0,
    //     filter: "invert(100%)"
    // });
    global.invertNav(100); 
}

global.navScroll();