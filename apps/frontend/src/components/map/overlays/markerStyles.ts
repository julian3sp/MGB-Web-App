export type PinStyles = (
    lib: google.maps.MarkerLibrary
) => google.maps.marker.PinElement;

/** Default node pin – blue with white glyph */
export const nodePin: PinStyles = ({ PinElement }) =>
    new PinElement({
        scale: 1.5,
        glyph: "N",
        glyphColor: "#fff",
        background: "#003a96",
    });

// /** Highlighted node (mouse-over, selection, etc.) */
// export const highlightPin: PinStyles = ({ PinElement }) =>
//     new PinElement({
//         scale: 1.7,
//         glyph: "★",
//         glyphColor: "#fff",
//         background: "#f57c00",
//     });

