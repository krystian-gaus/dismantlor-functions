module.exports = {
    isNotBlank: function (str) {
        return str !== null
            && str !== undefined
            && typeof str === 'string'
            && str.trim() !== "";
    },
    isInvalidString: function (name) {
        return name === null
            || name === undefined
            || typeof name !== 'string'
            || name.startsWith(" ")
            || name.endsWith(" ")
            || name.trim() === "";
    }
};