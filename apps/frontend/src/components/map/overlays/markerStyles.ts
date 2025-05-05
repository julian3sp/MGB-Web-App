export type PinStyles = (
    lib: google.maps.MarkerLibrary
) => google.maps.marker.PinElement;

import "./markerStyles/node-map.css"

export type NodeState = "normal" | "start" | "goal" | "blocked";

function applyNodeStyle(
    el: HTMLElement,
    degree: number,
    state: NodeState = "normal"
) {
    el.className = "node-dot";

    if (degree >= 3) el.classList.add("node--junction");
    if (state === "start")   el.classList.add("node--start");
    if (state === "goal")    el.classList.add("node--goal");
    if (degree === 0) el.classList.add("node--blocked");
    if (degree === 1) el.classList.add("node--end");
}

export function nodeMarker(
    degree: number,
    state: "normal" | "start" | "goal" | "blocked" = "normal"
): HTMLElement {
    const div = document.createElement("div");
    applyNodeStyle(div, degree, state);
    return div;
}

export function imageCornerMarkerContent(
    state: string = "BL"
): HTMLElement {
    const div = document.createElement("div");
    div.className = "imageCorner-dot";
    switch(state){
        case "BL":
            div.classList.add("corner-BL");
            break
        case "BR":
            div.classList.add("corner-BR");
            break
        case "TR":
            div.classList.add("corner-TR");
            break
        case "TL":
            div.classList.add("corner-TL");
    }
    return div;
}

