console.log("v1.0.1");

barba.init({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',

        leave(data) {
            return gsap.to(data.current.container, {
                delay: 0.5,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        },
        afterLeave(data) {
            data.current.container.remove();
        },

        afterEnter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        },
    }],

    views: [{
        namespace: 'home',
        beforeEnter() {
            // insert a function to run here

        },
        afterEnter() {
            // insert a function to run here

        }
    }]
});

const imgRefs = {
    refClass: "img-ref",
    columns: [
        { col: "", cls: "" }
    ]
};

imgRefs.run = function (refClass = "img-ref") {
    
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

imgRefs.buildURL = function (attid) {

}

// create blurryImageLoad

// create intersection observer

// callback has .load(node)

// target all images with the class


// on load

grads.init();

window.onresize = function () {
    penrose.setSize();
}