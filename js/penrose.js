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

penrose.mouseMove = function (e) {

    // penrose.pointer.setAttribute("x", e.offsetX - penrose.zoneHalf);
    // penrose.pointer.setAttribute("y", e.offsetY - penrose.zoneHalf);

    penrose.pointer.x = e.offsetX - penrose.zoneSize / 2;
    penrose.pointer.y = e.offsetY - penrose.zoneSize / 2;

    const intersects = penrose.svg.getIntersectionList(penrose.pointer, null);

    intersects.forEach(function (sect) {
        penrose.zoneEnter(sect);
    });
}

penrose.initPointer = function () {

    // penrose.pointer = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // penrose.pointer.setAttribute("width", penrose.zoneSize);
    // penrose.pointer.setAttribute("height", penrose.zoneSize);
    // penrose.pointer.setAttribute("x", 0);
    // penrose.pointer.setAttribute("y", 0);
    // penrose.pointer.setAttribute("fill", "blue");

    // penrose.svg.appendChild(penrose.pointer);

    penrose.pointer = penrose.svg.createSVGRect();
    penrose.pointer.width = penrose.zoneSize;
    penrose.pointer.height = penrose.zoneSize;

    penrose.svg.onmousemove = penrose.mouseMove;
}

penrose.init = function () {
    penrose.setSize(); // sizing
    penrose.initPointer();
}

