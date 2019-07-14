exports.RenderContactPage = function(req, res, next) {
    res.render('Contact/contact_page', { title: "Contact" });
  }
  exports.RenderSchedule = function(req, res, next) {
    res.render('Contact/schedule', { title: "Schedule" });
  }