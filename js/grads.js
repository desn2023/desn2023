// declare functions

let gradsAnimIn = {
    opacity: 1,
    duration: 0.25,
    stagger: 0.15,
    ease: "power2.out"
}

function filterGrads() { // fire this function on page load

    // get the grads list element
    let gradsList = document.querySelector(".grads__list");

    // get all grads items in array/nodelist
    let gradsItems = document.querySelectorAll(".grads__item");

    // sort items into two arrays based on has top discipline/does not have top discipline
    let categoryElem = document.querySelector(".grads__option.is--selected");
    let categoryTxt = categoryElem.innerText; // e.g. "Branding"

    // convert to array
    gradsItems = Array.from(gradsItems);

    // remove items that don't match filter
    gradsItems.forEach(function (item) {
        let disciplinesList = item.querySelector(".disciplines__list");

        if (categoryTxt !== "All Disciplines" && disciplinesList.innerHTML.indexOf(categoryTxt) == -1) {
            // gradsItems[index].pop();
            item.remove();
        }
    });

    gsap.to(gradsItems. gradsAnimIn);
    
    // // sort and randomize both arrays
    // let twoGroups = sortIntoArrays(categoryTxt, gradsItems, true);

    // // remove the elements the HTML
    // gradsItems.forEach(function(grad) {
    //     grad.remove();
    // });
    
    // // re-append in a randomized order

    // for (let i=0; i<twoGroups.topItems.length; i++){
    //     gradsList.append(twoGroups.topItems[i]);
    // };

    // for (let i=0; i<twoGroups.bottomItems.length; i++){
    //     gradsList.append(twoGroups.bottomItems[i]);
    // };
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














