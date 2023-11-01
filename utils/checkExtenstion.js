export const checkExtension = (extension, allowed) => {
    if (allowed.length) {
        return allowed.includes(extension);
    } else {
        return extension.indexOf('image/') !== -1;
    }
};
