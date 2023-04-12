console.log("v1.0.1");

barba.init ({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',
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
            window.Webflow && window.Webflow.destroy();
            window.Webflow && window.Webflow.ready();
            window.Webflow && window.Webflow.require('ix2').init();
            document.dispatchEvent(new Event('readystatechange'));
        }
    }],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                gsap.to(".nav", {
                    filter: "invert(0%)",
                    duration: 0.4
                });    
            },
            afterEnter() {
                penrose.init();
                window.onresize = function() {
                    penrose.setSize();
                }
            }
        },
        {
            namespace: 'graduates',
            beforeEnter() {
                gsap.to(".nav", {
                    filter: "invert(100%)",
                    duration: 0.4
                }); 
            },
            afterEnter() {
                grads.init();
            }
        },
        {
            namespace: 'work',
            beforeEnter() {
                gsap.to(".nav", {
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