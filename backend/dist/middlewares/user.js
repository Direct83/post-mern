export default (function (req, res, next) {
    var _a, _b;
    if (req.session.user)
        res.locals.username = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.userName;
    next();
});
