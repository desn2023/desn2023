// declare functions

let dyncontent = {}

let grads = {
    filterParams: [".grads__list", ".grads__item", ".grads__option.is--selected", ".grads__td"],
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
}

let projects = {
    filterParams: [".project__list", ".project__item", ".filter__item.is--selected", ".project__td"],
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
}




// GRADS AND PROJECTS

dyncontent.sortDisciplines = function (item, topSelect) {

    let disciplinesList = item.querySelector(".disciplines__list"); // get disciplines list

    // select top item

    let disciplineTop = item.querySelector(topSelect);
    let disciplineH1s = Array.from(disciplinesList.querySelectorAll(".discipline > .title:not(.is--bullet)"));

    let topItem;

    disciplineH1s.forEach(function (h1, index) {
        if (h1.innerText == disciplineTop.innerText && index !== 0) {
            topItem = h1.parentElement.parentElement;
        }
    });

    // reorder

    if (topItem !== undefined) {
        topItem.remove();
        disciplinesList.insertBefore(topItem, disciplinesList.firstChild);
    }
}

dyncontent.filter = function (
    listSelect = ".grads__list", 
    itemSelect = ".grads__item", 
    catSelect = ".grads__option.is--selected",
    topSelect = ".grads__td",
    obj = grads, // or projects,
    randomize = false
) {

    let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

    // get the list element
    obj.list = wrapper.querySelector(listSelect);

    // get all items in array/nodelist
    obj.items = Array.from(obj.list.querySelectorAll(itemSelect));

    // randomize

    if (randomize && obj.animFirst) {
        obj.items = global.shuffleArray(obj.items);
    }

    if (wrapper.getAttribute("data-barba-namespace").indexOf("graduates") !== -1) {
        grads.list = obj.list;
        grads.items = [...obj.items];
    } else {
        projects.list = obj.list;
        projects.items = [...obj.items];
    }

    let tl = gsap.timeline();

    if (obj.animFirst) {

        obj.items.forEach(function (item) {
            item.style.opacity = 0;
            item.remove();
        });

        obj.items.forEach(function (item) {
            obj.list.appendChild(item);
        });

        obj.animFirst = false;

    } else {
        tl.to(obj.items, obj.animOut);
    }

    let categoryElems = new Array();
    categoryElems = Array.from(wrapper.querySelectorAll(catSelect));

    let categoryTxts = new Array();

    if (categoryElems.length > 0) {
        categoryElems.forEach(function (elem) {
            categoryTxts.push(elem.innerText.replace(/(\r\n|\n|\r)/gm, "")); // e.g. branding
        });
    } else {
        categoryTxts.push("All Disciplines");
    }

    // filtered items
    let filteredItems = new Array();

    obj.items.forEach(function (item) {

        // sort disciplines

        dyncontent.sortDisciplines(item, topSelect);

        // remove items that don't match filter

        let disciplinesList = item.querySelector(".disciplines__list");
        let matchFilter = true;

        categoryTxts.forEach(function (cat) {
            if (cat.indexOf("All Disciplines") == -1) {
                if (disciplinesList.innerHTML.indexOf(cat) == -1) {
                    matchFilter = false;
                }
            }
        });

        // visible or invisible

        if (matchFilter) {
            filteredItems.push(item);
        } else {
            item.style.display = "none";
        }

    });

    // in

    tl.to(filteredItems, obj.animIn);
}

dyncontent.toggleAllAnim = function (instant = false) {

    let n;

    if (instant) {
        n = 0;
    } else {
        n = 1000;
    }

    let tl = gsap.timeline();

    tl.to(".container.is--filter", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 0
    });

    tl.to(".toggle.is--all", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 1
    }, "<");

    tl.to(".toggle.is--filter", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 0.5
    }, "<0.1");

    tl.to(".selector", {
        duration: Math.min(0.4, n),
        ease: "power2.inOut",
        translateX: "0%"
    }, "<");

    tl.to(".container.is--filter", {
        duration: Math.min(0.4, n),
        ease: "power2.inOut",
        height: 0
    }, "<");
}

dyncontent.toggleAllClick = function (e) {

    dyncontent.toggleAllAnim();

    let namespace = global.replaceChar(document.querySelector(".wrapper").getAttribute("data-barba-namespace"));

    let obj;

    if (namespace.indexOf("graduates") !== -1) {

        obj = grads;
        obj.options.forEach(function (option) {
            if (option.innerText.indexOf("All Disciplines") !== -1) {
                option.classList.add("is--selected");
            } else {
                option.classList.remove("is--selected");
            }
        });

    } else {
        obj = projects;
    }

    obj.filters.forEach(function (select) {
        select.classList.remove("is--selected");
    });

    dyncontent.filter(...obj.filterParams, obj);
}

dyncontent.toggleFilterClick = function (e) {

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

    tl.to(".selector", {
        duration: 0.4,
        ease: "power2.inOut",
        translateX: "100%"
    }, "<");

    tl.to(".container.is--filter", {
        duration: 0.4,
        ease: "power2.inOut",
        height: "auto"
    }, "<");

    tl.to(".container.is--filter", {
        duration: 0.2,
        ease: "none",
        opacity: 1
    }, "<0.1");
}




// GRADS ONLY

grads.toggleAllAnim = function (instant = false) {

    let n;

    if (instant) {
        n = 0;
    } else {
        n = 1000;
    }

    let tl = gsap.timeline();

    tl.to(".container.is--filter", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 0
    });

    tl.to(".toggle.is--all", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 1
    }, "<");

    tl.to(".toggle.is--filter", {
        duration: Math.min(0.2, n),
        ease: "none",
        opacity: 0.5
    }, "<0.1");

    tl.to(".selector.is--mobile", {
        duration: Math.min(0.4, n),
        ease: "power2.inOut",
        translateX: "0%"
    }, "<");

    tl.to(".container.is--filter", {
        duration: Math.min(0.4, n),
        ease: "power2.inOut",
        height: 0
    }, "<");
}

grads.filter = function () { // fire this function on page load

    // get the grads list element
    grads.list = global.elementNext(document.querySelectorAll(".grads__list"));

    // get all grads items in array/nodelist
    grads.items = Array.from(grads.list.querySelectorAll(".grads__item"));

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
        disciplineH1s.forEach(function (h1, index) {
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

    grads.toggleAllAnim();

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

    tl.to(".container.is--filter", {
        duration: 0.2,
        ease: "none",
        opacity: 1
    }, "<0.1");
}

grads.init = function () {

    grads.filter();

    let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

    grads.options = Array.from(wrapper.querySelectorAll(".grads__option"));

    grads.options.forEach(function (option) {
        option.onclick = grads.optionClick;
    });

    grads.filters = Array.from(wrapper.querySelectorAll(".filter__item"));

    grads.filters.forEach(function (option) {
        option.onclick = grads.filterClick;
    });

    const toggleAll = wrapper.querySelector(".toggle.is--all");
    toggleAll.onclick = grads.toggleAllClick;

    const toggleFilter = wrapper.querySelector(".toggle.is--filter");
    toggleFilter.onclick = grads.toggleFilterClick;

    grads.toggleAllAnim(true);
}




// PROJECTS ONLY

projects.filterClick = function (e) {

    e.currentTarget.toggle("is--selected");
    dyncontent.filter(...projects.filterParams, projects);
}

projects.init = function () {

    dyncontent.filter(...projects.filterParams, projects, true);

    let wrapper = global.elementNext(document.querySelectorAll(".wrapper"));

    projects.filters = Array.from(wrapper.querySelectorAll(".filter__item"));

    projects.filters.forEach(function (option) {
        option.onclick = projects.filterClick;
    });

    const toggleAll = wrapper.querySelector(".toggle.is--all");
    toggleAll.onclick = dyncontent.toggleAllClick;

    const toggleFilter = wrapper.querySelector(".toggle.is--filter");
    toggleFilter.onclick = dyncontent.toggleFilterClick;

    dyncontent.toggleAllAnim(true);

}