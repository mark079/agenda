exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash('erro');
  res.locals.sucess = req.flash('sucess');
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('erro', 'Usuário precisa estar logado');
    req.session.save(()=> res.redirect('/'));
    return;
  }
  next();
};