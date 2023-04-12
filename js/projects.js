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
    var workCategories = document.getElementsByClassName("work__option.is--active");

        // get all work items in array/nodelist
        var workItems = document.getElementsByClassName("work__item");

        // var workCategory = document.get

        // let categoryElem = document.querySelector(".work__disciplines.is--active");
        // let categoryTxt = categoryElem.innerText; // e.g. "Branding"

    // loop through all project items
    for (let i=0; i<workItems.length; i++){

        // hide items that don't have any of the active categories --> remove is--selected class
        workItems.remove(".is--selected"[i]);

        // show items that have any of the active categories --> add is--selected class
        for (let n=0; n<workCategories.length; n++){
            if (workCategory == workCategories[i]){
                workItems.append(".is--selected"[i]);
            }
        }
    };
}

function sortProjects() { // fire this function on page load

    // get the work list element
    var workList = document.querySelector(".work__list");

    // get all work items in array/nodelist
    var workItems = document.getElementsByClassName("work__item");

    // sort items into two arrays based on has top discipline/does not have top discipline
    let categoryElem = document.querySelector(".work__disciplines.is--active");
    let categoryTxt = categoryElem.innerText; // e.g. "Branding"
    
    // sort and randomize both arrays
    let twoGroups = sortIntoArrays(categoryTxt, workItems, true);

    // remove the elements the HTML
    workItems.forEach(function(work) {
        work.remove();
    });
    
    // re-append in a randomized order

    for (let i=0; i<twoGroups.topItems.length; i++){
        workList.append(twoGroups.topItems[i]);
    };

    for (let i=0; i<twoGroups.bottomItems.length; i++){
        workList.append(twoGroups.bottomItems[i]);
    };
}



function sortIntoArrays(categoryTxt, items, randomize) {

    let twoGroups = {
        topItems: new Array(),
        bottomItems: new Array()
    }

    // sort into two groups based on top category
    items.forEach(function(work) {
        let workTop = work.querySelector(".work__td");

        if (workTop == categoryTxt) { // this needs to accomodate multiple categories
            twoGroups.topItems.push(work);
        } else {
            twoGroups.bottomItems.push(work);
        }
    });

    // randomize
    if (randomize) {
        twoGroups.topItems = shuffleArray(twoGroups.topItems);
        twoGroups.bottomItems = shuffleArray(twoGroups.bottomItems);
    }

    return twoGroups;
}