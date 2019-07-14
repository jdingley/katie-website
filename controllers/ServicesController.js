exports.RenderServicesPage = function(req, res, next) {
    res.render('Services/services_page', { title: "Services" });
  }
  exports.RenderPaymentsPage = function(req, res, next) {
    res.render('Services/payment_page', { title: "Payments" });
  }
  exports.RenderIntakePage = function(req, res, next) {
    res.render('Services/services_page', { title: "Intake Forms and Consent" });
  }
  