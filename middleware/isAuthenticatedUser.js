const isAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error_msg', 'Please login first to access this page')
    res.redirect('admin/login')
}

module.exports = {
    isAuthenticatedUser
}