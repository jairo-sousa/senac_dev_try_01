function ensureAuthenticated(req, res, next) {
    if (req.session.authenticated) return next();
    return res.redirect("/login");
}

function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        const { profile_id } = req.session.user;
        
        if (allowedRoles.includes(profile_id)) return next();
        return res.status(403).send("Acesso negado");
    };
}

module.exports = {
    ensureAuthenticated,
    authorizeRoles,
};