const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) {
    res.render('login-logado');
    return;
  }
  res.render('login');
  return;
};

exports.register = async (req, res) => {
  const login = new Login(req.body);
  await login.register();
  if (login.errors.length > 0) {
    req.flash('erro', login.errors);
  } else {
    req.flash('sucess', 'Cadastro realizado com sucesso');
  }
  req.session.save(() => {
    res.redirect('/login');
    return;
  });
  return;
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();
    if (login.errors.length > 0) {
      req.flash('erro', login.errors);
    } else {
      req.flash('sucess', 'Usuário logado com sucesso');
      req.session.user = login.user;
    }
    req.session.save(() => {
      res.redirect('/login');
      return;
    });
    return;
  } catch (e) {
    console.log(e);
  }
}

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};