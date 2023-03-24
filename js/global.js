console.log("Updated Barba!");

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
    }]
});





//PROGRES BAR WHEN NEW CONTENT IS LOADING (NOT WORKING)

// // Create a loading bar element and append it to your document
// var loadingBar = document.createElement('div');
// loadingBar.id = 'loading-bar';
// loadingBar.style.position = 'fixed';
// loadingBar.style.top = '0';
// loadingBar.style.left = '0';
// loadingBar.style.height = '4px';
// loadingBar.style.width = '50%';
// loadingBar.style.backgroundColor = '#000000';
// document.body.appendChild(loadingBar);

// // Listen to the progress event and update the loading bar width
// barba.hooks.progress(function(data) {
//     var percentage = Math.round(data.progress * 100);
//     loadingBar.style.width = percentage + '%';
// });

// Hide the loading bar when entering a new page
//barba.hooks.enter(function (data) {
// loadingBar.style.display = 'none';
//});





//LAZY LOADING (PARTIALLY WORKING)

// // Find all elements with data-images attribute
// const images = Array.from(document.querySelectorAll('[data-image]'));

// // Utility function to check if element is in viewport
// const isInViewport = function(elem) {
//     const bounding = elem.getBoundingClientRect();
//     return (
//         bounding.top >= 0 &&
//         bounding.left >= 0 &&
//         bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// };

// // If there are images on the page
// if (images && images.length) {
//     // Bind scroll event
//     window.addEventListener('scroll', () => {
//         // Loop through each image
//         images.forEach((image) => {
//             // Check if the image is on the screen
//             if (isInViewport(image)) {
//                 // replace src with contents of data-image
//                 image.src = image.getAttribute('data-image');
//             }
//         });
//     });
// }





//ADDING DATA-IMAGE ATTRIBUTE TO COLLECTION LISTS (NOT WORKING)

// // Define your Webflow API key and site ID
// const API_KEY = 'dd98d6c4aa97216b338d42fd7d4ee31d11677fe694d450cd029985a3244b44f0';
// const SITE_ID = 'your-webflow-site-id';

// // Get the data for the source collection
// const sourceCollectionSlug = 'your-source-collection-slug';
// const sourceCollectionUrl = `https://api.webflow.com/collections/${sourceCollectionSlug}/items`;
// const sourceCollectionRequest = fetch(sourceCollectionUrl, {
//     headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         'accept-version': '1.0.0',
//         'cache-control': 'no-cache',
//     },
// }).then((response) => response.json());

// // Get the data for the target collection
// const targetCollectionSlug = 'your-target-collection-slug';
// const targetCollectionUrl = `https://api.webflow.com/collections/${targetCollectionSlug}/items`;
// const targetCollectionRequest = fetch(targetCollectionUrl, {
//     headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         'accept-version': '1.0.0',
//         'cache-control': 'no-cache',
//     },
// }).then((response) => response.json());

// // Wait for both requests to finish and process the data
// Promise.all([sourceCollectionRequest, targetCollectionRequest]).then(([sourceCollectionData, targetCollectionData]) => {
//     // Get the multi-image field from the source collection
//     const sourceMultiImageField = 'multiImageField';

//     // Get the image field from the target collection that you want to add the custom attribute to
//     const targetImageField = 'imageFieldClass';

//     // Get the images from the source collection with the multi-image field
//     const sourceImages = sourceCollectionData.items.map((item) => item[sourceMultiImageField]);

//     // Get the images from the target collection that you want to add the custom attribute to
//     const targetImages = targetCollectionData.items.map((item) => item[targetImageField]);

//     // Loop through each source image
//     sourceImages.forEach((image, index) => {
//         // Get the URL of the image
//         const imageUrl = image[0].url;

//         // Add the URL as a custom attribute to the corresponding target image
//         targetImages[index].setAttribute('data-custom-image-url', imageUrl);
//     });
// });