// Define the loading indicator element
const loader = document.querySelector('#loader');
const bar = loader.querySelector('#bar');

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
            // Update the width of the bar based on the progress of the transition
            gsap.to(bar, {
                width: state.progress * 100 + '%',
                duration: 0.2,
                ease: 'power2.inOut'
            });
        }
    }]
});

console.log("loader with bar final");