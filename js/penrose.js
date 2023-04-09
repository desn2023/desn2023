// do not touch, Justin is working on this

const penrose = {
    zoneSize: 80, // distance at which the transition is triggered

    wrapper: document.querySelector("#penrose-wrapper"),
    svg: document.querySelector("#penrose-svg"),
    zonesGroup: document.querySelector("#penrose-zones-group"),
    zones: new Array(),
    sects: document.querySelectorAll(".sect"),
    origW: 1066,
    origH: 1045,
    active: []
}



penrose.zoneEnter = function (sect) {
    gsap.to(sect, {
        fillOpacity: 1,
        duration: 1
    });
}

penrose.zoneExit = function (sectId) {
    gsap.to("#" + sectId, {
        fillOpacity: 0,
        duration: 4,
        delay: 2
    });
}

penrose.sectEnter = function (e) {

}

penrose.sectLeave = function (e) {
}

penrose.setSize = function () {

    const wrapH = penrose.wrapper.clientHeight;
    const svgH = penrose.svg.getAttribute("height");

    const scale = wrapH / svgH;

    penrose.wrapper.style.width = (wrapH * penrose.origW / penrose.origH) + "px";
    penrose.svg.style.transform = "scale(" + scale + ")";

}

penrose.mouseMove = function (e) {

    penrose.pointer.x = e.offsetX - penrose.zoneSize / 2;
    penrose.pointer.y = e.offsetY - penrose.zoneSize / 2;

    const sectsOn = penrose.svg.getIntersectionList(penrose.pointer, null);
    const sectIdsOn = new Array();

    sectsOn.forEach(function (sect) {
        
        sectIdsOn.push(sect.id);

        if (penrose.active.indexOf(sect.id) == -1) {
            penrose.active.push(sect.id);
            penrose.zoneEnter(sect);
        }
    });

    const sectIdsOff = penrose.active.filter(x => sectIdsOn.indexOf(x) == -1);
    console.log(sectIdsOff);

    sectIdsOff.forEach(function (sectId) {

        let sectIdIndex = penrose.active.indexOf(sectId);
        penrose.active.splice(sectIdIndex, 1);

        penrose.zoneExit(sectId);
    });
}

penrose.initPointer = function () {

    penrose.pointer = penrose.svg.createSVGRect();
    penrose.pointer.width = penrose.zoneSize;
    penrose.pointer.height = penrose.zoneSize;

    penrose.svg.onmousemove = penrose.mouseMove;
}

penrose.init = function () {
    penrose.setSize(); // sizing
    penrose.sects.forEach(function (sect, index) { // add ids to all sects
        sect.id = "sect-" + index;
    });
    penrose.initPointer(); // create pointer svg rect and set mousemove event handler
}

