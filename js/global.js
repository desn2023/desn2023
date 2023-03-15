barba.init({
    preventRunning: true,
    sync: true,
    transitions: [{
        name: 'opacity-transition',

        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        },
        afterLeave(data) {
            data.current.container.remove();
        },

        afterEnter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        },
    }]
});



// Create a loading bar element and append it to your document
var loadingBar = document.createElement('div');
loadingBar.id = 'loading-bar';
loadingBar.style.position = 'fixed';
loadingBar.style.top = '0';
loadingBar.style.left = '0';
loadingBar.style.height = '4px';
loadingBar.style.width = '50%';
loadingBar.style.backgroundColor = '#000000';
document.body.appendChild(loadingBar);

// Listen to the progress event and update the loading bar width
barba.hooks.progress(function(data) {
    var percentage = Math.round(data.progress * 100);
    loadingBar.style.width = percentage + '%';
});

// Hide the loading bar when entering a new page
//barba.hooks.enter(function (data) {
// loadingBar.style.display = 'none';
//});

console.log("hey!");