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

    let categoryElem = document.querySelector(".grads__option.is--selected");
    let categoryTxt = categoryElem.innerText.replace(/(\r\n|\n|\r)/gm, ""); // e.g. "Branding"

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

        let categoryTxt = e.currentTarget.querySelector(".title").innerText.replace(/(\r\n|\n|\r)/gm, "");

        let filterMobile = document.querySelector(".filter__mobile");
        let toggleAll = filterMobile.querySelector(".toggle.is--all");
        let toggleFilter = filterMobile.querySelector(".toggle.is--filter");
        let selectorMobile = filterMobile.querySelector(".selector.is--mobile");
        let filtersContainer = filterMobile.querySelector(".filter__wrapper__wrapper");

        if (categoryTxt.indexOf("All Disciplines") !== -1) {
            toggleAll.click();
            // toggleAll.style.opacity = 1;
            // toggleFilter.style.opacity = 0.5;
            // selectorMobile.style.transform = "translate3d(0%, 0px, 0px)";
            // filtersContainer.style.height = "0px";
        } else {
            toggleFilter.click();
            // toggleAll.style.opacity = 1;
            // toggleFilter.style.opacity = 0.5;
            // selectorMobile.style.transform = "translate3d(100%, 0px, 0px)";
            // filtersContainer.style.height = "";
        }        

        grads.filters.forEach(function (filter) {
            if (filter.innerText.indexOf(categoryTxt) !== -1) {
                filter.classList.add("is--selected");
            
            } else {
                filter.classList.remove("is--selected");
            }
        });

        grads.filter();
    }
}

grads.filterClick = function (e) {
    if (!e.currentTarget.classList.contains("is--selected")) {

        grads.filters.forEach(function (select) {
            select.classList.remove("is--selected");
        });

        e.currentTarget.classList.add("is--selected");
    }

    let categoryTxt = e.currentTarget.querySelector(".title").innerText.replace(/(\r\n|\n|\r)/gm, "");

    grads.options.forEach(function (option) {
        if (option.innerText.indexOf(categoryTxt) !== -1) {
            option.classList.add("is--selected");
        } else {
            option.classList.remove("is--selected");
        }
    });

    grads.filter();
}

grads.toggleAllClick = function (e) {

    let tl = gsap.timeline();
    
    tl.to(".container.is--filter", {
        duration: 0.2,
        ease: "none",
        opacity: 0
    });

    tl.to(e.currentTarget, {
        duration: 0.2,
        ease: "none",
        opacity: 1
    }, "<");

    tl.to(".toggle.is--filter", {
        duration: 0.2,
        ease: "none",
        opacity: 0.5
    }, "<0.1");

    tl.to(".selector.is--mobile", {
        duration: 0.4,
        ease: "power2.inOut",
        translateX: "0%"
    }, "<");

    tl.to(".container.is--filter", {
        duration: 0.4,
        ease: "power2.inOut",
        height: 0
    }, "<");

    grads.filters.forEach(function (select) {
        select.classList.remove("is--selected");
    });

    grads.options.forEach(function (option) {
        if (option.innerText.indexOf("All Disciplines") !== -1) {
            option.classList.add("is--selected");
        } else {
            option.classList.remove("is--selected");
        }
    });

    grads.filter();
}

grads.toggleFilterClick = function (e) {
    let tl = gsap.timeline();
    
    tl.to(e.currentTarget, {
        duration: 0.2,
        ease: "none",
        opacity: 1
    });

    tl.to(".toggle.is--all", {
        duration: 0.2,
        ease: "none",
        opacity: 0.5
    }, "<0.1");

    tl.to(".selector.is--mobile", {
        duration: 0.4,
        ease: "power2.inOut",
        translateX: "100%"
    }, "<");

    tl.to(".container.is--filter", {
        duration: 0.4,
        ease: "power2.inOut",
        height: "auto"
    }, "<");

    // tl.to(".container.is--filter", {
    //     duration: 0.2,
    //     ease: "none",
    //     opacity: 1
    // }, "<0.1");
}

grads.init = function () {

    grads.filter();

    grads.options = Array.from(document.querySelectorAll(".grads__option"));

    grads.options.forEach(function (option) {
        option.onclick = grads.optionClick;
    });

    grads.filters = Array.from(document.querySelectorAll(".filter__item"));

    grads.filters.forEach(function (option) {
        option.onclick = grads.filterClick;
    });

    const toggleAll = document.querySelector(".toggle.is--all");
    toggleAll.onclick = grads.toggleAllClick;

    const toggleFilter = document.querySelector(".toggle.is--filter");
    toggleFilter.onclick = grads.toggleFilterClick;
}