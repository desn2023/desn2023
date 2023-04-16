console.log("v44 projects fix");

let body = document.querySelector("body");
let global;
let home;

global = { // global values and methods

    // IMPORTANT VARIABLES

    namespaces: ["home", "about", "profile", "events", "casestudy", "graduates", "work"],
    invertSelector: ".logo__wordmark, .nav__links, .nav__search, .menu__mobile",
    blackPages: ["home", "about", "profile", "events"],
    whitePages: ["graduates", "work", "casestudy"],
    countdownDeadline: "2023/04/20 16:00",
    initNamespace: document.querySelector(".wrapper").getAttribute("data-barba-namespace"),


    // GLOBAL ELEMENTS

    nav: Array.from(document.querySelectorAll(".nav")),
    banner: document.querySelector(".banner"),
    mobileMenuBg: document.querySelector(".nav__background"),
    mobileMenuCloseBtn: document.querySelector(".menu__close"),

    // TRANSITIONS

    transParams: {
        leave: {
            opacity: 0,
            duration: 0.4,
            delay: 0,
            ease: "power2.inOut"
        },
        enter: {
            opacity: 0,
            duration: 0.4,
            delay: 0,
            ease: "power2.inOut"
        },

        delayToBlack: 0.2
    },

    bannerIn: function (after) { // banner transition
        let tl = gsap.timeline ({
            onComplete: after
        });

        if (global.banner !== null) {
            tl.to(global.banner, {
                opacity: 1,
                duration: 0
            });
            tl.to(global.banner, {
                height: "50px",
                duration: 0.4,
                ease: "power1.inOut"
            });
        }
    },

    bannerOut: function (after) { // banner transition
        let tl = gsap.timeline({
            onComplete: after
        });

        if (global.banner !== null) {
            tl.to(global.banner, {
                height: "0px",
                duration: 0.4,
                ease: "power1.inOut"
            });
            tl.to(global.banner, {
                opacity: 0,
                duration: 0
            });
        }
    },

    invertNav: function (pct, dur = 0, eas = "none") { // sets invert filter on nav elements
        gsap.to(global.invertSelector, {
            filter: "invert(" + pct + ")",
            duration: dur,
            ease: eas
        });
    },

    navBg: function (colour, dur = 0, eas = "none") { // sets nav bg
        gsap.to(global.nav, {
            backgroundColor: colour,
            duration: dur,
            ease: eas
        });
    },

    bodyBg: function (colour, dur = 0, eas = "none") { // sets body bg
        gsap.to(body, {
            backgroundColor: colour,
            duration: dur,
            ease: eas
        })
    },

    mobileMenuClose: function () { // simulates click of mobile menu close button
        if (global.mobileMenuBg.style.display == "block") {
            global.mobileMenuCloseBtn.click();
            setTimeout(function () { return null; }, 400);
        } else {
            return null;
        }
    },

    resizeSlider: function (slider) { // doesn't work
        let firstImg = slider.querySelector(".cs__img");
        let firstImgHeight = firstImg.clientHeight;

        let wSlider = slider.querySelector(".slider");
        wSlider.style.height = firstImgHeight + "px";
    },

    resizeAllSliders: function () { // sets height of sliders to auto
        let sliders = Array.from(document.querySelectorAll(".slider"));
        sliders.forEach(function (slider) {
            // global.resizeSlider(slider);
            slider.style.height = "auto";
        });
    },

    randFeatWork: function () {

        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

        // get all of the little ones
        let featSmall = Array.from(wrapper.querySelectorAll(".project__list .project__item"));
    
        // randomize the order
        let randSmall = global.shuffleArray(featSmall);
    
        //turn off all but 4
        for (let i = 0; i < randSmall.length - 3; i++){
            // remove from html
            randSmall[i].remove();
        }
    
        // turn off another and move it to the big feature
        // get info and add it to the big one
        let featBig = global.elementNext(document.querySelector(".is--hero"));
        
        featBig.querySelector(".title.is--small:not(.is--grey)").innerHTML = randSmall[0].querySelector(".title:not(.is--small)").innerHTML;
        featBig.querySelector(".title.is--grey").innerHTML = randSmall[0].querySelector(".title.is--small").innerHTML;
        featBig.querySelector(".project__thumbnail").style = randSmall[0].querySelector(".project__thumbnail").getAttribute("style");
        featBig.querySelector(".project__thumbnail").href = randSmall[0].querySelector(".project__link").getAttribute("href");
        featBig.querySelector(".link:not(.is--udl)").href = randSmall[0].querySelector(".link").getAttribute("href");

        // remove from small
        randSmall[0].remove();    
    },

    shuffleArray: function (array) { // shuffle items in array
    
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    
        return array; 
    },

    replaceChar: function (input) { // deletes domain, line breaks, slashes from string

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

    hrefToNamespace: function (href) { // converts URL to namespace

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

    elementNext: function (nodelist) { // returns first-and-only, or second element of nodelist

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

    checkNavScroll: function () { // returns true if opaque nav is on

        let banner = document.querySelector(".banner");
        let marker = document.querySelector(".marker");
        let threshold = 93; // WITH BANNER

        if (banner == null) {
            threshold = 43; // WITHOUT BANNER
        }

        if (marker.getBoundingClientRect().top <= threshold) {
            return true;
        } else {
            return false;
        }
    },

    navScroll: function () { // creates intersection observer to watch marker

        let margin;

        if (document.querySelector(".banner") == null) {
            margin = "-43px 0px 0px 500px"; // WITHOUT BANNER
        } else {
            margin = "-93px 0px 0px 500px"; // WITH BANNER
        }

        let options = { // options for IntersectionObserver
            root: null,
            rootMargin: margin,
            threshold: 0
        }

        // if global.observer exists, disconnect
        if (global.observer !== undefined && global.observer !== null) {
            global.observer.disconnect();
        }

        // get target barba container
        let container = global.elementNext(document.querySelectorAll(".wrapper"));

        let callback = function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { // if marker is in viewport

                    global.navBg("transparent");
                    
                    let namespace = container.getAttribute("data-barba-namespace");
                    
                    if (
                        global.blackPages.indexOf(namespace) == -1
                    ) {
                        global.invertNav(100); // if white page
                    } else {
                        global.invertNav(0); // if black page
                    }
                } else { // if marker not in viewport

                    let namespace = container.getAttribute("data-barba-namespace");

                    if (global.blackPages.indexOf(namespace) == -1 || namespace == "home") {
                        // if white page or home, opaque nav is white
                        global.navBg("white");
                        global.invertNav(100);
                    } else {
                        // if black page, opaque nav is black
                        global.navBg("black");
                    }
                }
            });
        }

        // start observing

        global.observer = new IntersectionObserver(callback, options);
        global.marker = global.elementNext(document.querySelectorAll(".marker"));

        if (global.marker !== undefined) {
            global.observer.observe(global.marker);
        }
    },

    preventScroll: function () {
        window.onscroll = function () {
            window.scrollTo(0,0);
        }
    },

    countdownInit: function () { // set and start countdown

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
}




barba.init ({
    preventRunning: true,
    sync: true,
    transitions: [
        {   name: 'white-white-transition',

            from: { namespace: global.whitePages },
            to: { namespace: global.whitePages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'black-white-transition',

            from: { namespace: global.blackPages },
            to: { namespace: global.whitePages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }

                if (global.checkNavScroll()) {
                    if (data.current.namespace == "home") {

                    } else {
                        body.style.backgroundColor = "black";
                    }
                } else {
                    global.invertNav(100, global.transParams.leave.duration, "power2.in");
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                if (global.checkNavScroll() && data.current.namespace !== "home") {
                    window.scrollTo(0, 0);
                    global.navBg("transparent");
                    global.invertNav(100, global.transParams.enter.duration);
                    global.bodyBg("white", global.transParams.enter.duration);
                    // gsap.to("body", {
                    //     backgroundColor: "white",
                    //     duration: global.transParams.enter.duration,
                    //     ease: "none"
                    // });
                }
                window.scrollTo(0, 0);
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'white-black-transition',

            from: { namespace: global.whitePages },
            to: { namespace: global.blackPages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
                global.invertNav(0, global.transParams.enter.duration);
                global.navBg("transparent");
                global.bodyBg("black", global.transParams.enter.duration);
                // gsap.to("body", {
                //     backgroundColor: "black",
                //     duration: global.transParams.enter.duration,
                //     ease: "none"
                // });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: global.transParams.enter.opacity,
                    delay: global.transParams.delayToBlack,
                    duration: global.transParams.enter.duration,
                    ease: global.transParams.enter.ease
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: 'black-black transition',

            from: { namespace: global.blackPages },
            to: { namespace: global.blackPages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                if (global.checkNavScroll() && data.current.namespace == "home") {

                } else {
                    body.style.backgroundColor = "black";
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                if (data.current.namespace == "home" && global.checkNavScroll()) {
                    window.scrollTo(0, 0);
                    global.invertNav(0, global.transParams.enter.duration);
                    global.navBg("transparent");
                    global.bodyBg("black", global.transParams.enter.duration);
                    // gsap.to("body", {
                    //     backgroundColor: "black",
                    //     duration: global.transParams.enter.duration,
                    //     ease: "none"
                    // });
                } else {
                    window.scrollTo(0, 0);
                    global.navBg("transparent");
                }
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: "black-casestudy transition",

            from: { namespace: global.blackPages },
            to: { namespace: "casestudy"},

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                if (global.checkNavScroll()) {
                    if (data.current.namespace !== "home") {
                        body.style.backgroundColor = "black";
                    }
                } else {
                    global.invertNav(100, global.transParams.leave.duration, "power2.in");
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                if (global.checkNavScroll() && data.current.namespace !== "home") {
                    window.scrollTo(0, 0);
                    global.navBg("transparent");
                    global.invertNav(100, global.transParams.enter.duration);
                    global.bodyBg("white", global.transParams.enter.duration);
                    // gsap.to("body", {
                    //     backgroundColor: "white",
                    //     duration: global.transParams.enter.duration,
                    //     ease: "none"
                    // });  
                }
                window.scrollTo(0, 0);
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navBg("white");
                cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: "white-casestudy transition",

            from: { namespace: global.whitePages },
            to: { namespace: "casestudy"},

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navBg("white");
                cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: "casestudy-black transition",

            from: { namespace: "casestudy"},
            to: { namespace: global.blackPages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
                global.invertNav(0, global.transParams.enter.duration);
                global.navBg("transparent");
                global.bodyBg("black", global.transParams.enter.duration);
                // gsap.to("body", {
                //     backgroundColor: "black",
                //     duration: global.transParams.enter.duration,
                //     ease: "none"
                // });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: global.transParams.enter.opacity,
                    delay: global.transParams.delayToBlack,
                    duration: global.transParams.enter.duration,
                    ease: global.transParams.enter.ease
                });
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
            
        },
        {   name: "casestudy-white transition",

            from: { namespace: "casestudy"},
            to: { namespace: global.whitePages },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navScroll();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {   name: "casestudy-casestudy transition",

        from: { namespace: "casestudy"},
        to: { namespace: "casestudy" },

            // afterOnce(data) {
            //     if (global.blackPages.indexOf(data.current.namespace) == -1) {
            //         global.invertNav(100);
            //     }
            // },
            beforeLeave(data) {
                global.preventScroll();
                if (global.observer !== undefined && global.observer !== null) {
                    global.observer.disconnect();
                }
                return global.mobileMenuClose();
            },
            leave(data) {
                return gsap.to(data.current.container, global.transParams.leave);
            },
            beforeEnter(data) {
                window.scrollTo(0, 0);
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navBg("white");
                cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        }
    ],

    views: [
        {   namespace: 'home',
            afterEnter() {
                // reset penrose
                penrose.counter = 0;
                penrose.init();
                global.randFeatWork();
                window.onresize = function () {
                    global.mobileMenuClose();
                    penrose.setSize();
                }
            }
        },
        {   namespace: 'graduates',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
                grads.init();
            }
        },
        {   namespace: 'work',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
                projects.init();
            }
        },
        {   namespace: 'events',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {   namespace: 'about',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {   namespace: 'profile',
            afterEnter() {
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        },
        {   namespace: 'casestudy',
            afterEnter() {
                // cmsSlider();
                global.resizeAllSliders();
                window.onresize = function () {
                    global.mobileMenuClose();
                }
            }
        }
    ]
});




// on first load

if (global.blackPages.indexOf(global.initNamespace) == -1) {
    global.invertNav(100);
}

global.navScroll();
global.countdownInit();