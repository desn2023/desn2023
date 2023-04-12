console.log("v1.0.1");

function runScripts(namespace) { // custom scripts for pages
    switch (namespace) {
        case "home":
            penrose.init();
            window.onresize = function() {
                penrose.setSize();
            }
            break;
        case "graduates":
            grads.init();
            break;
        case "work":
            break;
        case "events":
            break;
        case "about":
            break;
    }
}


barba.init({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',

        leave(data) {
            return gsap.to(data.current.container, {
                // delay: 0.5,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        },
        afterEnter(data) {
            Webflow.ready();
            Webflow.require('ix2').init();
            runScripts(data.current.namespace);
        }
    }],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter(data) {
                runScripts("home");
            }
        },
        {
            namespace: 'graduates',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                runScripts("graduates");
            }
        },
        {
            namespace: 'work',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                runScripts("work");
            }
        },
        {
            namespace: 'events',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                runScripts("events");

            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                runScripts("about");

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