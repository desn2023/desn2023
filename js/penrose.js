// do not touch, Justin is working on this

let penrose = {
    wrapper: document.querySelector("#penrose-wrapper"),
    svg: document.querySelector("#penrose-svg"),
    sects: document.querySelectorAll(".sect"),
    origW: 1066,
    origH: 1045
}

penrose.setSize = function () {

    let wrapH = penrose.wrapper.clientHeight;
    let svgH = penrose.svg.getAttribute("height");

    let scale = wrapH / svgH;

    penrose.wrapper.style.width = (wrapH * penrose.origW / penrose.origH) + "px";
    penrose.svg.style.transform = "scale(" + scale + ")";

}

penrose.init = function () {

    // sizing
    penrose.setSize();

    // create zone shapes
    
}

