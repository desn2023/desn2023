console.log("v12");

let body = document.querySelector("body");
let global;
let home;

home = {
    init: function () { // SEAN
        // query elements
        // global.elementNext(document.querySelectorAll(selector));
    
    }
}

global = {
    namespaces: ["home", "about", "profile", "events", "casestudy", "graduates", "work"],
    invertSelector: ".logo__wordmark, .nav__links, .nav__search, .menu__mobile",
    blackPages: ["home", "about", "profile", "events"],

    invertNav: function (pct, dur = 0) {
        gsap.to(global.invertSelector, {
            filter: "invert(" + pct + ")",
            duration: dur,
            ease: "none"
        });
    },

    navBg: function (colour, dur = 0) {
        gsap.to(".nav", {
            backgroundColor: colour,
            duration: dur,
            ease: "none"
        });
    },
    replaceChar: function (input) { // delets domain, line breaks, slashes from string

        // replace domain
        input = input.replace (
            window.location.protocol + "/" + window.location.hostname, ""
        );

        // replace # and ? parts
        input = input.split("#")[0];
        input = input.split("?")[0];

        // replace breaks
        input = input.replace(/(\r\n|\n|\r)/gm, "");

        // replace slashes
        for (let i = 0; i < input.split("/").length - 1; i++) {
            input = input.replace("/","");
        }

        return input;
    },

    isElement: function (input) { // returns true if input is an element
        return input instanceof Element;
    },

    hrefToNamespace: function (href) {

        href = global.replaceChar(href);

        let listIndex = global.namespaces.indexOf(href);

        if (href == "") {
            href = "home";
            return href;
        } else if (href == "graduates") {
            return href;
        } else if (href == "work") {
            return href;
        } else if (href.indexOf("graduates") !== -1) {
            return "profile";
        } else if (href.indexOf("work") !== -1) {
            return "casestudy";
        } else if (listIndex !== -1) {
            return global.namespaces[listIndex];
        }

    },

    blackBetween: function (data) {

        let path;

        let child = data.trigger.querySelector("a");

        if (global.isElement(data.trigger)) {
            if (data.trigger.tagName == "A" && data.trigger.hasAttribute("href")) {
                path = global.hrefToNamespace(data.trigger.getAttribute("href"));
            }
            else if (global.isElement(child) && child.hasAttribute("href")) {
                path = global.hrefToNamespace(child.getAttribute("href"));
            } else {
                return null;
            }
        } else if (data.trigger == "back") {
            return null;
        } else if (data.trigger == "forward") {
            return null;
        } else {
            return null;
        }

        if (
            path !== null && path !== undefined &&
            global.blackPages.indexOf(data.current.namespace) !== -1 &&
            global.blackPages.indexOf(path) !== -1
        ) {
            body.style.backgroundColor = "black";
        }
    },

    elementNext: function (nodelist) {

        if (global.isElement(nodelist)) {
            return nodelist;
        }

        if (nodelist == undefined) {
            return nodelist;
        }

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

                    global.navBg("transparent");

                    if (
                        global.blackPages.indexOf(namespace) == -1
                    ) {
                        global.invertNav(100);
                    } else {
                        global.invertNav(0);
                    }
                } else {
                    let namespace = container.getAttribute("data-barba-namespace");
                    if (global.blackPages.indexOf(namespace) == -1 || namespace == "home"
                    ) {
                        global.navBg("white");
                        global.invertNav(100);
                    } else {
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
                global.invertNav(100);
            }
        },
        beforeLeave(data) {
            window.onscroll = "";
            global.blackBetween(data);
        },
        leave(data) { // SEAN
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
        },
        enter(data) { // SEAN
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
                global.invertNav(0, 0.4);
            },
            afterEnter() {
                home.init();
                // reset penrose
                penrose.counter = 0;
                penrose.init();
                window.onresize = function() {
                    penrose.setSize();
                }
            },
            beforeLeave() {
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
                global.invertNav(0, 0.4);     
            },
            beforeLeave() {
                global.invertNav(100, 0.4);
            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                global.invertNav(0, 0.4); 
            },
            beforeLeave() {
                global.invertNav(100, 0.4);
            }
        },
        {
            namespace: 'profile',
            beforeEnter() {
                global.invertNav(0, 0.4);    
            },
            beforeLeave() {
                global.invertNav(100, 0.4);
            }
        }
    ]
});

let initialNamespace = document.querySelector(".wrapper").getAttribute("data-barba-namespace");

if (global.blackPages.indexOf(initialNamespace) == -1) {
    global.invertNav(100); 
}

global.navScroll();