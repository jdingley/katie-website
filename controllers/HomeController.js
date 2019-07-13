exports.RenderHomePage = function(req, res, next) {
    res.render('Home/home_page', { title: "Home" });
  }
  