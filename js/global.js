console.log("v116 moving code");

let body = document.querySelector("body");
let global;
let home;




// GLOBAL VALUES AND METHODS

global = {

    // IMPORTANT VARIABLES

    namespaces: ["home", "about", "profile", "events", "casestudy", "graduates", "work"],
    invertSelector: ".logo__wordmark, .nav__links, .search__background, .menu__mobile",
    blackPages: ["home", "profile", "events"],
    whitePages: ["graduates", "work", "about"],
    countdownDeadline: "2023/04/20 16:00",
    initNamespace: document.querySelector(".wrapper").getAttribute("data-barba-namespace"),
    searchOpen: false,

    // GLOBAL ELEMENTS

    nav: Array.from(document.querySelectorAll(".nav")),
    banner: document.querySelector(".banner"),
    mobileMenuBg: document.querySelector(".nav__background"),
    mobileMenuCloseBtn: document.querySelector(".menu__close"),
    searchBtn: document.querySelector(".nav__links.is--search"),
    searchTrigger: document.querySelector(".search__trigger"),
    searchInput: document.querySelector(".search__input"),
    searchClose: document.querySelector(".search__link.is--close"),
    searchMobile: document.querySelector(".icon__menu:first-child"),
    searchBackground: document.querySelector(".search__background"),




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

    bannerIn: function(after) { // banner transition
        let tl = gsap.timeline({
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

    bannerOut: function(after) { // banner transition
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




    // SEARCH

    searchInit: function() { // set up search disciplines

        // delete invisible ones

        let searchList = document.querySelector(".project__list.is--search");
        let invisDis = Array.from(searchList.querySelectorAll(".disciplines__item.w-condition-invisible"));

        if (invisDis !== null) {
            if (invisDis.length > 0) {
                invisDis.forEach(function(dis) {
                    dis.remove();
                });
            }
        }

        // sort disciplines

        let searchItems = Array.from(searchList.querySelectorAll(".project__item"));

        if (searchItems !== null) {
            if (searchItems.length > 0) {
                searchItems.forEach(function(item) {
                    dyncontent.sortDisciplines(item, ".project__td");
                });
            }
        }

    },

    openSearch: function() { // trigger ix2 transition
        // Once scrolling is complete, simulate a click on the search button
        global.searchTrigger.click();
        global.searchOpen = true;

        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));
        let namespace = global.replaceChar(wrapper.getAttribute("data-barba-namespace"));

        if (global.blackPages.indexOf(namespace) !== -1) { // if black page
            if (namespace.indexOf("home") !== -1) { // if home
                if (!global.checkNavScroll()) { // if home and not scrolled down
                    global.invertNav(100, 0.4, "none", true);
                }
            } else { // if any other black page
                global.invertNav(100, 0.4, "none", true);
            }
        }

        setTimeout(function() {
            global.searchInput.focus();
        }, 400);
    },

    closeSearch: function() { // trigger ix2 transition

        global.searchOpen = false;

        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));
        let namespace = global.replaceChar(wrapper.getAttribute("data-barba-namespace"));

        if (global.blackPages.indexOf(namespace) !== -1) { // if black page
            if (namespace.indexOf("home") !== -1) { // if home
                if (!global.checkNavScroll()) { // if home and not scrolled down
                    global.invertNav(0, 0.4);
                }
            } else { // if any other black page
                global.invertNav(0, 0.4);
            }
        }
    },

    scrollClickSearch: function() { // scroll to top first before openSearch()
        // Check if the page is already at the top
        if (window.pageYOffset == 0) {
            // If the page is already at the top, simulate a click on the search button immediately
            global.openSearch();
        } else {
            // If the page is not at the top, scroll to top using gsap ease transition
            gsap.to(window, {
                duration: 0.5,
                scrollTo: 0,
                ease: "power2.inOut",
                onComplete: function() {
                    global.openSearch();
                }
            });
        }
    },

    prepareSearch: function() { // before init
        let searchList = document.querySelector(".project__list.is--search");

        let itemCount = searchList.childElementCount;
        let itemsInvalid = searchList.querySelectorAll("*:not(.project__item)");
        itemCount -= itemsInvalid.length;
    
        if (itemCount >= projects.quantity) {
            global.searchInit();
        } else {
            global.searchCheckFs = setInterval(function() {
    
                let itemCount = searchList.childElementCount;
                let itemsInvalid = searchList.querySelectorAll("*:not(.project__item)");
                itemCount -= itemsInvalid.length;
    
                if (itemCount >= projects.quantity) {
                    clearInterval(projects.searchCheckFs);
                    global.searchInit();
                }
            }, 250);
        }

        global.searchBtn.onclick = global.scrollClickSearch;
        global.searchMobile.onclick = global.scrollClickSearch;
        global.searchClose.onmouseup = global.closeSearch;
        global.searchBackground.onmouseup = global.closeSearch;

        global.searchInput = document.querySelector('.search__input');
        global.searchMetadata = document.querySelector('.search__metadata');

        global.searchInput.addEventListener('input', () => {
            if (global.searchInput.value.length > 0) {
                global.searchMetadata.style.display = 'block';
            } else {
                global.searchMetadata.style.display = 'none';
            }
        });
    },




    // NAV

    invertNav: function(pct, dur = 0, eas = "none", notBg = false) { // sets invert filter on nav elements

        let selector = global.invertSelector;

        if (notBg) {
            selector = selector.replace(".search__background, ", "");
        }

        gsap.to(selector, {
            filter: "invert(" + pct + ")",
            duration: dur,
            ease: eas
        });
    },

    navBg: function(colour, dur = 0, eas = "none") { // sets nav bg
        gsap.to(global.nav, {
            backgroundColor: colour,
            duration: dur,
            ease: eas
        });
    },

    bodyBg: function(colour, dur = 0, eas = "none") { // sets body bg
        gsap.to(body, {
            backgroundColor: colour,
            duration: dur,
            ease: eas
        })
    },

    mobileMenuClose: function() { // simulates click of mobile menu close button
        if (global.mobileMenuBg.style.display == "block") {
            global.mobileMenuCloseBtn.click();
            setTimeout(function() { return null; }, 400);
        } else {
            return null;
        }
    },

    checkNavScroll: function() { // returns true if opaque nav is on

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

    navScroll: function() { // creates intersection observer to watch marker

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

        let callback = function(entries, observer) {
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

    preventScroll: function() {
        window.onscroll = function() {
            window.scrollTo(0, 0);
        }
    },




    // SLIDERS

    resizeSliderHeight: function(slider) {
        let items = Array.from(slider.querySelectorAll(".cs__item"));
        if (items !== null) {
            if (items.length > 0) {
                let minHeight = null;
                items.forEach(function(item) {
                    if (minHeight == null) {
                        minHeight = item.clientHeight;
                    } else {
                        minHeight = Math.min(minHeight, item.clientHeight);
                    }
                });
                slider.style.height = minHeight + "px";
            }
        }
    },

    resizeTinySliders: function() {
        let sliders = Array.from(document.querySelectorAll(".tns__slider"));
        if (sliders !== null) {
            if (sliders.length > 0) {
                sliders.forEach(function(slider) {
                    global.resizeSliderHeight(slider);
                });
            }
        }
    },

    createSlider: function(list, index) {

        let csItems = Array.from(list.querySelectorAll(".cs__item"));

        if (csItems !== null) {
            if (csItems.length > 1) {

                // let minHeight = null;

                let container = document.createElement("div");
                container.classList.add("tns__slider");
                container.classList.add("tns--" + index);
                // add more classes?
                csItems.forEach(function(item) {
                    // if (minHeight == null) {
                    //     minHeight = item.clientHeight;
                    // } else {
                    //     minHeight = Math.min(minHeight, item.clientHeight);
                    // }
                    item.remove();
                    container.appendChild(item);
                });

                // container.style.height = minHeight + "px";

                let prevBtn = document.createElement("img");
                prevBtn.classList.add("tns__prev");
                prevBtn.setAttribute("src", "https://desn2023.github.io/desn2023/img/chevron-left.svg");

                let nextBtn = document.createElement("img");
                nextBtn.classList.add("tns__next");
                nextBtn.setAttribute("src", "https://desn2023.github.io/desn2023/img/chevron-right.svg");

                let csSlider = list.parentElement.parentElement;
                csSlider.appendChild(container);
                csSlider.appendChild(prevBtn);
                csSlider.appendChild(nextBtn);

                let slider = tns({
                    container: '.tns__slider.tns--' + index,
                    items: list.length,
                    mode: "gallery",
                    // width?
                    center: true,
                    // controls: "bottom",
                    // speed: 300,
                    autoplay: true,
                    speed: 150,
                    prevButton: prevBtn,
                    nextButton: nextBtn
                });
            }
        }
    },

    sliderInit: function() {
        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

        let csListSliders = Array.from(wrapper.querySelectorAll(".cs__list.is--slider"));

        if (csListSliders !== null) {
            if (csListSliders.length > 0) {
                csListSliders.forEach(function(list, index) {
                    global.createSlider(list, index);
                });
            }
        }
    },



    // SPECIAL FEATURES

    showreelModalInit: function() {
        // When DOM is ready, execute the code inside the function
        document.addEventListener("DOMContentLoaded", function() {
            // Select the elements
            var iframe = document.querySelector('iframe');
            var modal = document.querySelector('.showreel__modal');
    
            // Create a new Vimeo player instance
            var player = new Vimeo.Player(iframe);
    
            // Add click event listener to play button
            document.querySelector('#btnPlay').addEventListener('click', function() {
                // Show the modal and fade it in
                modal.style.display = 'block';
                modal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });
    
                // Start playing the video
                player.play();
            });
    
            // Add click event listener to reset button
            document.querySelector('#btnReset, #btnClose').addEventListener('click', function() {
                // Pause the video and reset the time
                player.pause();
                player.setCurrentTime(0);
    
                // Fade out the modal and hide it
                modal.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' })
                    .onfinish = function() {
                        modal.style.display = 'none';
                    };
            });
        });
    
        // hover effcect for modal
    
        let showreelContainer = document.querySelector('.showreel__container');
        let showreelOverlay = document.querySelector('.showreel__overlay');
    
        showreelContainer.addEventListener('mouseover', function() {
            gsap.to(showreelOverlay, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0.1)' });
        });
    
        showreelContainer.addEventListener('mouseout', function() {
            gsap.to(showreelOverlay, { duration: 0.3, backgroundColor: 'rgba(0,0,0,0.4)' });
    
        })
    },

    countdownInit: function() { // set and start countdown

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

        clock('js-clock', global.countdownDeadline);
    },



    // UTILITY

    shuffleArray: function(array) { // shuffle items in array

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    },

    alphaArray: function(arr, selector) { // sorts array of HTML elements alphabetically by child innerText
        return Array.from(arr).sort((a, b) => {
            const aText = a.querySelector(selector).innerText;
            const bText = b.querySelector(selector).innerText;
            if (aText < bText) {
                return -1;
            }
            if (aText > bText) {
                return 1;
            }
            return 0;
        });
    },

    replaceChar: function(input) { // deletes domain, line breaks, slashes from string

        // replace domain
        input = input.replace(
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

    isElement: function(input) { // returns true if input is an element
        return input instanceof Element;
    },

    hrefToNamespace: function(href) { // converts URL to namespace

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

    elementNext: function(nodelist) { // returns first-and-only, or second element of nodelist

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




    // PAGES

    homeInit: function() { // randomize featured work and reveal home content

        // penrose
        penrose.counter = 0;
        penrose.init();

        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

        // get all of the little ones
        let featSmall = Array.from(wrapper.querySelectorAll(".project__list .project__item"));

        // randomize the order
        let randSmall = global.shuffleArray(featSmall);

        //turn off all but 4
        for (let i = 0; i < randSmall.length - 3; i++) {
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
        featBig.querySelector(".link.hover--black").href = randSmall[0].querySelector(".project__link").getAttribute("href");

        // remove from small
        randSmall[0].remove();

        // reorder disciplines

        let gradsItems = Array.from(wrapper.querySelectorAll(".grads__item"));

        gradsItems.forEach(function(item) {
            dyncontent.sortDisciplines(item, ".grads__td");
        });

        gsap.to(".home__content > .container", {
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut"
        });

        // modal
        global.showreelModalInit();
    },

    caseStudyInit: function() {

        let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

        // sort disciplines

        let csPrimary = wrapper.querySelector(".cs__primary");

        dyncontent.sortDisciplines(csPrimary, ".project__td");

        let projectItems = Array.from(wrapper.querySelectorAll(".project__item"));
        if (projectItems !== null) {
            if (projectItems.length > 0) {
                projectItems.forEach(function(item) {
                    dyncontent.sortDisciplines(item, ".project__td");
                });
            }
        }

        global.sliderInit();

        let projectData = wrapper.querySelector(".cs__metadata");
        let triggerProjectData = wrapper.querySelector(".dropdown__trigger");

        // metadata expand and collapse

        triggerProjectData.onclick = function() {

            if (projectData.style.height != "auto") {
                projectData.style.height = "auto";
                wrapper.querySelector(".dropdown__line.is--horizontal").style.transition = "all 0.5s";
                wrapper.querySelector(".dropdown__line.is--horizontal").style.height = 0;
                wrapper.querySelector(".dropdown__line.is--horizontal").style.width = 0;
                setTimeout(() => {
                    wrapper.querySelector(".dropdown__icon").style.transition = "all 0.5s";
                    wrapper.querySelector(".dropdown__icon").style.transform = "rotate(90deg)";
                }, 200);

            } else if (projectData.style.height != 0) {
                projectData.style.height = 0;
                wrapper.querySelector(".dropdown__line.is--horizontal").style.transition = "all 0.5s";
                wrapper.querySelector(".dropdown__line.is--horizontal").style.width = "20px";
                wrapper.querySelector(".dropdown__line.is--horizontal").style.height = "1px";
                setTimeout(() => {
                    wrapper.querySelector(".dropdown__icon").style.transition = "all 0.5s";
                    wrapper.querySelector(".dropdown__icon").style.transform = "rotate(0deg)";
                }, 200);
            }
        }
    }
}




// BARBA PAGE TRANSITIONS

barba.init({
    debug: true,
    preventRunning: true,
    sync: true,
    timeout: 20000,
    transitions: [{
            name: 'white-white-transition',

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
        {
            name: 'black-white-transition',

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
        {
            name: 'white-black-transition',

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
        {
            name: 'black-black transition',

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
        {
            name: "black-casestudy transition",

            from: { namespace: global.blackPages },
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
                // cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {
            name: "white-casestudy transition",

            from: { namespace: global.whitePages },
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
                global.navBg("transparent");
            },
            enter(data) {
                return gsap.from(data.next.container, global.transParams.enter);
            },
            afterEnter(data) {
                global.bannerIn();
                global.navBg("white");
                // cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        },
        {
            name: "casestudy-black transition",

            from: { namespace: "casestudy" },
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
        {
            name: "casestudy-white transition",

            from: { namespace: "casestudy" },
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
        {
            name: "casestudy-casestudy transition",

            from: { namespace: "casestudy" },
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
                // cmsSlider();
                window.onscroll = "";
                body.style.backgroundColor = "transparent";
            }
        }
    ],

    views: [{
            namespace: 'home',
            afterEnter() {
                global.homeInit();
                window.onresize = function() {
                    global.mobileMenuClose();
                    penrose.setSize();
                }
            }
        },
        {
            namespace: 'graduates',
            afterEnter() {
                // cmsLoad();
                window.onresize = function() {
                    global.mobileMenuClose();
                }
                grads.init();
            }
        },
        {
            namespace: 'work',
            beforeLeave() {
                projects.moveBack();
            },
            afterEnter() {
                // cmsLoad();
                // window.fsAttributes = window.fsAttributes || [];
                // window.fsAttributes.push([
                //     'cmsload',
                //     (listInstances) => {
                //         console.log('cmsload Successfully loaded!');

                //         // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
                //         const [listInstance] = listInstances;

                //         // The `renderitems` event runs whenever the list renders items after switching pages.
                //         listInstance.on('renderitems', (renderedItems) => {
                //             console.log(renderedItems);
                //         });
                //     },
                // ]);
                window.onresize = function() {
                    global.mobileMenuClose();
                }
                projects.populate();
                // projects.init();
            }
        },
        {
            namespace: 'events',
            afterEnter() {
                // cmsLoad();
                window.onresize = function() {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'about',
            afterEnter() {
                // cmsLoad();
                window.onresize = function() {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'profile',
            afterEnter() {
                // cmsLoad();
                let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

                // grad profile disciplines

                let disciplinesList = item.querySelector(".profile__disciplines"); // get disciplines list

                // select top item

                let disciplineTop = wrapper.querySelector(topSelect);
                let disciplineH1s;

                if (disciplinesList !== null) {
                    disciplineH1s = Array.from(disciplinesList.querySelectorAll("div > .title"));
                }

                let topItem;

                if (disciplineH1s !== null && disciplineH1s !== undefined) {
                    if (disciplineH1s.length > 0) {
                        disciplineH1s.forEach(function(h1, index) {
                            if (h1.innerText == disciplineTop.innerText && index !== 0) {
                                topItem = h1.parentElement;
                            }
                        });
                    }
                }

                // reorder

                if (topItem !== undefined) {
                    topItem.remove();
                    disciplinesList.insertBefore(topItem, disciplinesList.firstChild);
                }

                // project disciplines

                let projectItems = Array.from(wrapper.querySelectorAll(".project__item"));
                if (projectItems !== null) {
                    if (projectItems.length > 0) {
                        projectItems.forEach(function(item) {
                            dyncontent.sortDisciplines(item, ".project__td");
                        });
                    }
                }
                window.onresize = function() {
                    global.mobileMenuClose();
                }
            }
        },
        {
            namespace: 'casestudy',
            beforeEnter() {
                if (global.searchOpen) {
                    global.searchClose.click();
                }
            },
            afterEnter() {
                // cmsLoad();
                global.caseStudyInit();
                // cmsSlider();
                window.onresize = function() {
                    global.mobileMenuClose();
                    // global.resizeTinySliders();
                }
            }
        }
    ]
});




// FIRST LOAD

if (global.blackPages.indexOf(global.initNamespace) == -1) {
    global.invertNav(100);
}

global.navScroll();
global.countdownInit();
global.prepareSearch();
