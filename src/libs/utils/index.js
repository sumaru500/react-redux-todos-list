// IIFE function Immediately Invoked Function Expression
((object) => {
    const utils = {
        toFirstUpperCase: (string) => {
            return string && string[0].toUpperCase() + string.slice(1);
        },
    };

    Object.assign(object, {utils});
})(window);
