// declare functions

function shuffleArray(array) { // shuffle items in array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array; 
}

// HOW THIS WILL WORK

// when any categories are selected by user, run filterProjects()
// then run sortProjects()

function filterProjects() { // hides items that are not in active categories, show items that are in active categories

    // find out which categories are active

    // loop through all project items
    // hide items that don't have any of the active categories --> remove is--selected class
    // show items that have any of the active categories --> add is--selected class
}

function sortProjects() { // fire this function on page load

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

        if (gradTop == categoryTxt) { // this needs to accomodate multiple categories
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
