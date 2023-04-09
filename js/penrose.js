// SETTINGS

/* THINGS WE COULD TRY

    - random duration for exit animation
    - random chance whether sector will light up or not
    - some sectors flash on and then immediately off
    - flashing
    - scaling up when mousing over directly or nearby
    - switch colours

*/

const penrose = {
    zoneSizeW: 70, // x distance at which the transition is triggered
    zoneSizeH: 70, // y distance at which the transition is triggered
    glitch: true, // allows multiple tweens to run at same time, causing glitches in animation

    wrapper: document.querySelector("#penrose-wrapper"),
    svg: document.querySelector("#penrose-svg"),
    zonesGroup: document.querySelector("#penrose-zones-group"),
    zones: new Array(),
    sects: document.querySelectorAll(".sect"),
    origW: 1066, // dimensions of svg
    origH: 1045, // dimensions of svg
    active: [], // all sectors intersecting with pointer zone
    tweensZoneEnter: {}, // all ongoing enter animations
    tweensZoneExit: {} // all ongoing exit animations
}



penrose.zoneEnter = function (sect) {
    penrose.tweensZoneEnter[sect.id] = gsap.to(sect, {
        fillOpacity: 1,
        duration: 1,
        onComplete: function () {
            delete penrose.tweensZoneEnter[sect.id];
        }
    });
}

penrose.zoneExit = function (sectId) {
    penrose.tweensZoneExit[sectId] = gsap.to("#" + sectId, {
        fillOpacity: 0,
        duration: 4,
        delay: 2,
        onComplete: function () {
            delete penrose.tweensZoneExit[sectId];
        }
    });
}

penrose.sectEnter = function (e) {

}

penrose.sectExit = function (e) {

}





// EXECUTION

penrose.setSize = function () { // transform scale penrose.svg based on penrose.wrapper

    const wrapH = penrose.wrapper.clientHeight;
    const svgH = penrose.svg.getAttribute("height");

    const scale = wrapH / svgH;

    penrose.wrapper.style.width = (wrapH * penrose.origW / penrose.origH) + "px";
    penrose.svg.style.transform = "scale(" + scale + ")";

}

penrose.mouseMove = function (e) { // main animation

    // set pointer rect coords
    if (e.offsetX !== undefined) {
        penrose.pointer.x = e.offsetX - penrose.zoneSizeW / 2;
        penrose.pointer.y = e.offsetY - penrose.zoneSizeH / 2;
    } else if (e.layerX !== undefined) {
        penrose.pointer.x = e.layerX - penrose.zoneSizeW / 2;
        penrose.pointer.y = e.layerY - penrose.zoneSizeH / 2;
    }

    // all sectors that intersect with pointer rect
    const sectsOn = penrose.svg.getIntersectionList(penrose.pointer, null);
    const sectIdsOn = new Array(); // same as sectsOn but will contain ids only

    // for all intersecting sectors
    sectsOn.forEach(function (sect) {
        
        sectIdsOn.push(sect.id); 

        if (penrose.active.indexOf(sect.id) == -1) { // if not on active list
            penrose.active.push(sect.id); // add sector to active list

            // stop animation from glitching from multiple tweens running at same time
            if (!penrose.glitch && penrose.tweensZoneExit[sect.id] !== undefined) {
                penrose.tweensZoneExit[sect.id].kill();
            }

            penrose.zoneEnter(sect); // fire enter animation
        }
    });

    // get ids of sectors that are no longer intersecting
    const sectIdsOff = penrose.active.filter(x => sectIdsOn.indexOf(x) == -1); 

    // for all sectors no longer intersecting
    sectIdsOff.forEach(function (sectId) {

        let sectIdIndex = penrose.active.indexOf(sectId); // find sectId index to delete
        penrose.active.splice(sectIdIndex, 1); // delete sectId from active list

        penrose.zoneExit(sectId); // fire exit animation
    });
}

penrose.initPointer = function () { // create pointer zone

    penrose.pointer = penrose.svg.createSVGRect();
    penrose.pointer.width = penrose.zoneSizeW;
    penrose.pointer.height = penrose.zoneSizeH;

    penrose.svg.onmousemove = penrose.mouseMove;
}

penrose.initHover = function () { // events for hovering directly on a sector
    penrose.sects.forEach(function (sect) {
        sect.onmouseover = penrose.sectEnter;
    });
    penrose.sects.forEach(function (sect) {
        sect.onmouseout = penrose.sectExit;
    });
}

penrose.init = function () {
    penrose.setSize(); // sizing
    penrose.sects.forEach(function (sect, index) { sect.id = "sect-" + index; }); // add ids to all sectors
    penrose.initPointer(); // create pointer svg rect and set mousemove event handler
    penrose.initHover(); // set event handlers for hovering directly on sector
}




// POLYFILLS

const getIntersectionListPolyfill = function (rect, referenceElement) {
    var intersectionList = [];
    var root = this.ownerSVGElement || this;

    // Get all elements that intersect with rect
    var elements = root.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element !== this && element instanceof SVGGraphicsElement) {
            var bbox = element.getBBox();
            if (rect.width && rect.height && bbox.width && bbox.height) {
                if (bbox.x + bbox.width > rect.x &&
                    bbox.y + bbox.height > rect.y &&
                    bbox.x < rect.x + rect.width &&
                    bbox.y < rect.y + rect.height) {
                    intersectionList.push(element);
                }
            }
        }
    }

    // Sort elements in document order
    intersectionList.sort(function (a, b) {
        return (a.compareDocumentPosition(b) & 2) ? 1 : -1;
    });

    // Filter elements by referenceElement
    if (referenceElement) {
        intersectionList = intersectionList.filter(function (element) {
            return element === referenceElement || element.contains(referenceElement);
        });
    }

    return intersectionList;
}

if (!SVGElement.prototype.getIntersectionList) {
    SVGElement.prototype.getIntersectionList = getIntersectionListPolyfill;
}