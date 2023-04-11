// SETTINGS

/* TO-DO

    - preset animation
    - heart
    - transition in

*/

const penrose = {
    zoneSizeW: 60, // x distance at which the transition is triggered
    zoneSizeH: 60, // y distance at which the transition is triggered
    zoneMultiply: 1.5, // how much zone grows
    glitch: false, // allows multiple tweens to run at same time, causing glitches in animation
    heartInterval: 1500,

    colours: [
        [".top", "#333333"],
        [".left", "white"],
        [".right", "black"]
    ],
    accentColours: [
        "#ED3D3D",
        "#68D380",
        "#19BAFF"
    ],

    zoneMultiplyAnim: 2,
    animDuration: 4,
    // animCoords: [ // x shape pattern, as percentage of x,y
    //     [0.8, 0.2], // top right
    //     [0.2, 0.8], // bottom left
    //     [0.8, 0.8], // bottom right
    //     [0.2, 0.2], // top left
    //     [0.2, 0.8], // bottom left
    //     [0.8, 0.2], // top right
    //     [0.8, 0.8], // bottom right
    //     [0.2, 0.2]  // top left
    // ],
    // animCoords: [ // zigzag pattern (more zags)
    //     [0.8, 0.4],
    //     [0.2, 0.6],
    //     [0.8, 0.8],
    //     [0.2, 0.8],
    //     [0.8, 0.6],
    //     [0.2, 0.4],
    //     [0.8, 0.2],
    //     [0.2, 0.2]
    // ],
    animCoords: [ // zigzag pattern (less zags) 
        [0.8, 0.5],
        [0.2, 0.8],
        [0.8, 0.8],
        [0.2, 0.5],
        [0.8, 0.2],
        [0.2, 0.2]
    ],

    heartSects: [196,191,230,15,152,5,91,95,85,90,96,0,11,158,202,235,236,192,197,49,205,52,44,153,16,7,170,175],

    wrapper: document.querySelector("#penrose-wrapper"),
    origW: 1066, // dimensions of svg
    origH: 1045, // dimensions of svg
    counter: 0,
    mouse: false,
    active: [], // all sectors intersecting with pointer zone
    tweensZoneEnter: {}, // all ongoing enter animations
    tweensZoneExit: {} // all ongoing exit animations
}




// EVENTS

penrose.zoneEnter = function (sect) {
    penrose.tweensZoneEnter[sect.id] = gsap.to(sect, {
        fillOpacity: 1,
        duration: 1,
        onComplete: function () {
            delete penrose.tweensZoneEnter[sect.id];
        }
    });
    
    // gsap.to(sect, { // stroke animation
    //     stroke: "hsl(0, 0%, 60%)",
    //     duration: 1
    // });
}

penrose.zoneExit = function (sectId) {
    penrose.tweensZoneExit[sectId] = gsap.to("#" + sectId, {
        fillOpacity: 0,
        duration: 0.25 + Math.random() * 0.25,
        delay: 0.75 + Math.random(),
        onComplete: function () {
            delete penrose.tweensZoneExit[sectId];
        }
    });
    // gsap.to("#" + sectId, { // stroke animation
    //     stroke: "hsl(0, 0%, 30%)",
    //     duration: 0 + Math.random() * 0.5,
    //     delay: 1.5 + Math.random()
    // });
}

penrose.sectEnter = function (e) {

}

penrose.sectExit = function (e) {

}

penrose.mouseDown = function (e) {
    // scale up pointer zone size
    penrose.pointer.width = penrose.zoneSizeW * penrose.zoneMultiply;
    penrose.pointer.height = penrose.zoneSizeH * penrose.zoneMultiply;

    penrose.setColours([[".top", penrose.accentColours[0]]], {
        duration: 2
    });

    penrose.accentColours.push(penrose.accentColours.splice(0, 1)[0]); // move colour to end of array
}

penrose.mouseUp = function (e) {
    // scale down pointer zone size to normal
    penrose.pointer.width = penrose.zoneSizeW / penrose.zoneMultiply;
    penrose.pointer.height = penrose.zoneSizeH / penrose.zoneMultiply;

    gsap.killTweensOf(".sect.top", "fill");

    penrose.setColours([penrose.colours[0]], {
        duration: 0.5
    });
}

penrose.mouseEnter = function (e) {
    // penrose.initPointer();
    // penrose.initHover();

    penrose.killAnim();
}

penrose.mouseLeave = function (e) {
    
    penrose.pointer.width = penrose.zoneSizeW / penrose.zoneMultiply;
    penrose.pointer.height = penrose.zoneSizeH / penrose.zoneMultiply;

    gsap.killTweensOf(".sect.top", "fill");

    penrose.setColours([penrose.colours[0]], {
        duration: 0.5
    });

    penrose.initAnim();
}

penrose.showHeart = function () {

    if (penrose.counter >= penrose.heartInterval) {

        penrose.counter = 0;    
        penrose.killMouse();
        penrose.svg.onmouseleave = null;
        penrose.svg.onmouseenter = null;

        penrose.heartAnim = gsap.timeline ({
            onComplete: function () {
                penrose.setColours();
                penrose.pointer.width = penrose.zoneSizeW;
                penrose.pointer.height = penrose.zoneSizeH;
                penrose.reinitMouse();
                penrose.svg.onmouseenter = penrose.mouseEnter;
                penrose.svg.onmouseleave = penrose.mouseLeave;
            }            
        });


        gsap.killTweensOf(".sect");

        penrose.heartAnim.to(".sect", {
            fillOpacity: 1,
            fill: "#ED3D3D",
            duration: 0.25,
            stagger: 0.01
        });

        penrose.heartAnim.to(".sect", {
            fillOpacity: 1,
            fill: "#ED3D3D",
            duration: 0
        });

        penrose.heartAnim.to(".sect:not(.heart)", {
            fillOpacity: 0,
            duration: 0.25,
            stagger: 0.01
        });

        penrose.heartAnim.to(".sect.heart", {
            fillOpacity: 0,
            duration: 0.25,
            stagger: 0.01,
            delay: 0.5
        });
    }
}




// EXECUTION

penrose.setColours = function (colours = penrose.colours, gsapVarObj) { // sets sector fill and  gsap tween

    colours.forEach(function (colourSet) {
        const selector = ".sect" + colourSet[0];
        const sects = document.querySelectorAll(selector);

        sects.forEach(function(sect) {
            if (gsapVarObj == undefined) {                
                sect.style.fill = colourSet[1];
            } else {
                gsapVarObj.fill = colourSet[1];
                gsap.to(sect, gsapVarObj);
            }
        });
    });
}

penrose.setSize = function () { // transform scale penrose.svg based on penrose.wrapper

    const wrapH = penrose.wrapper.clientHeight;
    const svgH = penrose.svg.getAttribute("height");

    const scale = wrapH / svgH;

    penrose.wrapper.style.width = (wrapH * penrose.origW / penrose.origH) + "px";
    penrose.svg.style.transform = "scale(" + scale + ")";

}

penrose.transition = function () { // fade sectors based on penrose.pointer position

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

            if (penrose.mouse) {
                penrose.counter++;
                penrose.showHeart();
            }
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

penrose.mouseMove = function (e) { // main animation

    // set pointer rect coords
    if (e.offsetX !== undefined) {
        penrose.pointer.x = e.offsetX - penrose.zoneSizeW / 2;
        penrose.pointer.y = e.offsetY - penrose.zoneSizeH / 2;
    } else if (e.layerX !== undefined) {
        penrose.pointer.x = e.layerX - penrose.zoneSizeW / 2;
        penrose.pointer.y = e.layerY - penrose.zoneSizeH / 2;
    }

    penrose.transition(); // fade sectors
}

penrose.addSVG = function () {
    const svgCode = '<svg fill=none height=1045 id=penrose-svg viewBox="0 0 1066 1045"width=1066 xmlns=http://www.w3.org/2000/svg><path class="sect left"d="M584.278 404.378V463.512L532.966 433.944V374.811L584.278 404.378Z"/><path class="sect left"d="M481.656 581.776V640.909L430.344 611.343V552.21L481.656 581.776Z"/><path class="sect left"d="M686.902 226.981V286.112L635.59 256.547V197.414L686.902 226.981Z"/><path class="sect left"d="M379.032 759.173V818.306L327.72 788.741V729.608L379.032 759.173Z"/><path class="sect left"d="M789.524 49.582V108.715L738.214 79.1484V20.0157L789.524 49.582Z"/><path class="sect top"d="M584.278 463.512L532.966 493.077L481.656 463.512L532.966 433.944L584.278 463.512Z"/><path class="sect top"d="M481.656 640.909L430.344 670.475L379.032 640.909L430.344 611.343L481.656 640.909Z"/><path class="sect top"d="M686.902 286.112L635.59 315.68L584.278 286.112L635.59 256.547L686.902 286.112Z"/><path class="sect top"d="M379.032 818.306L327.72 847.874L276.408 818.306L327.72 788.741L379.032 818.306Z"/><path class="sect top"d="M789.524 108.715L738.214 138.281L686.902 108.715L738.214 79.1486L789.524 108.715Z"/><path class="sect left"d="M481.656 522.643V581.776L430.344 552.21V493.077L481.656 522.643Z"/><path class="sect left"d="M584.278 345.245V404.378L532.966 374.811V315.68L584.278 345.245Z"/><path class="sect left"d="M379.032 700.042V759.173L327.72 729.608V670.475L379.032 700.042Z"/><path class="sect left"d="M686.902 167.847V226.981L635.59 197.414V138.281L686.902 167.847Z"/><path class="sect left"d="M276.408 877.44V936.573L225.098 907.005V847.874L276.408 877.44Z"/><path class="sect top"d="M532.966 493.077L481.656 522.643L430.344 493.077L481.656 463.512L532.966 493.077Z"/><path class="sect top"d="M635.59 315.68L584.278 345.245L532.966 315.68L584.278 286.112L635.59 315.68Z"/><path class="sect top"d="M430.344 670.475L379.032 700.042L327.72 670.475L379.032 640.909L430.344 670.475Z"/><path class="sect top"d="M738.214 138.281L686.902 167.847L635.59 138.281L686.902 108.715L738.214 138.281Z"/><path class="sect top"d="M327.72 847.874L276.41 877.44L225.098 847.874L276.41 818.306L327.72 847.874Z"/><path class="sect left"d="M789.526 404.378V463.512L738.214 433.944V374.811L789.526 404.378Z"/><path class="sect left"d="M686.902 581.776V640.909L635.59 611.341V552.21L686.902 581.776Z"/><path class="sect left"d="M892.148 226.981V286.112L840.836 256.547V197.414L892.148 226.981Z"/><path class="sect left"d="M584.278 759.173V818.306L532.966 788.741V729.608L584.278 759.173Z"/><path class="sect left"d="M481.656 936.573V995.706L430.344 966.138V907.005L481.656 936.573Z"/><path class="sect top"d="M686.902 640.909L635.59 670.475L584.278 640.909L635.59 611.343L686.902 640.909Z"/><path class="sect top"d="M584.278 818.306L532.966 847.874L481.656 818.306L532.966 788.741L584.278 818.306Z"/><path class="sect top"d="M789.524 463.512L738.214 493.077L686.902 463.512L738.214 433.944L789.524 463.512Z"/><path class="sect top"d="M481.656 995.704L430.344 1025.27L379.032 995.704L430.344 966.138L481.656 995.704Z"/><path class="sect top"d="M892.148 286.112L840.836 315.68L789.524 286.112L840.836 256.547L892.148 286.112Z"/><path class="sect left"d="M686.902 522.643V581.776L635.59 552.21V493.077L686.902 522.643Z"/><path class="sect left"d="M789.526 345.245V404.378L738.214 374.811V315.68L789.526 345.245Z"/><path class="sect left"d="M584.278 700.042V759.173L532.966 729.608V670.475L584.278 700.042Z"/><path class="sect left"d="M892.148 167.847V226.981L840.836 197.414V138.281L892.148 167.847Z"/><path class="sect left"d="M481.656 877.44V936.573L430.344 907.005V847.874L481.656 877.44Z"/><path class="sect top"d="M635.59 670.475L584.278 700.042L532.966 670.475L584.278 640.909L635.59 670.475Z"/><path class="sect top"d="M738.214 493.077L686.902 522.643L635.59 493.077L686.902 463.512L738.214 493.077Z"/><path class="sect top"d="M532.966 847.874L481.656 877.44L430.344 847.874L481.656 818.306L532.966 847.874Z"/><path class="sect top"d="M840.836 315.68L789.526 345.245L738.214 315.68L789.526 286.112L840.836 315.68Z"/><path class="sect left"d="M379.032 404.378V463.512L327.72 433.944V374.811L379.032 404.378Z"/><path class="sect left"d="M276.408 581.776V640.909L225.098 611.341V552.21L276.408 581.776Z"/><path class="sect left"d="M481.656 226.981V286.112L430.344 256.547V197.414L481.656 226.981Z"/><path class="sect left"d="M173.786 759.173V818.306L122.474 788.741V729.608L173.786 759.173Z"/><path class="sect left"d="M584.278 49.582V108.715L532.966 79.1484V20.0157L584.278 49.582Z"/><path class="sect top"d="M481.656 286.112L430.344 315.68L379.032 286.112L430.344 256.547L481.656 286.112Z"/><path class="sect top"d="M379.032 463.512L327.72 493.077L276.408 463.512L327.72 433.944L379.032 463.512Z"/><path class="sect top"d="M584.278 108.715L532.966 138.281L481.656 108.715L532.966 79.1486L584.278 108.715Z"/><path class="sect top"d="M276.408 640.909L225.098 670.475L173.786 640.909L225.098 611.343L276.408 640.909Z"/><path class="sect left"d="M276.408 522.643V581.776L225.098 552.21V493.077L276.408 522.643Z"/><path class="sect left"d="M379.032 345.245V404.378L327.72 374.811V315.68L379.032 345.245Z"/><path class="sect left"d="M173.786 700.042V759.173L122.474 729.608V670.475L173.786 700.042Z"/><path class="sect left"d="M481.656 167.847V226.981L430.344 197.414V138.281L481.656 167.847Z"/><path class="sect top"d="M430.344 315.68L379.032 345.245L327.72 315.68L379.032 286.112L430.344 315.68Z"/><path class="sect top"d="M532.966 138.281L481.656 167.847L430.344 138.281L481.656 108.715L532.966 138.281Z"/><path class="sect top"d="M327.72 493.077L276.41 522.643L225.098 493.077L276.41 463.512L327.72 493.077Z"/><path class="sect top"d="M225.098 670.475L173.786 700.042L122.474 670.475L173.786 640.909L225.098 670.475Z"/><path class="sect left"d="M994.772 404.378V463.512L943.46 433.944V374.811L994.772 404.378Z"/><path class="sect left"d="M892.148 581.776V640.909L840.836 611.341V552.21L892.148 581.776Z"/><path class="sect left"d="M789.526 759.173V818.306L738.214 788.741V729.608L789.526 759.173Z"/><path class="sect left"d="M686.902 936.573V995.704L635.59 966.138V907.005L686.902 936.573Z"/><path class="sect top"d="M789.524 818.306L738.214 847.874L686.902 818.306L738.214 788.741L789.524 818.306Z"/><path class="sect top"d="M686.902 995.704L635.59 1025.27L584.278 995.704L635.59 966.138L686.902 995.704Z"/><path class="sect top"d="M892.148 640.909L840.836 670.475L789.524 640.909L840.836 611.343L892.148 640.909Z"/><path class="sect top"d="M994.772 463.512L943.46 493.077L892.148 463.512L943.46 433.944L994.772 463.512Z"/><path class="sect left"d="M892.148 522.643V581.776L840.836 552.21V493.077L892.148 522.643Z"/><path class="sect left"d="M789.526 700.042V759.173L738.214 729.608V670.475L789.526 700.042Z"/><path class="sect left"d="M686.902 877.44V936.573L635.59 907.005V847.874L686.902 877.44Z"/><path class="sect top"d="M738.214 847.874L686.902 877.44L635.59 847.874L686.902 818.306L738.214 847.874Z"/><path class="sect top"d="M840.836 670.475L789.524 700.042L738.214 670.475L789.526 640.909L840.836 670.475Z"/><path class="sect top"d="M943.46 493.077L892.148 522.643L840.836 493.077L892.148 463.512L943.46 493.077Z"/><path class="sect left"d="M173.786 404.378V463.512L122.474 433.944V374.811L173.786 404.378Z"/><path class="sect left"d="M276.408 226.981V286.112L225.098 256.547V197.414L276.408 226.981Z"/><path class="sect left"d="M379.032 49.582V108.715L327.72 79.1484V20.0157L379.032 49.582Z"/><path class="sect top"d="M379.032 108.715L327.72 138.281L276.408 108.715L327.72 79.1486L379.032 108.715Z"/><path class="sect top"d="M276.408 286.112L225.098 315.68L173.786 286.112L225.098 256.547L276.408 286.112Z"/><path class="sect top"d="M173.786 463.512L122.474 493.077L71.1626 463.512L122.474 433.944L173.786 463.512Z"/><path class="sect left"d="M71.1626 522.643V581.776L19.851 552.21V493.077L71.1626 522.643Z"/><path class="sect left"d="M173.786 345.245V404.378L122.474 374.811V315.68L173.786 345.245Z"/><path class="sect left"d="M276.408 167.847V226.981L225.098 197.414V138.281L276.408 167.847Z"/><path class="sect top"d="M327.72 138.281L276.41 167.847L225.098 138.281L276.41 108.715L327.72 138.281Z"/><path class="sect top"d="M225.098 315.68L173.786 345.245L122.474 315.68L173.786 286.112L225.098 315.68Z"/><path class="sect top"d="M122.474 493.077L71.1625 522.643L19.851 493.077L71.1625 463.512L122.474 493.077Z"/><path class="sect left"d="M994.772 759.173V818.306L943.46 788.741V729.608L994.772 759.173Z"/><path class="sect top"d="M994.772 818.306L943.46 847.874L892.148 818.306L943.46 788.741L994.772 818.306Z"/><path class="sect left"d="M994.772 700.042V759.173L943.46 729.608V670.475L994.772 700.042Z"/><path class="sect right"d="M532.968 433.944L481.656 463.512V404.378L532.968 374.811V433.944Z"/><path class="sect right"d="M327.72 433.944L276.408 463.512V404.378L327.72 374.811V433.944Z"/><path class="sect right"d="M738.214 433.944L686.902 463.512V404.378L738.214 374.811V433.944Z"/><path class="sect right"d="M122.474 433.944L71.1626 463.512V404.378L122.474 374.811V433.944Z"/><path class="sect right"d="M943.46 433.944L892.148 463.512V404.378L943.46 374.811V433.944Z"/><path class="sect left"d="M635.59 433.944V493.077L584.278 463.512V404.378L635.59 433.944Z"/><path class="sect left"d="M430.344 433.944V493.077L379.032 463.512V404.378L430.344 433.944Z"/><path class="sect left"d="M840.836 433.944V493.077L789.526 463.512V404.378L840.836 433.944Z"/><path class="sect left"d="M225.098 433.944V493.077L173.786 463.512V404.378L225.098 433.944Z"/><path class="sect left"d="M1046.08 433.944V493.077L994.772 463.512V404.378L1046.08 433.944Z"/><path class="sect right"d="M481.656 463.512L430.344 493.077V433.944L481.656 404.378V463.512Z"/><path class="sect right"d="M686.902 463.512L635.59 493.077V433.944L686.902 404.378V463.512Z"/><path class="sect right"d="M276.408 463.512L225.098 493.077V433.944L276.408 404.378V463.512Z"/><path class="sect right"d="M892.148 463.512L840.836 493.077V433.944L892.148 404.378V463.512Z"/><path class="sect right"d="M635.59 611.343L584.278 640.909V581.776L635.59 552.21V611.343Z"/><path class="sect right"d="M430.344 611.343L379.032 640.909V581.776L430.344 552.21V611.343Z"/><path class="sect right"d="M840.836 611.341L789.526 640.909V581.776L840.836 552.21V611.341Z"/><path class="sect right"d="M225.098 611.341L173.786 640.909V581.776L225.098 552.21V611.341Z"/><path class="sect left"d="M532.966 611.341V670.475L481.656 640.909V581.776L532.966 611.341Z"/><path class="sect left"d="M327.72 611.341V670.475L276.41 640.909V581.776L327.72 611.341Z"/><path class="sect left"d="M738.214 611.341V670.475L686.902 640.909V581.776L738.214 611.341Z"/><path class="sect left"d="M122.474 611.341V670.475L71.1628 640.909V581.776L122.474 611.341Z"/><path class="sect left"d="M943.46 611.341V670.475L892.148 640.909V581.776L943.46 611.341Z"/><path class="sect right"d="M584.278 640.909L532.966 670.475V611.341L584.278 581.776V640.909Z"/><path class="sect right"d="M789.524 640.909L738.214 670.475V611.341L789.524 581.776V640.909Z"/><path class="sect right"d="M379.032 640.909L327.72 670.475V611.341L379.032 581.776V640.909Z"/><path class="sect right"d="M994.772 640.909L943.46 670.475V611.341L994.772 581.776V640.909Z"/><path class="sect right"d="M173.786 640.909L122.474 670.475V611.341L173.786 581.776V640.909Z"/><path class="sect right"d="M430.344 256.547L379.032 286.112V226.981L430.344 197.414V256.547Z"/><path class="sect right"d="M225.098 256.547L173.786 286.112V226.981L225.098 197.414V256.547Z"/><path class="sect right"d="M635.59 256.547L584.278 286.112V226.981L635.59 197.414V256.547Z"/><path class="sect right"d="M840.836 256.547L789.526 286.112V226.981L840.836 197.414V256.547Z"/><path class="sect left"d="M738.214 256.547V315.68L686.902 286.112V226.981L738.214 256.547Z"/><path class="sect left"d="M532.966 256.547V315.68L481.656 286.112V226.981L532.966 256.547Z"/><path class="sect left"d="M943.46 256.547V315.68L892.148 286.112V226.981L943.46 256.547Z"/><path class="sect left"d="M327.72 256.547V315.68L276.41 286.112V226.981L327.72 256.547Z"/><path class="sect right"d="M379.032 286.112L327.72 315.68V256.547L379.032 226.981V286.112Z"/><path class="sect right"d="M584.278 286.112L532.966 315.68L532.968 256.547L584.278 226.981V286.112Z"/><path class="sect right"d="M173.786 286.112L122.474 315.68V256.547L173.786 226.981V286.112Z"/><path class="sect right"d="M789.524 286.112L738.214 315.68V256.547L789.524 226.981V286.112Z"/><path class="sect right"d="M738.214 788.741L686.902 818.306V759.173L738.214 729.608V788.741Z"/><path class="sect right"d="M532.968 788.741L481.656 818.306V759.173L532.968 729.608V788.741Z"/><path class="sect right"d="M943.46 788.741L892.148 818.306V759.173L943.46 729.608V788.741Z"/><path class="sect right"d="M327.72 788.741L276.408 818.306V759.173L327.72 729.608V788.741Z"/><path class="sect left"d="M430.344 788.741V847.874L379.032 818.306V759.173L430.344 788.741Z"/><path class="sect left"d="M225.098 788.741V847.874L173.786 818.306V759.173L225.098 788.741Z"/><path class="sect left"d="M635.59 788.741V847.872L584.278 818.306V759.173L635.59 788.741Z"/><path class="sect left"d="M840.836 788.741V847.872L789.526 818.306V759.173L840.836 788.741Z"/><path class="sect right"d="M686.902 818.306L635.59 847.872V788.741L686.902 759.173V818.306Z"/><path class="sect right"d="M892.148 818.306L840.836 847.874V788.741L892.148 759.173V818.306Z"/><path class="sect right"d="M481.656 818.306L430.344 847.874V788.741L481.656 759.173V818.306Z"/><path class="sect right"d="M276.408 818.306L225.098 847.874V788.741L276.408 759.173V818.306Z"/><path class="sect right"d="M327.72 79.1486L276.408 108.715V49.5822L327.72 20.0158V79.1486Z"/><path class="sect right"d="M532.968 79.1486L481.656 108.715V49.5822L532.968 20.0158V79.1486Z"/><path class="sect right"d="M738.214 79.1486L686.902 108.715V49.5822L738.214 20.0158V79.1486Z"/><path class="sect left"d="M840.836 79.1486V138.281L789.526 108.715V49.5822L840.836 79.1486Z"/><path class="sect left"d="M635.59 79.1486V138.281L584.278 108.715V49.5822L635.59 79.1486Z"/><path class="sect left"d="M430.344 79.1486V138.281L379.032 108.715V49.5822L430.344 79.1486Z"/><path class="sect right"d="M276.408 108.715L225.098 138.281V79.1486L276.408 49.5822V108.715Z"/><path class="sect right"d="M481.656 108.715L430.344 138.281V79.1486L481.656 49.5822V108.715Z"/><path class="sect right"d="M686.902 108.715L635.59 138.281V79.1486L686.902 49.5822V108.715Z"/><path class="sect right"d="M635.59 966.138L584.278 995.704V936.573L635.59 907.005V966.138Z"/><path class="sect right"d="M430.344 966.138L379.032 995.706V936.573L430.344 907.005V966.138Z"/><path class="sect left"d="M532.966 966.138V1025.27L481.656 995.704V936.573L532.966 966.138Z"/><path class="sect left"d="M738.214 966.138V1025.27L686.902 995.704V936.573L738.214 966.138Z"/><path class="sect right"d="M584.278 995.704L532.966 1025.27V966.138L584.278 936.573V995.704Z"/><path class="sect right"d="M379.032 995.704L327.72 1025.27V966.138L379.032 936.573V995.704Z"/><path class="sect top"d="M635.59 493.077L584.278 522.643L532.966 493.077L584.278 463.512L635.59 493.077Z"/><path class="sect top"d="M532.966 315.68L481.656 345.245L430.344 315.68L481.656 286.112L532.966 315.68Z"/><path class="sect top"d="M738.214 670.475L686.902 700.042L635.59 670.475L686.902 640.909L738.214 670.475Z"/><path class="sect top"d="M430.344 138.281L379.032 167.847L327.72 138.281L379.032 108.715L430.344 138.281Z"/><path class="sect top"d="M840.836 847.874L789.526 877.44L738.214 847.874L789.526 818.306L840.836 847.874Z"/><path class="sect right"d="M635.59 552.21L584.278 581.776V522.643L635.59 493.077V552.21Z"/><path class="sect right"d="M532.968 374.811L481.656 404.378V345.245L532.966 315.68L532.968 374.811Z"/><path class="sect right"d="M738.214 729.608L686.902 759.173V700.042L738.214 670.475V729.608Z"/><path class="sect right"d="M430.344 197.414L379.032 226.981V167.847L430.344 138.281V197.414Z"/><path class="sect right"d="M840.836 907.005L789.524 936.573V877.44L840.836 847.874V907.005Z"/><path class="sect top"d="M532.968 670.475L481.656 700.042L430.344 670.475L481.656 640.909L532.968 670.475Z"/><path class="sect top"d="M430.344 493.077L379.032 522.643L327.72 493.077L379.032 463.512L430.344 493.077Z"/><path class="sect top"d="M635.59 847.874L584.278 877.44L532.966 847.874L584.278 818.306L635.59 847.874Z"/><path class="sect top"d="M327.72 315.68L276.41 345.245L225.098 315.68L276.41 286.112L327.72 315.68Z"/><path class="sect right"d="M430.344 552.21L379.032 581.776V522.643L430.344 493.077V552.21Z"/><path class="sect right"d="M327.72 374.811L276.408 404.378V345.245L327.72 315.68V374.811Z"/><path class="sect right"d="M532.968 729.608L481.656 759.173V700.042L532.968 670.475V729.608Z"/><path class="sect right"d="M635.59 907.005L584.278 936.573V877.44L635.59 847.874V907.005Z"/><path class="sect top"d="M738.214 315.68L686.902 345.245L635.59 315.68L686.902 286.112L738.214 315.68Z"/><path class="sect top"d="M635.59 138.281L584.278 167.847L532.966 138.281L584.278 108.715L635.59 138.281Z"/><path class="sect top"d="M840.836 493.077L789.526 522.643L738.214 493.077L789.526 463.512L840.836 493.077Z"/><path class="sect top"d="M943.46 670.475L892.148 700.042L840.836 670.475L892.148 640.909L943.46 670.475Z"/><path class="sect right"d="M840.836 552.21L789.524 581.776V522.643L840.836 493.077V552.21Z"/><path class="sect right"d="M738.214 374.811L686.902 404.378V345.245L738.214 315.68V374.811Z"/><path class="sect right"d="M943.46 729.608L892.148 759.173V700.042L943.46 670.475V729.608Z"/><path class="sect right"d="M635.59 197.414L584.278 226.981V167.847L635.59 138.281V197.414Z"/><path class="sect top"d="M430.344 847.874L379.032 877.44L327.72 847.874L379.032 818.306L430.344 847.874Z"/><path class="sect top"d="M327.72 670.475L276.41 700.042L225.098 670.475L276.41 640.909L327.72 670.475Z"/><path class="sect top"d="M225.098 493.077L173.786 522.643L122.474 493.077L173.786 463.512L225.098 493.077Z"/><path class="sect right"d="M225.098 552.21L173.786 581.776V522.643L225.098 493.077V552.21Z"/><path class="sect right"d="M122.474 374.811L71.1626 404.378V345.245L122.474 315.68V374.811Z"/><path class="sect right"d="M327.72 729.608L276.408 759.173V700.042L327.72 670.475V729.608Z"/><path class="sect right"d="M430.344 907.005L379.032 936.573V877.44L430.344 847.874V907.005Z"/><path class="sect top"d="M840.836 138.281L789.526 167.847L738.214 138.281L789.526 108.715L840.836 138.281Z"/><path class="sect top"d="M943.46 315.68L892.148 345.245L840.836 315.68L892.148 286.112L943.46 315.68Z"/><path class="sect top"d="M1046.08 493.077L994.772 522.643L943.46 493.077L994.772 463.512L1046.08 493.077Z"/><path class="sect right"d="M1046.08 552.21L994.772 581.776V522.643L1046.08 493.077V552.21Z"/><path class="sect right"d="M943.46 374.811L892.148 404.378V345.245L943.46 315.68V374.811Z"/><path class="sect right"d="M840.836 197.414L789.526 226.981V167.847L840.836 138.281V197.414Z"/><path class="sect left"d="M584.278 522.643V581.776L532.966 552.21V493.077L584.278 522.643Z"/><path class="sect left"d="M686.902 345.245V404.378L635.59 374.811V315.68L686.902 345.245Z"/><path class="sect left"d="M481.656 700.042V759.173L430.344 729.608V670.475L481.656 700.042Z"/><path class="sect left"d="M789.524 167.847V226.981L738.214 197.414V138.281L789.524 167.847Z"/><path class="sect left"d="M379.032 877.44V936.573L327.72 907.005V847.874L379.032 877.44Z"/><path class="sect top"d="M584.278 581.776L532.966 611.343L481.656 581.776L532.966 552.21L584.278 581.776Z"/><path class="sect top"d="M686.902 404.378L635.59 433.944L584.278 404.378L635.59 374.811L686.902 404.378Z"/><path class="sect top"d="M481.656 759.173L430.344 788.741L379.032 759.173L430.344 729.608L481.656 759.173Z"/><path class="sect top"d="M789.524 226.981L738.214 256.547L686.902 226.981L738.214 197.414L789.524 226.981Z"/><path class="sect top"d="M379.032 936.573L327.72 966.138L276.408 936.573L327.72 907.005L379.032 936.573Z"/><path class="sect left"d="M379.032 522.643V581.776L327.72 552.21V493.077L379.032 522.643Z"/><path class="sect left"d="M481.656 345.245V404.378L430.344 374.811V315.68L481.656 345.245Z"/><path class="sect left"d="M276.408 700.042V759.173L225.098 729.608V670.475L276.408 700.042Z"/><path class="sect left"d="M584.278 167.847V226.981L532.966 197.414V138.281L584.278 167.847Z"/><path class="sect top"d="M481.656 404.378L430.344 433.944L379.032 404.378L430.344 374.811L481.656 404.378Z"/><path class="sect top"d="M584.278 226.981L532.966 256.547L481.656 226.981L532.966 197.414L584.278 226.981Z"/><path class="sect top"d="M379.032 581.776L327.72 611.343L276.408 581.776L327.72 552.21L379.032 581.776Z"/><path class="sect top"d="M276.408 759.173L225.098 788.741L173.786 759.173L225.098 729.608L276.408 759.173Z"/><path class="sect left"d="M789.526 522.643V581.776L738.214 552.21V493.077L789.526 522.643Z"/><path class="sect left"d="M892.148 345.245V404.378L840.836 374.811V315.68L892.148 345.245Z"/><path class="sect left"d="M686.902 700.042V759.173L635.59 729.608V670.475L686.902 700.042Z"/><path class="sect left"d="M584.278 877.44V936.573L532.966 907.005V847.874L584.278 877.44Z"/><path class="sect top"d="M686.902 759.173L635.59 788.741L584.278 759.173L635.59 729.608L686.902 759.173Z"/><path class="sect top"d="M789.524 581.776L738.214 611.343L686.902 581.776L738.214 552.21L789.524 581.776Z"/><path class="sect top"d="M584.278 936.573L532.966 966.138L481.656 936.573L532.966 907.005L584.278 936.573Z"/><path class="sect top"d="M892.148 404.378L840.836 433.944L789.524 404.378L840.836 374.811L892.148 404.378Z"/><path class="sect left"d="M173.786 522.643V581.776L122.474 552.21V493.077L173.786 522.643Z"/><path class="sect left"d="M276.408 345.245V404.378L225.098 374.811V315.68L276.408 345.245Z"/><path class="sect left"d="M379.032 167.847V226.981L327.72 197.414V138.281L379.032 167.847Z"/><path class="sect top"d="M379.032 226.981L327.72 256.547L276.408 226.981L327.72 197.414L379.032 226.981Z"/><path class="sect top"d="M481.656 49.5822L430.344 79.1486L379.032 49.5822L430.344 20.0158L481.656 49.5822Z"/><path class="sect top"d="M276.408 404.378L225.098 433.944L173.786 404.378L225.098 374.811L276.408 404.378Z"/><path class="sect top"d="M173.786 581.776L122.474 611.343L71.1626 581.776L122.474 552.21L173.786 581.776Z"/><path class="sect left"d="M994.772 522.643V581.776L943.46 552.21V493.077L994.772 522.643Z"/><path class="sect left"d="M892.148 700.042V759.173L840.836 729.608V670.475L892.148 700.042Z"/><path class="sect left"d="M789.526 877.44V936.573L738.214 907.005V847.874L789.526 877.44Z"/><path class="sect top"d="M789.524 936.573L738.214 966.138L686.902 936.573L738.214 907.005L789.524 936.573Z"/><path class="sect top"d="M892.148 759.173L840.836 788.741L789.524 759.173L840.836 729.608L892.148 759.173Z"/><path class="sect top"d="M994.772 581.776L943.46 611.341L892.148 581.776L943.46 552.21L994.772 581.776Z"/><path class="sect right"d="M532.968 552.21L481.656 581.776V522.643L532.968 493.077V552.21Z"/><path class="sect right"d="M738.214 552.21L686.902 581.776V522.643L738.214 493.077V552.21Z"/><path class="sect right"d="M327.72 552.21L276.408 581.776V522.643L327.72 493.077V552.21Z"/><path class="sect right"d="M943.46 552.21L892.148 581.776V522.643L943.46 493.077V552.21Z"/><path class="sect right"d="M122.474 552.21L71.1626 581.776V522.643L122.474 493.077V552.21Z"/><path class="sect right"d="M430.344 374.811L379.032 404.378V345.245L430.344 315.68V374.811Z"/><path class="sect right"d="M635.59 374.811L584.278 404.378V345.245L635.59 315.68V374.811Z"/><path class="sect right"d="M225.098 374.811L173.786 404.378V345.245L225.098 315.68V374.811Z"/><path class="sect right"d="M840.836 374.811L789.526 404.378V345.245L840.836 315.68V374.811Z"/><path class="sect right"d="M635.59 729.608L584.278 759.173V700.042L635.59 670.475V729.608Z"/><path class="sect right"d="M840.836 729.608L789.526 759.173V700.042L840.836 670.475V729.608Z"/><path class="sect right"d="M430.344 729.608L379.032 759.173V700.042L430.344 670.475V729.608Z"/><path class="sect right"d="M225.098 729.608L173.786 759.173V700.042L225.098 670.475V729.608Z"/><path class="sect right"d="M327.72 197.414L276.408 226.981V167.847L327.72 138.281V197.414Z"/><path class="sect right"d="M532.968 197.414L481.656 226.981V167.847L532.968 138.281V197.414Z"/><path class="sect right"d="M738.214 197.414L686.902 226.981V167.847L738.214 138.281V197.414Z"/><path class="sect right"d="M738.214 907.005L686.902 936.573V877.44L738.214 847.874V907.005Z"/><path class="sect right"d="M532.968 907.005L481.656 936.573V877.44L532.968 847.874V907.005Z"/><path class="sect right"d="M327.72 907.005L276.408 936.573V877.44L327.72 847.874V907.005Z"/></svg>';

    penrose.wrapper.innerHTML = svgCode;
    penrose.svg = document.querySelector("#penrose-svg");
    penrose.sects = document.querySelectorAll(".sect");

    penrose.sects.forEach(function () {
        penrose.setColours();
    });
}

penrose.addHeart = function () {
    penrose.heartSects.forEach(function(num) {
        penrose.svg.querySelector("#sect-" + num).classList.add("heart");
    });
}

penrose.initStrokes = function () {
    penrose.sects.forEach(function(sect) {
        gsap.to(sect, {
            strokeOpacity: 1,
            duration: 0.25,
            delay: 0.5 + Math.random() * 0.5
        });
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

penrose.initMouse = function () {
    penrose.svg.onmousedown = penrose.mouseDown;
    penrose.svg.onmouseup = penrose.mouseUp;
    penrose.svg.onmouseenter = penrose.mouseEnter;
    penrose.svg.onmouseleave = penrose.mouseLeave;
}

penrose.reinitMouse = function() {
    penrose.svg.onmousemove = penrose.mouseMove;
    penrose.svg.onmousedown = penrose.mouseDown;
    penrose.svg.onmouseup = penrose.mouseUp;

    penrose.sects.forEach(function(sect) {
        sect.onmouseover = penrose.sectEnter;
        sect.onmouseout = penrose.sectExit;
    });

    penrose.mouse = false;
}

penrose.initAnim = function () {

    penrose.mouse = false;

    if (
        penrose.tweensZoneEnter !== undefined &&
        penrose.tweensZoneEnter !== null &&
        penrose.tweensZoneEnter.length > 0
    )
    penrose.tweensZoneEnter.forEach(function (tween) {
        tween.kill();
    });

    // make pointer zone bigger
    penrose.pointer.width = penrose.zoneSizeW * penrose.zoneMultiplyAnim;
    penrose.pointer.height = penrose.zoneSizeH * penrose.zoneMultiplyAnim;

    penrose.anim = gsap.timeline({repeat: -1}); // repeat indefinitely

    // set pointer initial position
    penrose.pointer.x = penrose.animCoords[penrose.animCoords.length - 1][0];
    penrose.pointer.y = penrose.animCoords[penrose.animCoords.length - 1][1];

    penrose.transition();

    penrose.animCoords.forEach(function (coord, index) {

        penrose.anim.to(penrose.pointer, { // x animation
            x: coord[0] * penrose.origW,
            duration: penrose.animDuration,
            ease: "none", // edit
            onUpdate: penrose.transition
        });

        penrose.anim.to(penrose.pointer, { // y animation
            y: coord[1] * penrose.origH,
            duration: penrose.animDuration,
            ease: "none", // CustomWiggle
        }, "<"); // start of previous animation

    });
}

penrose.killAnim = function () {
    penrose.anim.kill();
    penrose.pointer.width = penrose.zoneSizeW / penrose.zoneMultiplyAnim;
    penrose.pointer.height = penrose.zoneSizeH / penrose.zoneMultiplyAnim;
    penrose.mouse = true;
}

penrose.killMouse = function () {

    penrose.svg.onmousemove = null;
    penrose.svg.onmousedown = null;
    penrose.svg.onmouseup = null;

    penrose.sects.forEach(function(sect) {
        sect.onmouseover = null;
        sect.onmouseout = null;
    });

    penrose.mouse = false;
}

penrose.init = function () {
    penrose.addSVG();
    penrose.setSize(); // sizing
    penrose.sects.forEach(function (sect, index) { sect.id = "sect-" + index; }); // add ids to all sectors
    penrose.addHeart();
    penrose.initStrokes();
    penrose.initPointer(); // create pointer svg rect and set mousemove event handler
    penrose.initHover(); // set event handlers for hovering directly on sector
    penrose.initMouse(); // set event handlers for clicking and dragggin
    penrose.initAnim();
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