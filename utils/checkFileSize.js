export const checkFileSize = (bytes, limit) => {
    console.log(bytes / (1024*1024));
    return limit < bytes / (1024*1024);
};
