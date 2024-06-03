// Desc: Error handler for axios requests
const errorHandler = (error) => {
    if (error.response) {
        return error.response.data;
    } else if (error.request) {
        return error.request;
    } else {
        return error.message;
    }

};

export default errorHandler;
