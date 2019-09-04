module.exports = (request, response, next) => {
    if (!request.session.currentUser) {
        return response.status(401).json({ status: 401, message: 'Unauthorized. Please login and try again' });
    }
    next();
};
