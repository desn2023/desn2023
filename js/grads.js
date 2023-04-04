// declare functions

function shuffleArray(array) { // shuffle items in array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function sortGrads() { // fire this function on page load

    // get the grads list element
    var gradsList = document.querySelector(".grads__list");

    // get all grads items in array/nodelist
    var gradsItems = document.getElementsByClassName("grads__item");

    // sort items into two arrays based on has top discipline/does not have top discipline
    let categoryElem = document.querySelector(".grads__option.is--active");
    let categoryTxt = categoryElem.innerText; // e.g. "Branding"
    
    // sort and randomize both arrays
    let twoGroups = sortIntoArrays(categoryTxt, gradsItems, true);

    // remove the elements the HTML
    gradsItems.forEach(function(grad) {
        grad.remove();
    });
    
    // re-append in a randomized order

    for (let i=0; i<twoGroups.topItems.length; i++){
        gradsList.append(twoGroups.topItems[i]);
    };

    for (let i=0; i<twoGroups.bottomItems.length; i++){
        gradsList.append(twoGroups.bottomItems[i]);
    };
}

function sortIntoArrays(categoryTxt, items, randomize) {

    let twoGroups = {
        topItems: new Array(),
        bottomItems: new Array()
    }

    // sort into two groups based on top category
    items.forEach(function(grad) {
        let gradTop = grad.querySelector(".grads__td");

        if (gradTop == categoryTxt) {
            twoGroups.topItems.push(grad);
        } else {
            twoGroups.bottomItems.push(grad);
        }
    });

    // randomize
    if (randomize) {
        twoGroups.topItems = shuffleArray(twoGroups.topItems);
        twoGroups.bottomItems = shuffleArray(twoGroups.bottomItems);
    }

    return twoGroups;
}














