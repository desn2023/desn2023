// Define the loading indicator element
const loader = document.querySelector('#loader');

barba.init({
    preventRunning: true,
    transitions: [{
        name: 'opacity-transition',
        beforeEnter() {
            // Show the loading indicator
            loader.style.display = 'block';
        },
        afterEnter() {
            // Hide the loading indicator
            loader.style.display = 'none';
        },
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
        },
        onProgress: (state) => {
            // Update the loading indicator based on the progress of the transition
            loader.style.width = state.progress * 100 + '%';
        }
    }]
});

console.log("loader update");