/**
 * Utility function that helps with joining className values in an array.
 * 
 * Improves working with CSS Modules
 */
export const flatten = (styles?: CSSModuleClasses) => (...classList: string[]) => {
    if (!styles) return classList.join(" ");
    // TODO clean this up so that it does not have a space its trimmed from white space
    return classList.reduce((acc, className) => (styles[className]) ? `${acc} ${styles[className]}` : acc, "");
};