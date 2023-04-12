console.log("v02");

let global = {
    invertSelector: ".logo__wordmark, .nav__links, .nav__search, .menu__mobile",
    menuBg: function () {

        let container = document.querySelector(".wrapper");

        let options = {
            root: null,
            rootMargin: "-44px 0px 0px 0px",
            threshold: 0
        }

        let callback = function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let namespace = container.getAttribute("data-barba-namespace");
                    gsap.to(".nav", {
                        backgroundColor: "transparent",
                        duration: 0
                    });

                    if (
                        namespace !== "home" &&
                        namespace !== "profile"
                    ) {
                        gsap.to(global.invertSelector, {
                            filter: "invert(100%)",
                            duration: 0
                        });
                    } else {
                        gsap.to(global.invertSelector, {
                            filter: "invert(0%)",
                            duration: 0
                        });
                    }
                } else {
                    gsap.to(".nav", {
                        backgroundColor: "white",
                        duration: 0,
                    });
                    gsap.to(global.invertSelector, {
                        filter: "invert(100%)",
                        duration: 0
                    });
                }
            });
        }

        global.observer = new IntersectionObserver(callback, options);
        global.marker = document.querySelector(".marker");

        global.observer.observe(marker);
    }
}

barba.init ({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',
        beforeOnce(data) {
            if (
                data.current.namespace !== "home" &&
                data.current.namespace !== "profile"
            ) {
                gsap.to(global.invertSelector, {
                    duration: 0,
                    filter: "invert(100%)"
                });
            }
        },
        beforeLeave(data) {

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
            global.observer.unobserve(global.marker);
            gsap.to(".nav", {
                backgroundColor: "transparent",
                duration: 0.4
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        },
        afterEnter(data) {
            global.menuBg();
        }
    }],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                gsap.to(global.invertSelector, {
                    filter: "invert(0%)",
                    duration: 0.4
                });    
            },
            afterEnter() {
                penrose.init();
                window.onresize = function() {
                    penrose.setSize();
                }
            },
            beforeLeave() {
                gsap.to(global.invertSelector, {
                    filter: "invert(100%)",
                    duration: 0.4
                }); 
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
            namespace: 'work',
            beforeEnter() {
                gsap.to(global.invertSelector, {
                    filter: "invert(100%)",
                    duration: 0.4
                }); 
            },
            afterEnter() {
            }
        },
        {
            namespace: 'events',
            afterEnter() {
            }
        },
        {
            namespace: 'about',
            afterEnter() {
            }
        },
        {
            namespace: 'profile',
            beforeEnter() {
                gsap.to(global.invertSelector, {
                    filter: "invert(0%)",
                    duration: 0.4
                });    
            },
            beforeLeave() {
                gsap.to(global.invertSelector, {
                    filter: "invert(100%)",
                    duration: 0.4
                }); 
            }
        }
    ]
});






const imgRefs = {
    refClass: "img-ref",
    columns: [
        { col: "", cls: "" }
    ]
};

imgRefs.run = function(refClass = "img-ref") {

    // get img-ref nodes

    // for each img-ref

    // get parent

    // for each column

    // find the container

    // count number of images

    // if does not match, don't do anything

    // if matches

    // by index,

    // remove loading tags

    // add class for watching with observer

    // change src to srcset and add urls
}

imgRefs.buildURL = function(attid) {

}

// create blurryImageLoad

// create intersection observer

// callback has .load(node)

// target all images with the class


// on load