console.log("v1.0.0");

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