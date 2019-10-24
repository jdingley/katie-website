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
    res.render('Services/AOF/preteen', { title: "Preteens and Tweens" });
  }
  exports.RenderTeens = function(req, res, next) {
    res.render('Services/AOF/teen', { title: "Adolescents and Teenagers" });
  }
  exports.RenderAdults = function(req, res, next) {
    res.render('Services/AOF/adult', { title: "Adults" });
  }
  exports.RenderElderly= function(req, res, next) {
    res.render('Services/AOF/elderly', { title: "The Elderly" });
  }
  exports.RenderDisabilities= function(req, res, next) {
    res.render('Services/AOF/disabilites', { title: "Persons with Mild/Moderate Developmental/Intellectual Disabilities" });
  }