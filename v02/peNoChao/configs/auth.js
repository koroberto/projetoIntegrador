module.exports = (req, res, next) => {
    const { jogador } = req.session;
    if (!jogador) {
      return res.redirect("/");
    }
    res.locals.jogador = jogador;
    return next();
  };