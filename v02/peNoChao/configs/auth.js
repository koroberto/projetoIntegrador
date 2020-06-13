module.exports = (req, res, next) => {
    const { jogador } = req.session;
    console.log(jogador)
    if (!jogador) {
      return res.redirect("/");
    }

    res.locals.jogador = jogador;
    console.log("locals", jogador)
    return next();
  };