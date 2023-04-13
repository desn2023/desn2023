console.log("v20");

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
    whitePages: ["graduates", "work", "casestudy"],

    mobileMenuClose: function () {
        let menuBg = document.querySelector(".nav__background");

        if (menuBg.style.display == "block") {
            let menu = document.querySelector(".menu__close");
            menu.click();
            setTimeout(function () { return null; }, 400);
        } else {
            return null;
        }
    },

    bannerIn: function (after) {
        let tl = gsap.timeline ({
            onComplete: after
        });

        if (document.querySelector(".banner") !== null) {
            tl.to(".banner", {
                opacity: 1,
                duration: 0
            });
            tl.to(".banner", {
                height: "50px",
                duration: 0.4,
                ease: "power1.inOut"
            });
        }
    },

    bannerOut: function (after) {
        let tl = gsap.timeline({
            onComplete: after
        });

        if (document.querySelector(".banner") !== null) {
            tl.to(".banner", {
                height: "0px",
                duration: 0.4,
                ease: "power1.inOut"
            });
            tl.to(".banner", {
                opacity: 0,
                duration: 0
            });
        }
    },

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
            input = input.replace("/", "");
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
        } else {

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

        let margin;

        if (document.querySelector(".banner") == null) {
            margin = "-43px 0px 0px 0px";
        } else {
            margin = "-93px 0px 0px 0px";
        }

        let options = {
            root: null,
            rootMargin: margin,
            threshold: 0
        }

        if (global.observer !== undefined && global.marker !== undefined) {
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
    transitions: [
        {   name: 'white-white-transition',

            from: { namespace: global.whitePages },
            to: { namespace: global.whitePages },

            afterOnce(data) {
                if (global.blackPages.indexOf(data.current.namespace) == -1) {
                    global.invertNav(100);
                }
            },
            beforeLeave(data) {
                window.onscroll = "";
                // global.navBg("transparent", 0.4);
                // global.blackBetween(data);
                return global.mobileMenuClose();
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
                window.scrollTo(0, 0);
                global.navBg("transparent");
                // // gsap.to(".nav", {
                // //     backgroundColor: "transparent",
                // //     duration: 0.4
                // // });
            },
            enter(data) { // SEAN
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'black-white-transition',

            from: { namespace: global.blackPages },
            to: { namespace: global.whitePages },

            afterOnce(data) {
                if (global.blackPages.indexOf(data.current.namespace) == -1) {
                    global.invertNav(100);
                }
            },
            beforeLeave(data) {
                window.onscroll = "";
                global.invertNav(100, 0.4);
                global.navBg("white", 0.4);
                // global.blackBetween(data);
                return global.mobileMenuClose();
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
                window.scrollTo(0, 0);
                global.navBg("transparent");
                // gsap.to(".nav", {
                //     backgroundColor: "transparent",
                //     duration: 0.4
                // });
            },
            enter(data) { // SEAN
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'white-black-transition',

            from: { namespace: global.whitePages },
            to: { namespace: global.blackPages },

            afterOnce(data) {
                if (global.blackPages.indexOf(data.current.namespace) == -1) {
                    global.invertNav(100);
                }
            },
            beforeLeave(data) {
                window.onscroll = "";
                // global.navBg("transparent", 0.4);
                // global.blackBetween(data);
                return global.mobileMenuClose();
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
                window.scrollTo(0, 0);
                global.invertNav(0, 0.4);
                global.navBg("transparent");
                gsap.to("body", {
                    backgroundColor: "black",
                    duration: 0.4,
                    ease: "none"
                });
                // global.navBg("transparent", 0.4);
                // gsap.to(".nav", {
                //     backgroundColor: "transparent",
                //     duration: 0.4
                // });
            },
            enter(data) { // SEAN
                return gsap.from(data.next.container, {
                    opacity: 0,
                    delay: 0.2,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'black-black transition',

            from: { namespace: global.blackPages },
            to: { namespace: global.blackPages },

            afterOnce(data) {
                if (global.blackPages.indexOf(data.current.namespace) == -1) {
                    global.invertNav(100);
                }
            },
            beforeLeave(data) {
                window.onscroll = "";
                // global.navBg("transparent", 0.4);
                body.style.backgroundColor = "black";
                // global.blackBetween(data);
                return global.mobileMenuClose();
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
                window.scrollTo(0, 0);
                global.navBg("transparent");
                // global.navBg("transparent", 0.4);
                // gsap.to(".nav", {
                //     backgroundColor: "transparent",
                //     duration: 0.4
                // });
            },
            enter(data) { // SEAN
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                body.style.backgroundColor = "transparent";
            }
        }
    ],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                // global.invertNav(0, 0.4);
            },
            afterEnter() {
                home.init();
                // reset penrose
                penrose.counter = 0;
                penrose.init();
                window.onresize = function () {
                    global.mobileMenuClose();
                    penrose.setSize();
                }
            },
            beforeLeave() {
                // global.invertNav(100, 0.4);
                // global.navBg("transparent", 0.4);
            }
        },
        {
            namespace: 'graduates',
            beforeEnter() {
            },
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
                grads.init();
            }
        },
        {
            namespace: 'work',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'events',
            beforeEnter() {
                // global.invertNav(0, 0.4);     
            },
            beforeLeave() {
                // global.invertNav(100, 0.4);
                // global.navBg("transparent", 0.4);
            },
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                // global.invertNav(0, 0.4); 
            },
            beforeLeave() {
                // global.invertNav(100, 0.4);
                // global.navBg("transparent", 0.4);
            },
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'profile',
            beforeEnter() {
                // global.invertNav(0, 0.4);    
            },
            beforeLeave() {
                // global.invertNav(100, 0.4);
                // global.navBg("transparent", 0.4);
            },
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'casestudy',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        }
    ]
});

let initialNamespace = document.querySelector(".wrapper").getAttribute("data-barba-namespace");

if (global.blackPages.indexOf(initialNamespace) == -1) {
    global.invertNav(100);
}

global.navScroll();




// COUNTDOWN CLOCK

global.countdownDeadline = "2023/04/20 16:00";

global.countdownInit = function () { // set and start countdown

    // moved deadline to splashParams

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

        var timeinterval = setInterval(function () {
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

    clock('js-clock', global.countdownDeadline);
}

global.countdownInit();