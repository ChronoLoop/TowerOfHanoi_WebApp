const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return;
    }
    next();
};

module.exports = checkAuth;