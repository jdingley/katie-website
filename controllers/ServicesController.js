exports.RenderServicesPage = function(req, res, next) {
    res.render('Services/services_page', { title: "Services" });
  }
  exports.RenderPaymentsPage = function(req, res, next) {
    res.render('Services/payment_page', { title: "Payments" });
  }
  exports.RenderIntakePage = function(req, res, next) {
    res.render('Services/intake_page', { title: "Intake Forms and Consent" });
  }
  exports.RenderAreaOfFocusPage = function(req, res, next) {
    res.render('Services/AOF/areas_of_focus', { title: "Areas of Focus" });
  }
  exports.RenderPreteens = function(req, res, next) {
    res.render('Services/AOF/preteen', { title: "Areas of Focus" });
  }
  exports.RenderTeens = function(req, res, next) {
    res.render('Services/AOF/teen', { title: "Areas of Focus" });
  }
  exports.RenderAdults = function(req, res, next) {
    res.render('Services/AOF/adult', { title: "Areas of Focus" });
  }
  exports.RenderElderly= function(req, res, next) {
    res.render('Services/AOF/elderly', { title: "Areas of Focus" });
  }
  exports.RenderDisabilities= function(req, res, next) {
    res.render('Services/AOF/disabilites', { title: "Areas of Focus" });
  }