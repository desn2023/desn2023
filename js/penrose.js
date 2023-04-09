// do not touch, Justin is working on this

const penrose = {
    zoneRadius: 100, // distance at which the transition is triggered

    wrapper: document.querySelector("#penrose-wrapper"),
    svg: document.querySelector("#penrose-svg"),
    zonesGroup: document.querySelector("#penrose-zones-group"),
    zones: new Array(),
    sects: document.querySelectorAll(".sect"),
    origW: 1066,
    origH: 1045
}

penrose.zoneEnter = function (e) {
    sectID = parseInt(e.currentTarget.getAttribute("sectid"));
    console.log("!");

    gsap.to(penrose.sects[sectID], {
        fillOpacity: 1,
        duration: 0.25
    });
}

penrose.zoneLeave = function (e) {

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

penrose.initSect = function (sect, index) {

    // get centre coords of sector
    const bbox = sect.getBBox();
    const centreX = bbox.x + bbox.width / 2;
    const centreY = bbox.y + bbox.height / 2;

    // create zone shape
    const zoneShape = document.createElementNS("http://www.w3.org/2000/svg","circle");
    zoneShape.classList.add("sect-zone");
    zoneShape.setAttribute("sectid", index);

    // set centre of circle to same coords as centre of sector
    zoneShape.setAttribute("cx", centreX);
    zoneShape.setAttribute("cy", centreY);

    // circle radius is distance at which the transition is triggered
    zoneShape.setAttribute("r", penrose.zoneRadius);

    // events
    sect.onmouseover = penrose.sectEnter;
    sect.onmouseout = penrose.sectLeave;
    zoneShape.onmouseover = penrose.zoneEnter;
    zoneShape.onmouseout = penrose.zoneLeave;

    // add to svg
    penrose.zonesGroup.appendChild(zoneShape);
    // add to list
    penrose.zones.push(zoneShape);

}

penrose.init = function () {
    penrose.setSize(); // sizing
    penrose.sects.forEach(penrose.initSect); // create zone shapes set event handlers
}

