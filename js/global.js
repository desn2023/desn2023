console.log("v1.0.1");

function runScripts(data) {
    const views = barba.views.byNamespace;
    const nextView = views.get(data.next.namespace);
    nextView.afterEnter();
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
            runScripts(data);
        }
    }],

    views: [
        {
            namespace: 'home',
            beforeEnter() {
                // insert a function to run here

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
                // insert a function to run here

            },
            afterEnter() {
                // insert a function to run here
                grads.init();
            }
        },
        {
            namespace: 'work',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                // insert a function to run here

            }
        },
        {
            namespace: 'events',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                // insert a function to run here

            }
        },
        {
            namespace: 'about',
            beforeEnter() {
                // insert a function to run here

            },
            afterEnter() {
                // insert a function to run here

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