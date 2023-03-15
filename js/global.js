barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0
            });

        },
        afterLeave(data) {
            data.current.container.remove();
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0
            });
        }
    }]
});

console.log("this is live");