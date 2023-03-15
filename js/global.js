// Define the loading indicator element
const loader = document.querySelector('#loader');
const bar = loader.querySelector('#bar');

barba.init({
    preventRunning: true,
    transitions: [{
        name: 'opacity-transition',
        before() {
            return new Promise((resolve, reject) => {
                if (Barba.HistoryManager.history.current && Barba.HistoryManager.history.current.container) {
                    // If the current container exists, resolve the promise immediately
                    resolve();
                } else {
                    // If the current container doesn't exist, show the loading indicator and wait for the current container to load
                    loader.style.display = 'block';

                    // Wait for the current container to load before resolving the promise
                    this.oldContainerLoading.then(() => {
                        loader.style.display = 'none';
                        resolve();
                    });
                }
            });
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

console.log("hey!");