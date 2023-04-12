// declare functions

let grads = {
    animFirst: true,
    animIn: {
        opacity: 1,
        duration: 0.25,
        stagger: 0.1,
        ease: "power2.out"
    },
    animOut: {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    }
};

grads.filter = function () { // fire this function on page load

    // get the grads list element
    grads.list = document.querySelector(".grads__list");

    // get all grads items in array/nodelist
    grads.items = Array.from(document.querySelectorAll(".grads__item"));

    let animInTl;

    if (grads.animFirst) {
        grads.items.forEach(function (item) {
            item.style.opacity = 0;
        });
        animInTl = gsap.timeline();
        grads.animFirst = false;
    } else {
        animInTl = gsap.timeline();
        animInTl.to(grads.items, grads.animOut);
    }

    // sort items into two arrays based on has top discipline/does not have top discipline
    let categoryElem = document.querySelector(".grads__option.is--selected");
    let categoryTxt = categoryElem.innerText; // e.g. "Branding"

    // convert to array
    grads.items = Array.from(grads.items);

    // filtered items

    let filteredItems = [];

    grads.items.forEach(function (item) {
        
        // sort disciplines

        let disciplinesList = item.querySelector(".disciplines__list");

        let disciplineTop = item.querySelector(".grads__td");
        let disciplineH1s = Array.from(disciplinesList.querySelectorAll(".discipline > .title:not(.is--bullet)"));

        let topItem;
        disciplineH1s.forEach(function(h1, index) {
            if (h1.innerText == disciplineTop.innerText && index !== 0) {
                topItem = h1.parentElement.parentElement;
                console.log(topItem);
            }
        });

        if (topItem !== undefined) {
            topItem.remove();
            disciplinesList.insertBefore(topItem, disciplinesList.firstChild);
        }

        // remove items that don't match filter

        if (categoryTxt.indexOf("All Disciplines") !== -1) {
            grads.items.forEach(function (item) {
                item.style.display = "block";
                filteredItems.push(item);
            });
        } else {
            if (disciplinesList.innerHTML.indexOf(categoryTxt) == -1) {
                item.style.display = "none";
            } else {
                item.style.display = "block";
                filteredItems.push(item);
            }
        }
    });

    animInTl.to(filteredItems, grads.animIn);
    
}

grads.optionClick = function (e) {
    if (!e.currentTarget.classList.contains("is--selected")) {

        grads.options.forEach(function (select) {
            select.classList.remove("is--selected");
        });

        e.currentTarget.classList.add("is--selected");

        grads.filter();
    }
}

grads.init = function () {

    grads.filter();

    grads.options = Array.from(document.querySelectorAll(".grads__option"));

    grads.options.forEach(function (option) {
        option.onclick = grads.optionClick;
    });
}