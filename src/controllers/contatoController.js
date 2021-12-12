const Contato = require('../models/ContatoModel');
exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
  return;
};
exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash('erro', contato.errors);
      req.session.save(() => {
        res.redirect('/contato');
        return;
      });
    } else {
      req.flash('sucess', 'Contato cadastrado com sucesso');
      req.session.save(() => {
        res.redirect(`/contato/${contato.contato._id}`);
        return;
      });
    }
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};
exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const contato = await Contato.buscaPorId(req.params.id);
  if (!contato) return res.render('404');

  res.render('contato', {
    contato
  });
};
exports.edit = async (req, res, next) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
    if (contato.errors.length > 0) {
      req.flash('erro', contato.errors);
      req.session.save(() => {
        res.redirect('/contato');
        return;
      });
    } else {
      req.flash('sucess', 'Contato editado com sucesso');
      req.session.save(() => {
        res.redirect(`/contato/${contato.contato._id}`);
        return;
      });
    }
    return;
  } catch (e) {
    console.log(e);
  }
};
exports.delete = async function(req, res) {
  if (!req.params.id) return res.render('404');
  const contato = await Contato.delete(req.params.id);
  if (!contato) return res.render('404');
  req.flash('sucess', 'Seu contato foi apagado com sucesso');
  req.session.save(()=> {
    res.redirect('/');
  });
};