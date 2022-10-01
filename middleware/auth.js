module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
      } else if(req.isAuthenticated()){
        res.redirect('/member')
      }else {
        res.redirect("/");
      }
    },
    ensureGuest: function (req, res, next) {
      if (req.isAuthenticated() && req.user.role === 'member') {
        return next();
      } else if(req.isAuthenticated()){
        res.redirect('/admin')
      }else {
        res.redirect("/");
      }
    },
  };