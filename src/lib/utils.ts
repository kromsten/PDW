import { quintOut } from "svelte/easing";
import { writable } from "svelte/store";
import { crossfade, scale } from "svelte/transition";

export const fallback = (node : any, params : any) => {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
        duration: 3600,
        easing: quintOut,
        css: (t : any) => `
            transform: ${transform} scale(${t});
            opacity: ${t}
        `
    };
}

export const crossFade = crossfade({
    fallback,
    duration: 200,
});


export const sendingName = writable(false);